import 'server-only';

import type { PropsWithChildren } from 'react';

import { globals } from './def';
import { _InternalGlobalsProvider as InternalGlobalsProvider } from './globalsContext';

export function GlobalsProvider({ children }: PropsWithChildren) {
  return <InternalGlobalsProvider globals={globals}>{children}</InternalGlobalsProvider>;
}
