import { Thermometer } from 'lucide-react';

import { MenuContentWrapper } from '@/app/_sidebar/devices-view/MenuContentWrapper';
import { SidebarButtonLink } from '@/app/_sidebar/SidebarButtonLink';
import { SidebarMenuAction, SidebarMenuItem } from '@/components/ui/sidebar';
import { Text } from '@/components/ui/text';
import type { ThermometerSensor } from '@/lib/home-assistant/device-types';

export type ThermometersProps = {
  sensors: ThermometerSensor[];
};

export function Thermometers({ sensors }: ThermometersProps) {
  return (
    <MenuContentWrapper
      title="Thermometers"
      link="/devices/thermometers"
      icon={Thermometer}
      storageKey="thermometers-collapsible-open"
    >
      {sensors.map((item) => (
        <SidebarMenuItem key={item.entityId}>
          <SidebarButtonLink href={`/devices/thermometers/${item.entityId}`}>
            <Text>{item.attributes?.friendlyName ?? item.entityId}</Text>
          </SidebarButtonLink>
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
