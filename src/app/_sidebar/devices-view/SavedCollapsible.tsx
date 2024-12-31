'use client';

import type { ReactNode } from 'react';
import { useIsClient } from '@uidotdev/usehooks';
import { useLocalStorage } from 'usehooks-ts';

import { Collapsible } from '@/components/ui/collapsible';

export type SavedCollapsibleProps = {
  children: ReactNode;
  storageKey: string;
};

export function SavedCollapsible({ children, storageKey }: SavedCollapsibleProps) {
  const isClient = useIsClient();
  const [state, setState] = useLocalStorage(storageKey, false);

  return (
    <Collapsible
      className="group/collapsible [&[data-state=open]>button>svg:last-child]:rotate-90"
      open={isClient ? state : false}
      onOpenChange={(newState) => setState(newState)}
    >
      {children}
    </Collapsible>
  );
}
