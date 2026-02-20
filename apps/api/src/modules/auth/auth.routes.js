import { Router } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler.js';
import { authService } from './auth.service.js';
import { env } from '../../config/env.js';
import { requireAuth } from '../../shared/middleware/auth.js';

const router = Router();

const cookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === 'production',
  sameSite: 'lax',
  path: '/api/v1/auth',
  maxAge: env.jwt.refreshTtlDays * 24 * 60 * 60 * 1000,
};

router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);
    res.cookie(env.jwt.refreshCookieName, result.refreshToken, cookieOptions);
    res.status(201).json({
      success: true,
      message: 'register success',
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  }),
);

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const result = await authService.login(req.body);
    res.cookie(env.jwt.refreshCookieName, result.refreshToken, cookieOptions);
    res.json({
      success: true,
      message: 'login success',
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  }),
);

router.post(
  '/refresh',
  asyncHandler(async (req, res) => {
    const refreshToken = req.cookies[env.jwt.refreshCookieName];
    const result = await authService.refresh(refreshToken);
    res.cookie(env.jwt.refreshCookieName, result.refreshToken, cookieOptions);
    res.json({
      success: true,
      message: 'token refreshed',
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  }),
);

router.post(
  '/logout',
  asyncHandler(async (req, res) => {
    const refreshToken = req.cookies[env.jwt.refreshCookieName];
    await authService.logout(refreshToken);
    res.clearCookie(env.jwt.refreshCookieName, cookieOptions);
    res.json({ success: true, message: 'logout success' });
  }),
);

router.get(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await authService.me(req.user.id);
    res.json({ success: true, data: user });
  }),
);

export default router;
