import { Router } from 'express';
import { contentRepository } from './content.repository.js';
import { asyncHandler } from '../../shared/utils/asyncHandler.js';
import { requireAuth, requireRole } from '../../shared/middleware/auth.js';

const TYPES = ['programs', 'news', 'testimonials', 'store-items', 'annual-reports'];

const toSingleValue = (value, fallback) => {
  if (Array.isArray(value)) {
    return value[0] ?? fallback;
  }
  return value ?? fallback;
};

const toPositiveInt = (value, fallback, max = Number.MAX_SAFE_INTEGER) => {
  const parsed = Number.parseInt(String(value), 10);
  if (!Number.isFinite(parsed) || Number.isNaN(parsed)) {
    return fallback;
  }
  if (parsed < 1) {
    return fallback;
  }
  return Math.min(parsed, max);
};

const parsePagination = (query) => {
  const page = toPositiveInt(toSingleValue(query.page, 1), 1);
  const limit = toPositiveInt(toSingleValue(query.limit, 10), 10, 100);
  const search = String(toSingleValue(query.search, '')).trim();

  return { page, limit, search };
};

const createContentRouter = (type) => {
  const router = Router();

  router.get(
    '/',
    asyncHandler(async (req, res) => {
      const result = await contentRepository.list(type, {
        ...parsePagination(req.query),
        publishedOnly: req.query.admin !== '1',
      });

      res.json({ success: true, data: result });
    }),
  );

  router.get(
    '/:id',
    asyncHandler(async (req, res) => {
      const data = await contentRepository.findById(type, Number(req.params.id));
      res.json({ success: true, data });
    }),
  );

  router.post(
    '/',
    requireAuth,
    requireRole('admin'),
    asyncHandler(async (req, res) => {
      const data = await contentRepository.create(type, req.body);
      res.status(201).json({ success: true, message: 'created', data });
    }),
  );

  router.put(
    '/:id',
    requireAuth,
    requireRole('admin'),
    asyncHandler(async (req, res) => {
      const data = await contentRepository.update(type, Number(req.params.id), req.body);
      res.json({ success: true, message: 'updated', data });
    }),
  );

  router.delete(
    '/:id',
    requireAuth,
    requireRole('admin'),
    asyncHandler(async (req, res) => {
      await contentRepository.remove(type, Number(req.params.id));
      res.json({ success: true, message: 'deleted' });
    }),
  );

  return router;
};

export const contentRouters = TYPES.map((type) => ({
  path: `/${type}`,
  router: createContentRouter(type),
}));
