import 'server-only';

import { notFound } from 'next/navigation';
import { Thermometer } from 'lucide-react';

import { PageWrapper } from '@/components/PageWrapper';
import { Text } from '@/components/ui/text';
import { haApiClient } from '@/lib/home-assistant/client';
import { checkState, filterThermometers } from '@/lib/home-assistant/state';

export type ThermometerPageProps = {
  params: Promise<{ entityId: string }>;
};

export default async function ThermometerPage({ params }: ThermometerPageProps) {
  const entityId = (await params).entityId;
  const thermometer = checkState(
    await haApiClient.getStateByEntityId(entityId),
    filterThermometers,
  );

  if (thermometer === null) {
    notFound();
  }

  return (
    <PageWrapper>
      <div className="mx-auto my-auto flex flex-col items-center gap-8">
        <Text variant="h1">{thermometer.attributes?.friendlyName ?? thermometer.entityId}</Text>
        <Thermometer size={200} />
        <Text variant="h2">
          {thermometer.state}
          {thermometer.attributes.unitOfMeasurement}
        </Text>
      </div>
    </PageWrapper>
  );
}
