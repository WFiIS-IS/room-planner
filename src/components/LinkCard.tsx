import type { ReactNode } from 'react';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type LinkCardProps = {
  children: ReactNode;
  href: string;
  className?: string;
};

export function LinkCard({ children, href, className }: LinkCardProps) {
  return (
    <Card className="overflow-hidden rounded-md shadow-md shadow-accent transition-all duration-300 ease-in-out [&:not(:has(button:hover))]:hover:bg-accent [&:not(:has(button:hover))]:hover:text-accent-foreground [&:not(:has(button:hover))]:hover:shadow-xl">
      <Link href={href}>
        <CardContent className={cn('relative flex flex-col items-center gap-4 p-6', className)}>
          {children}
        </CardContent>
      </Link>
    </Card>
  );
}
