import 'server-only';

import { isDev } from '@/env/common';

export const globals = {
  projectName: process.env.npm_package_name,
  projectVersion: process.env.npm_package_version,
  isDev,
} as const;
