import 'server-only';

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DB_USER: z.string().default('postgres'),
    DB_PASS: z.string().default('postgres'),
    DB_NAME: z.string().default('room-planner'),
    DB_HOST: z.string().default('127.0.0.1'),
    S3_URL: z.string().default('s3://app-data'),
    S3_REGION: z.string().default('us-east-1'),
    S3_ENDPOINT: z.string().default('http://127.0.0.1:4566'),
    S3_ACCESS_KEY_ID: z.string().default('dev'),
    S3_SECRET_ACCESS_KEY: z.string().default('dev'),
  },
  experimental__runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
