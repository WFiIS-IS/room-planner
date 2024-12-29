import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DB_USER: z.string().default('postgres'),
    DB_PASS: z.string().default('postgres'),
    DB_NAME: z.string().default('room-planner'),
    S3_URL: z.string().default('s3://app-data'),
  },
  experimental__runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
