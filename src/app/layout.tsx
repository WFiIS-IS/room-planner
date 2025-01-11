import 'server-only';

import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { GlobalsProvider } from '@/modules/globals/GlobalsProvider';

import './globals.css';

import { AppSidebar } from '@/app/_sidebar/AppSidebar';
// DnDContextProvider is a custom provider that wraps the DndContext from the @dnd-kit/core package
// import { DndContext } from '@dnd-kit/core';
import { DndContext } from '@/app/DnDContextProvider';
import { Refresher } from '@/app/Refresher';
import { cn } from '@/lib/utils';

import { AppHeader } from './AppHeader';
import { DnD } from './DnD';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Refresher /> */}
      <body className={cn(geistSans.variable, geistMono.variable, 'dark font-sans antialiased')}>
        <GlobalsProvider>
          <SidebarProvider>
            {/* <DnD> */}
            <AppSidebar />
            <div className="flex w-full flex-col">
              <SidebarInset>
                <AppHeader />
                {children}
              </SidebarInset>
            </div>
            {/* </DnD> */}
          </SidebarProvider>
        </GlobalsProvider>
      </body>
    </html>
  );
}
