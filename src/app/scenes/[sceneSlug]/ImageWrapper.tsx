import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/lib/utils';

export type ImageWrapperProps = ComponentProps<'div'> & {
  imgWidth: number;
  imgHeight: number;
  children: ReactNode;
};

const PREFERRED_WIDTH = 1200;
const PREFERRED_HEIGHT = 800;

export function ImageWrapper({
  imgHeight,
  imgWidth,
  children,
  className,
  style,
  ...props
}: ImageWrapperProps) {
  const aspectRatio = imgWidth / imgHeight;
  const isLandscape = aspectRatio > 1;

  let width: number;
  let height: number;

  if (isLandscape) {
    width = PREFERRED_WIDTH;
    height = PREFERRED_WIDTH / aspectRatio;
  } else {
    height = PREFERRED_HEIGHT;
    width = PREFERRED_HEIGHT * aspectRatio;
  }

  return (
    <div
      style={{
        position: 'relative',
        width: width,
        height: height,
        ...style,
      }}
      className={cn('max-w-full', className)}
      {...props}
    >
      {children}
    </div>
  );
}
