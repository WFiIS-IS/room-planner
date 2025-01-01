import 'server-only';

import { Clock, SunMoon, Thermometer } from 'lucide-react';

import { LinkCard } from '@/components/LinkCard';
import { PageWrapper } from '@/components/PageWrapper';
import { Text } from '@/components/ui/text';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <PageWrapper>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-6">
        <LinkCard href="/devices/lights">
          <Text variant="h2">Lights</Text>
          <SunMoon size={150} />
        </LinkCard>
        <LinkCard href="/devices/timestamp-sensors">
          <Text variant="h2">Timestamp Sensors</Text>
          <Clock size={150} />
        </LinkCard>
        <LinkCard href="/devices/thermometers">
          <Text variant="h2">Thermometers</Text>
          <Thermometer size={150} />
        </LinkCard>
      </div>
    </PageWrapper>
  );
}
