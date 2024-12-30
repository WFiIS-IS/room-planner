'use client';

import { createContext, use, type PropsWithChildren } from 'react';

import type { globals } from './def';

type GlobalsType = typeof globals;

const GlobalsContext = createContext<GlobalsType | null>(null);

export function useGlobals() {
  const contextValue = use(GlobalsContext);
  if (contextValue === null) {
    throw new Error('Missing <GlobalsProvider />');
  }
  return contextValue;
}

export function _InternalGlobalsProvider({
  children,
  globals,
}: PropsWithChildren<{ globals: GlobalsType }>) {
  return <GlobalsContext value={globals}>{children}</GlobalsContext>;
}
