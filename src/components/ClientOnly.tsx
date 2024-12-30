'use client';

import type { FC, ReactNode } from 'react';
import { useIsClient } from '@uidotdev/usehooks';

type ClientOnlyProps = {
  children: ReactNode;
};

export const ClientOnly: FC<ClientOnlyProps> = ({ children }) => {
  const isClient = useIsClient();

  // Render children if on client side, otherwise return null
  return isClient ? <>{children}</> : null;
};
