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

export async function DevicesGroup() {
  const state = await haApiClient.getStates();
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Devices</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <Lights lights={state.getLights()} />
          <TimestampSensors sensors={state.getTimestampSensors()} />
          <Thermometers sensors={state.getThermometers()} />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
