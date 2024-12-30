import 'server-only';

import Link from 'next/link';

import {
  SidebarContent as SidebarContentComponent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Text } from '@/components/ui/text';

import { sidebarConfig } from './sidebar-config';

export function SidebarContent() {
  return (
    <SidebarContentComponent>
      <SidebarGroup>
        <SidebarMenu>
          {sidebarConfig.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url} className="m-1 flex items-center justify-start gap-2 p-2">
                  <item.icon />
                  <Text className="text-lg">{item.title}</Text>
                </Link>
              </SidebarMenuButton>
              {item.items?.length ? (
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={`${item.title}-${subItem.title}`}>
                      <SidebarMenuButton asChild>
                        <Link href={subItem.url}>
                          <Text>{subItem.title}</Text>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              ) : null}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContentComponent>
  );
}
