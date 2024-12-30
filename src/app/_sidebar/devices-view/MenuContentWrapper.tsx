import { Children, type ReactNode } from 'react';
import Link from 'next/link';
import { ChevronRight, type LucideIcon } from 'lucide-react';

import { SavedCollapsible } from '@/app/_sidebar/devices-view/SavedCollapsible';
import { ClientOnly } from '@/components/ClientOnly';
import { CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@/components/ui/sidebar';
import { Text } from '@/components/ui/text';

export type MenuContentWrapperProps = {
  children: ReactNode;
  storageKey: string;
  title: string;
  link: string;
  icon: LucideIcon;
};

export function MenuContentWrapper({
  children,
  title,
  link,
  storageKey,
  ...props
}: MenuContentWrapperProps) {
  return (
    <ClientOnly>
      <SavedCollapsible storageKey={storageKey}>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={link} className="m-1 flex items-center justify-start gap-2 p-2">
              <props.icon />
              <Text className="text-lg">{title}</Text>
            </Link>
          </SidebarMenuButton>
          {Children.count(children) ? (
            <>
              <CollapsibleTrigger asChild>
                <SidebarMenuAction className="data-[state=open]:rotate-90">
                  <ChevronRight />
                </SidebarMenuAction>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>{children}</SidebarMenuSub>
              </CollapsibleContent>
            </>
          ) : null}
        </SidebarMenuItem>
      </SavedCollapsible>
    </ClientOnly>
  );
}
