import 'server-only';

import { isDev } from '@/env/common';

import { name, version } from '../../../package.json';

export const globals = {
  projectName: name,
  projectVersion: version,
  isDev,
} as const;
