/* global process */
import dotenv from 'dotenv';

dotenv.config();

const required = [
  'DB_HOST',
  'DB_USER',
  'DB_NAME',
  'JWT_ACCESS_SECRET',
  'JWT_REFRESH_SECRET',
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const parseOrigin = (value) =>
  value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  appOrigins: parseOrigin(process.env.APP_ORIGIN ?? 'http://localhost:5173,http://localhost:5174'),
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessTtl: process.env.ACCESS_TOKEN_TTL ?? '15m',
    refreshTtlDays: Number(process.env.REFRESH_TOKEN_TTL_DAYS ?? 7),
    refreshCookieName: process.env.REFRESH_COOKIE_NAME ?? 'genvis_refresh_token',
  },
  seed: {
    adminName: process.env.SEED_ADMIN_NAME ?? 'Genvis Admin',
    adminEmail: process.env.SEED_ADMIN_EMAIL ?? 'admin@genvis.local',
    adminPassword: process.env.SEED_ADMIN_PASSWORD ?? 'Admin#12345',
  },
};
