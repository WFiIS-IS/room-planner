import 'server-only';

import Link from 'next/link';

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Text } from '@/components/ui/text';
import { globals } from '@/modules/globals/def';

import AppIcon from './appIcon.svg';

export function AppLogo() {
  const { projectVersion, projectName } = globals;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild size="lg">
        <Link className="flex items-center justify-start gap-2 rounded-md p-1" href="/">
          <span>
            <AppIcon width={45} height={45} />
          </span>
          <div className="flex flex-col">
            <Text variant="h4">{projectName}</Text>
            <span className="text-muted-foreground">v{projectVersion}</span>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
