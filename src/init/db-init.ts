import path from 'node:path';

import { migrate } from 'drizzle-orm/libsql/migrator';
import fs from 'fs-extra';

import { client, db } from '@/lib/db/client';
import { mainLogger } from '@/lib/logger';

const logger = mainLogger.child({ name: 'db-init.ts' });

logger.debug('Testing database connection');
try {
  const result = await client.execute(`SELECT sqlite_version() AS version;`);
  logger.info(`Connected to sqlite: ${result.rows[0][0]}`);
} catch (err) {
  logger.error(`Could not connect to databaseL "${err}"`, { error: err });
}

const expectedMigrationsDir = path.join(process.cwd(), 'drizzle');

logger.info(`Checking for migrations directory in ${expectedMigrationsDir}`);
if (!(await fs.pathExists(expectedMigrationsDir))) {
  logger.fatal(`Migrations folder does not exists!`);
  throw new Error('Missing migrations directory');
}

await migrate(db, {
  migrationsFolder: expectedMigrationsDir,
});

logger.info('Migrations applied');
