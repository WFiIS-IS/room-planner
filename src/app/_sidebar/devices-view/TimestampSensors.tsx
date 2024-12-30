import Link from 'next/link';
import { Clock } from 'lucide-react';

import { MenuContentWrapper } from '@/app/_sidebar/devices-view/MenuContentWrapper';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Text } from '@/components/ui/text';
import type { TimestampSensor } from '@/lib/home-assistant/device-types';

export type TimestampSensorsProps = {
  sensors: TimestampSensor[];
};

export function TimestampSensors({ sensors }: TimestampSensorsProps) {
  return (
    <MenuContentWrapper
      title="Timestamp Sensors"
      link="/devices/timestamp-sensors"
      icon={Clock}
      storageKey="timestampSensors-collapsible-open"
    >
      {sensors.map((item) => (
        <SidebarMenuItem key={item.entityId}>
          <SidebarMenuButton asChild>
            <Link href={`/devices/lights/${item.entityId}`}>
              <Text>{item.attributes?.friendlyName ?? item.entityId}</Text>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </MenuContentWrapper>
  );
}
