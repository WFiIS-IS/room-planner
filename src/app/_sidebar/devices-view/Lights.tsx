import Link from 'next/link';
import { Lightbulb, LightbulbOff, SunMoon } from 'lucide-react';

import { MenuContentWrapper } from '@/app/_sidebar/devices-view/MenuContentWrapper';
import { SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Text } from '@/components/ui/text';
import type { LightDevice } from '@/lib/home-assistant/device-types';

export type LightsProps = {
  lights: LightDevice[];
};

export function Lights({ lights }: LightsProps) {
  return (
    <MenuContentWrapper
      title="Lights"
      link="/devices/lights"
      icon={SunMoon}
      storageKey="lights-collapsible-open"
    >
      {lights.map((item) => (
        <SidebarMenuItem key={item.entityId}>
          <SidebarMenuButton asChild>
            <Link href={`/devices/lights/${item.entityId}`}>
              <Text>{item.attributes?.friendlyName ?? item.entityId}</Text>
            </Link>
          </SidebarMenuButton>
          <SidebarMenuAction>
            {item.state === 'on' ? <Lightbulb /> : <LightbulbOff />}
          </SidebarMenuAction>
        </SidebarMenuItem>
      ))}
    </MenuContentWrapper>
  );
}
