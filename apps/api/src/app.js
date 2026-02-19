import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './shared/middleware/errorHandler.js';
import authRouter from './modules/auth/auth.routes.js';
import { contentRouters } from './modules/content/content.routes.js';

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.appOrigins,
    credentials: true,
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is healthy' });
});

app.use('/api/v1/auth', authRouter);
for (const item of contentRouters) {
  app.use(`/api/v1${item.path}`, item.router);
}

app.use(notFoundHandler);
app.use(errorHandler);
