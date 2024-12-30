import { haApiClient } from '@/lib/home-assistant/client';
import { mainLogger } from '@/lib/logger';

const logger = mainLogger.child({ name: 'ha-check.ts' });

logger.debug('Check if home assistant API is reachable');
const result = await haApiClient.checkAlive();

if (!result) {
  logger.fatal('Home assistant API is not reachable application will most likely crash');
} else {
  logger.info('Home assistant API is reachable');
}
