import 'server-only';

import { S3 } from '@aws-sdk/client-s3';

import { env } from '@/env/server';

export const s3 = new S3({
  endpoint: env.S3_ENDPOINT,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },
  region: env.S3_REGION,
});
