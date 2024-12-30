import { sql } from '@/lib/db';
import { mainLogger } from '@/lib/logger';

const logger = mainLogger.child({ name: 'db-init.ts' });

logger.debug('Testing database connection');
try {
  const result = await sql`SELECT version()`.values();
  logger.info(`Connected to: ${result[0]}`);
} catch (err) {
  logger.error(`Could not connect to PostgresSQL "${err}"`, { error: err });
}
