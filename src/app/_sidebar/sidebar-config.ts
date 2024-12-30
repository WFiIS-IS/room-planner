import { House, Lamp } from 'lucide-react';

import type { IconComponent } from '@/common-types';

export type SidebarEntry = {
  title: string;
  url: string;
  icon: IconComponent;
  items?: Array<SidebarSubEntry>;
};

export type SidebarSubEntry = {
  title: string;
  url: string;
};

export const sidebarConfig: Array<SidebarEntry> = [
  {
    title: 'Devices',
    url: '/devices',
    icon: Lamp,
  },
  {
    title: 'Scenes',
    url: '/scenes',
    icon: House,
  },
];

const lookupMap = new Map(
  sidebarConfig.flatMap((sidebarItem) => {
    const mainItem = [
      sidebarItem.url,
      [{ fragment: sidebarItem.title, url: sidebarItem.url }],
    ] as const;

    const subItems = sidebarItem.items?.map(
      (subItem) =>
        [
          subItem.url,
          [
            { fragment: sidebarItem.title, url: sidebarItem.url },
            { fragment: subItem.title, url: subItem.url },
          ],
        ] as const,
    );

    return [mainItem, ...(subItems ?? [])];
  }) as unknown as Array<[string, Array<{ fragment: string; url: string }>]>,
);

export function getBreadcrumbItems(url: string) {
  return lookupMap.get(url) ?? [];
}
