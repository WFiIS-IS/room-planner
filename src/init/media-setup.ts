import { ensureMediaRoot, MEDIA_ROOT } from '@/lib/files';
import { mainLogger } from '@/lib/logger';

const logger = mainLogger.child({ name: 'init/media-setup' });

logger.info('Ensuring media path is present');
logger.info(`Current media root: "${MEDIA_ROOT}"`);
await ensureMediaRoot();
