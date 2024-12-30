import Link from 'next/link';
import { Thermometer } from 'lucide-react';

import { MenuContentWrapper } from '@/app/_sidebar/devices-view/MenuContentWrapper';
import { SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Text } from '@/components/ui/text';
import type { ThermometerSensor } from '@/lib/home-assistant/device-types';

export type ThermometersProps = {
  sensors: ThermometerSensor[];
};

export function Thermometers({ sensors }: ThermometersProps) {
  return (
    <MenuContentWrapper
      title="Thermometers"
      link="/devices/Thermometers"
      icon={Thermometer}
      storageKey="thermometers-collapsible-open"
    >
      {sensors.map((item) => (
        <SidebarMenuItem key={item.entityId}>
          <SidebarMenuButton asChild>
            <Link href={`/devices/lights/${item.entityId}`}>
              <Text>{item.attributes?.friendlyName ?? item.entityId}</Text>
            </Link>
          </SidebarMenuButton>
          <SidebarMenuAction asChild>
            <span>
              {item.state}
              {item.attributes.unitOfMeasurement}
            </span>
          </SidebarMenuAction>
        </SidebarMenuItem>
      ))}
    </MenuContentWrapper>
  );
}
