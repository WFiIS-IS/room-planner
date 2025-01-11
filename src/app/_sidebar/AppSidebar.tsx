import type { ComponentProps } from 'react';

import { Sidebar, SidebarHeader, SidebarMenu } from '@/components/ui/sidebar';

import { AppLogo } from './AppLogo';
import { SidebarContent } from './SidebarContent';

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="max-w-[300px]" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <AppLogo />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent />
    </Sidebar>
  );
}
