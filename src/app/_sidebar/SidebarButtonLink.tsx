'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SidebarMenuButton } from '@/components/ui/sidebar';

export type SidebarButtonLinkProps = {
  href: string;
  children: ReactNode;
};

export function SidebarButtonLink({ href, children }: SidebarButtonLinkProps) {
  const pathname = usePathname();
  return (
    <SidebarMenuButton asChild isActive={pathname === href}>
      <Link href={href} className="m-1 flex items-center justify-start gap-2 p-2">
        {children}
      </Link>
    </SidebarMenuButton>
  );
}
