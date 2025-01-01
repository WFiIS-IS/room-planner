import 'server-only';

import path from 'node:path';

import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

import { env } from '@/env/server';

export const DB_LOCATION = path.join(env.DATA_DIR, 'data.db');

export const client = createClient({ url: `file:${DB_LOCATION}` });

export const db = drizzle({ client });
