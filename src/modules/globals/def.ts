import 'server-only';

import { isDev } from '@/env/common';

import pkgJson from '../../../package.json';

export const name = pkgJson.name;
export const version = pkgJson.version;

export const globals = {
  projectName: name,
  projectVersion: version,
  isDev,
} as const;
