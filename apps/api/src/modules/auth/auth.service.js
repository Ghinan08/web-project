import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createHash } from 'node:crypto';
import { env } from '../../config/env.js';
import { query } from '../../config/database.js';
import { ApiError } from '../../shared/errors/ApiError.js';

const hashToken = (token) => createHash('sha256').update(token).digest('hex');

const sanitizeUser = (user) => ({
  id: Number(user.id),
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.created_at,
});

const createAccessToken = (user) =>
  jwt.sign(
    { sub: Number(user.id), email: user.email, role: user.role },
    env.jwt.accessSecret,
    { expiresIn: env.jwt.accessTtl },
  );

const createRefreshToken = (user) =>
  jwt.sign({ sub: Number(user.id), type: 'refresh' }, env.jwt.refreshSecret, {
    expiresIn: `${env.jwt.refreshTtlDays}d`,
  });

const storeRefreshToken = async (userId, refreshToken) => {
  const tokenHash = hashToken(refreshToken);
  const expiresAt = new Date(Date.now() + env.jwt.refreshTtlDays * 24 * 60 * 60 * 1000);
  await query(
    `INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)`,
    [userId, tokenHash, expiresAt],
  );
};

const rotateRefreshToken = async (oldRefreshToken, user) => {
  const oldHash = hashToken(oldRefreshToken);
  await query(`UPDATE refresh_tokens SET revoked_at = NOW() WHERE token_hash = ? AND revoked_at IS NULL`, [oldHash]);
  const newRefreshToken = createRefreshToken(user);
  await storeRefreshToken(user.id, newRefreshToken);
  return newRefreshToken;
};

export const authService = {
  async register(payload) {
    const { name, email, password, role } = payload;

    if (!name || !email || !password) {
      throw new ApiError(400, 'name, email, and password are required');
    }

    if (password.length < 8) {
      throw new ApiError(400, 'password must be at least 8 characters');
    }

    const normalizedEmail = email.trim().toLowerCase();
    const allowedRole = role === 'admin' ? 'admin' : 'user';

    const existing = await query(`SELECT id FROM users WHERE email = ? LIMIT 1`, [normalizedEmail]);
    if (existing.length > 0) {
      throw new ApiError(409, 'email already registered');
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const result = await query(
      `INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)`,
      [name.trim(), normalizedEmail, passwordHash, allowedRole],
    );

    const users = await query(`SELECT * FROM users WHERE id = ? LIMIT 1`, [result.insertId]);
    const user = users[0];

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    await storeRefreshToken(user.id, refreshToken);

    return {
      user: sanitizeUser(user),
      accessToken,
      refreshToken,
    };
  },

  async login(payload) {
    const { email, password } = payload;
    if (!email || !password) {
      throw new ApiError(400, 'email and password are required');
    }

    const normalizedEmail = email.trim().toLowerCase();
    const users = await query(`SELECT * FROM users WHERE email = ? LIMIT 1`, [normalizedEmail]);
    if (users.length === 0) {
      throw new ApiError(401, 'invalid credentials');
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      throw new ApiError(401, 'invalid credentials');
    }

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    await storeRefreshToken(user.id, refreshToken);

    return {
      user: sanitizeUser(user),
      accessToken,
      refreshToken,
    };
  },

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new ApiError(401, 'refresh token is required');
    }

    let payload;
    try {
      payload = jwt.verify(refreshToken, env.jwt.refreshSecret);
    } catch {
      throw new ApiError(401, 'invalid refresh token');
    }

    const tokenHash = hashToken(refreshToken);
    const rows = await query(
      `SELECT rt.*, u.id AS user_id, u.name, u.email, u.role, u.created_at
       FROM refresh_tokens rt
       INNER JOIN users u ON u.id = rt.user_id
       WHERE rt.token_hash = ? AND rt.revoked_at IS NULL AND rt.expires_at > NOW()
       LIMIT 1`,
      [tokenHash],
    );

    if (rows.length === 0) {
      throw new ApiError(401, 'refresh token is expired or revoked');
    }

    const row = rows[0];
    if (Number(payload.sub) !== Number(row.user_id)) {
      throw new ApiError(401, 'invalid refresh token');
    }

    const user = {
      id: row.user_id,
      name: row.name,
      email: row.email,
      role: row.role,
      created_at: row.created_at,
    };

    const nextRefreshToken = await rotateRefreshToken(refreshToken, user);
    const accessToken = createAccessToken(user);

    return {
      user: sanitizeUser(user),
      accessToken,
      refreshToken: nextRefreshToken,
    };
  },

  async logout(refreshToken) {
    if (!refreshToken) {
      return;
    }
    const tokenHash = hashToken(refreshToken);
    await query(`UPDATE refresh_tokens SET revoked_at = NOW() WHERE token_hash = ? AND revoked_at IS NULL`, [tokenHash]);
  },

  async me(userId) {
    const users = await query(`SELECT * FROM users WHERE id = ? LIMIT 1`, [userId]);
    if (users.length === 0) {
      throw new ApiError(404, 'user not found');
    }
    return sanitizeUser(users[0]);
  },
};
