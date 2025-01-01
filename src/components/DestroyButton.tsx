'use client';

import type { ComponentProps } from 'react';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type DestroyButtonProps = Omit<
  ComponentProps<typeof Button>,
  'size' | 'variant' | 'children'
> & {
  withText?: boolean;
};

export function DestroyButton({ className, withText, ...props }: DestroyButtonProps) {
  if (withText) {
    return (
      <Button
        onClick={(e) => {
          e.stopPropagation();
        }}
        variant="destructive"
        className={cn(className)}
        {...props}
      >
        <span>Delete</span>
        <Trash2 />
      </Button>
    );
  }

  return (
    <Button
      size="icon"
      onClick={(e) => {
        e.stopPropagation();
      }}
      variant="destructive"
      className={cn(className)}
      {...props}
    >
      <Trash2 />
    </Button>
  );
}
