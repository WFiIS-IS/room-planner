'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ms from 'ms';

export function Refresher() {
  const clearIntervalRef = useRef<ReturnType<typeof setInterval>>(null);
  const router = useRouter();

  useEffect(() => {
    clearIntervalRef.current = setInterval(() => {
      void router.refresh();
    }, ms('3s'));

    return () => {
      if (clearIntervalRef.current) {
        clearInterval(clearIntervalRef.current);
      }
    };
  }, [router]);

  return <></>;
}
