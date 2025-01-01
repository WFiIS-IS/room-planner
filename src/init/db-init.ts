import { client } from '@/lib/db/client';
import { mainLogger } from '@/lib/logger';

const logger = mainLogger.child({ name: 'db-init.ts' });

logger.debug('Testing database connection');
try {
  const result = await client.execute(`SELECT sqlite_version() AS version;`);
  logger.info(`Connected to sqlite: ${result.rows[0][0]}`);
} catch (err) {
  logger.error(`Could not connect to databaseL "${err}"`, { error: err });
}
