import 'server-only';

import { Lights } from '@/app/_sidebar/devices-view/Lights';
import { Thermometers } from '@/app/_sidebar/devices-view/Thermometers';
import { TimestampSensors } from '@/app/_sidebar/devices-view/TimestampSensors';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { haApiClient } from '@/lib/home-assistant/client';
import {
  filterLights,
  filterThermometers,
  filterTimestampSensors,
} from '@/lib/home-assistant/state';

export async function DevicesGroup() {
  const states = await haApiClient.getStates();
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Devices</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <Lights lights={filterLights(states)} />
          <TimestampSensors sensors={filterTimestampSensors(states)} />
          <Thermometers sensors={filterThermometers(states)} />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
