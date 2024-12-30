import { env } from '@/env/server';
import { mainLogger } from '@/lib/logger';
import { s3 } from '@/lib/s3';

const logger = mainLogger.child({ name: 'bucketSetup' });

logger.info('Preparing S3 bucket');

logger.debug(`Creating bucket "${env.S3_BUCKET_NAME}"`);
await s3
  .createBucket({
    Bucket: env.S3_BUCKET_NAME,
    ACL: 'public-read',
  })
  .catch((err) => {
    logger.error(`Failed to create bucket "${err}"`, { error: err });
  });

logger.debug(`Changing CORS rules on bucket "${env.S3_BUCKET_NAME}"`);
await s3
  .putBucketCors({
    Bucket: env.S3_BUCKET_NAME,
    CORSConfiguration: {
      CORSRules: [
        {
          AllowedHeaders: ['*'],
          AllowedMethods: ['GET'],
          AllowedOrigins: [env.HOST_URL],
          ExposeHeaders: ['ETag'],
        },
      ],
    },
  })
  .catch((err) => {
    logger.error(`Failed to set CORS settings on bucket "${err}"`, { error: err });
  });
