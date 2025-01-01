import 'server-only';

import Image from 'next/image';
import Link from 'next/link';

import { LinkCard } from '@/components/LinkCard';
import { PageWrapper } from '@/components/PageWrapper';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function ScenesPage() {
  return (
    <PageWrapper>
      <Button asChild>
        <Link href="/scenes/create-scene">Create Scene</Link>
      </Button>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-6">
        <LinkCard href="/scenes/1">
          <Text variant="h2">Sample Scene</Text>
          <Image src="/house-plan.png" alt="House Plan" height={200} width={300} />
        </LinkCard>
      </div>
    </PageWrapper>
  );
}
