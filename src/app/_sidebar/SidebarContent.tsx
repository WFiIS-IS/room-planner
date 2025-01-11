import 'server-only';

import { SceneryGroup } from '@/app/_sidebar/SceneryGroup';
import { SidebarContent as SidebarContentComponent } from '@/components/ui/sidebar';

import { DevicesGroup } from './DevicesGroup';

export function SidebarContent() {
  return (
    <SidebarContentComponent className="overflow-x-clip">
      <DevicesGroup />
      <SceneryGroup />
    </SidebarContentComponent>
  );
}
