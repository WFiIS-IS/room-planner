import 'server-only';

import { Thermometer } from 'lucide-react';

import { PageWrapper } from '@/components/PageWrapper';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { haApiClient } from '@/lib/home-assistant/client';
import { filterThermometers } from '@/lib/home-assistant/state';

export default async function DevicePage() {
  const states = await haApiClient.getStates();
  const lights = filterThermometers(states);
  return (
    <PageWrapper>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-6">
        {lights.map((thermometer) => (
          <Card key={thermometer.entityId}>
            <CardContent className="my-2 flex flex-col items-center gap-4">
              <Text variant="h4">
                {thermometer.attributes?.friendlyName ?? thermometer.entityId}
              </Text>
              <Thermometer size={100} />
              <Text>
                {thermometer.state}
                {thermometer.attributes.unitOfMeasurement}
              </Text>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
}
