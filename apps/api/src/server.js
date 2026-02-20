/* global process */
import { app } from './app.js';
import { env } from './config/env.js';
import { bootstrapDatabase } from './config/bootstrap.js';
import { ensureDatabaseExists } from './config/database.js';

const start = async () => {
  await ensureDatabaseExists();
  await bootstrapDatabase();

  app.listen(env.port, () => {
    console.log(`API running on http://localhost:${env.port}`);
  });
};

start().catch((error) => {
  console.error('Failed to start API:', error);
  process.exit(1);
});
