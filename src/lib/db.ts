import 'server-only';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { env } from '@/env/server';

export const sql = postgres({
  host: env.DB_HOST,
  user: env.DB_USER,
  database: env.DB_NAME,
  pass: env.DB_PASS,
});

export const db = drizzle({ client: sql });
