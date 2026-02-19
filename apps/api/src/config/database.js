import mysql from 'mysql2/promise';
import { env } from './env.js';

let pool;

const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: env.db.host,
      port: env.db.port,
      user: env.db.user,
      password: env.db.password,
      database: env.db.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      timezone: 'Z',
    });
  }

  return pool;
};

const assertDatabaseName = (databaseName) => {
  if (!/^[A-Za-z0-9_]+$/.test(databaseName)) {
    throw new Error('Invalid DB_NAME. Use only letters, numbers, and underscore.');
  }
};

export const ensureDatabaseExists = async () => {
  assertDatabaseName(env.db.database);

  const connection = await mysql.createConnection({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
  });

  try {
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${env.db.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
  } finally {
    await connection.end();
  }
};

export const query = async (sql, params = []) => {
  const [rows] = await getPool().query(sql, params);
  return rows;
};
