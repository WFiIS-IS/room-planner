import 'server-only';

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

import { mainLogger } from '@/lib/logger';

const logger = mainLogger.child({ name: 'env/server.ts' });

export const env = createEnv({
  server: {
    HOST_URL: z.string().default('http://localhost:3000'),
    HA_TOKEN: z.string().default(''),
    HA_URL: z.string().default('https://ha.critteros.dev'),
    DATA_DIR: z.string().default(process.cwd()),
  },
  experimental__runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

if (env.HA_TOKEN === '') {
  logger.fatal(`HA_TOKEN is NOT SET, !!MISSING ENV!! application will most likely crash`);
}
