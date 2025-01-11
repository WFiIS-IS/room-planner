import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export type PageWrapperProps = ComponentProps<'main'>;

export function PageWrapper({ children, className, ...props }: PageWrapperProps) {
  return (
    <main className={cn('z-0 flex flex-1 flex-col gap-4 p-4 pt-0', className)} {...props}>
      {children}
    </main>
  );
}
