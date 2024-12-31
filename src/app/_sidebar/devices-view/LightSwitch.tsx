import { Lightbulb, LightbulbOff } from 'lucide-react';

import { changeLightState } from '@/actions/lights';
import { SidebarMenuAction } from '@/components/ui/sidebar';
import { LightState } from '@/lib/home-assistant/device-types';

export type LightSwitchProps = {
  currentState: LightState;
  entityId: string;
};

export function LightSwitch({ entityId, currentState }: LightSwitchProps) {
  const nextState = currentState === LightState.ON ? LightState.OFF : LightState.ON;
  const changeLightStateAction = changeLightState.bind(null, entityId, nextState);

  return (
    <form action={changeLightStateAction}>
      <SidebarMenuAction type="submit">
        {currentState === LightState.ON ? <Lightbulb /> : <LightbulbOff />}
      </SidebarMenuAction>
    </form>
  );
}
