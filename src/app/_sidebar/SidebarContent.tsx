import 'server-only';

import { SceneryGroup } from '@/app/_sidebar/SceneryGroup';
import { SidebarContent as SidebarContentComponent } from '@/components/ui/sidebar';

import { DevicesGroup } from './DevicesGroup';

export function SidebarContent() {
  return (
    <SidebarContentComponent>
      <DevicesGroup />
      <SceneryGroup />
    </SidebarContentComponent>
  );
}
