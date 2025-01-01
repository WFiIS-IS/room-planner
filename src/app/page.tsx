import 'server-only';

import { House, Webcam } from 'lucide-react';

import { LinkCard } from '@/components/LinkCard';
import { PageWrapper } from '@/components/PageWrapper';
import { Text } from '@/components/ui/text';

export default function HomePage() {
  return (
    <PageWrapper>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-6">
        <LinkCard href="/devices">
          <Text variant="h2">Devices</Text>
          <Webcam size={150} />
        </LinkCard>
        <LinkCard href="/scenes">
          <Text variant="h2">Scenery</Text>
          <House size={150} />
        </LinkCard>
      </div>
    </PageWrapper>
  );
}
