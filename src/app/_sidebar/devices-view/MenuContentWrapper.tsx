import { Children, type ReactNode } from 'react';
import { ChevronRight, type LucideIcon } from 'lucide-react';

import { SavedCollapsible } from '@/app/_sidebar/devices-view/SavedCollapsible';
import { SidebarButtonLink } from '@/app/_sidebar/SidebarButtonLink';
import { CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SidebarMenuAction, SidebarMenuItem, SidebarMenuSub } from '@/components/ui/sidebar';
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
    <SavedCollapsible storageKey={storageKey}>
      <SidebarMenuItem>
        <SidebarButtonLink href={link}>
          <props.icon />
          <Text className="text-lg">{title}</Text>
        </SidebarButtonLink>
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
  );
}
