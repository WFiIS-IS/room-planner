import path from 'node:path';

import { createClient } from '@libsql/client/node';
import { drizzle } from 'drizzle-orm/libsql';

import { env } from '@/env/server';

import * as schema from './schema';

export const DB_LOCATION = path.join(env.DATA_DIR, 'data.db');
export const DB_URL = `file:${DB_LOCATION}`;

export const client = createClient({ url: DB_URL });

export const db = drizzle({ client, schema });
