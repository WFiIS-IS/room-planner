'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

function capitalizeWord(word: string) {
  if (!word) return ''; // Handle empty or undefined strings
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function getBreadcrumbItems(pathname: string) {
  const subPaths = pathname.split('/').slice(1);
  return subPaths.map((item) => {
    const nameParts = item.split('.').map((part) => {
      return part
        .split('_')
        .flatMap((item) => item.split('-'))
        .map((word) => capitalizeWord(word))
        .join(' ');
    });
    const name = nameParts.length > 1 ? nameParts.slice(1).join('') : nameParts.join('');

    const position = pathname.indexOf(item);
    const url = pathname.slice(0, position + item.length);

    return { fragment: name, url };
  });
}

export function AppHeader() {
  const pathname = usePathname();
  const breadcrumbItems = getBreadcrumbItems(pathname);
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map(({ fragment, url }, index) => (
              <Fragment key={url}>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link href={url}>{fragment}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index !== breadcrumbItems.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
