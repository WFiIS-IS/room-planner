import 'server-only';

import Link from 'next/link';

import { PageWrapper } from '@/components/PageWrapper';
import { buttonVariants } from '@/components/ui/button';

export default function ScenesPage() {
  return (
    <PageWrapper>
      <Link href="/scenes/1" className={buttonVariants({ variant: 'outline' })}>
        Scena
      </Link>
    </PageWrapper>
  );
}
