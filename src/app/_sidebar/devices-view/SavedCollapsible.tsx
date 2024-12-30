'use client';

import type { ReactNode } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';

import { Collapsible } from '@/components/ui/collapsible';

export type SavedCollapsibleProps = {
  children: ReactNode;
  storageKey: string;
};

export function SavedCollapsible({ children, storageKey }: SavedCollapsibleProps) {
  const [state, setState] = useLocalStorage(storageKey, false);

  return (
    <Collapsible
      className="group/collapsible [&[data-state=open]>button>svg:last-child]:rotate-90"
      open={state}
      onOpenChange={(newState) => setState(newState)}
    >
      {children}
    </Collapsible>
  );
}
