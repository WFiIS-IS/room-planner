import 'server-only';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { env } from '@/env/server';

const sqlClient = postgres({
  host: env.DB_HOST,
  user: env.DB_USER,
  database: env.DB_NAME,
  pass: env.DB_PASS,
});
const db = drizzle({ client: sqlClient });
