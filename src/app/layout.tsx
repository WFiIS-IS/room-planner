import 'server-only';

import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { GlobalsProvider } from '@/modules/globals/GlobalsProvider';

import darkFavicon from './favicon-dark.ico';
import lightFavicon from './favicon-light.ico';

import './globals.css';

import { AppSidebar } from '@/app/_sidebar/AppSidebar';
import { cn } from '@/lib/utils';

import { AppHeader } from './AppHeader';

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
  title: 'Room Planner',
  icons: [
    {
      media: '(prefers-color-scheme: light)',
      url: lightFavicon.src,
    },
    {
      media: '(prefers-color-scheme: dark)',
      url: darkFavicon.src,
    },
  ],
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(geistSans.variable, geistMono.variable, 'dark font-sans antialiased')}>
        <GlobalsProvider>
          <SidebarProvider>
            <AppSidebar />
            <div className="flex w-full flex-col">
              <SidebarInset>
                <AppHeader />
                {children}
              </SidebarInset>
            </div>
          </SidebarProvider>
        </GlobalsProvider>
      </body>
    </html>
  );
}
