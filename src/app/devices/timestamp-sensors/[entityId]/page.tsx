import 'server-only';

import { notFound } from 'next/navigation';
import { Clock } from 'lucide-react';

import { PageWrapper } from '@/components/PageWrapper';
import { Text } from '@/components/ui/text';
import { haApiClient } from '@/lib/home-assistant/client';
import { checkState, filterTimestampSensors } from '@/lib/home-assistant/state';

export type TimestampSensorPageProps = {
  params: Promise<{ entityId: string }>;
};

export default async function TimestampSensorPage({ params }: TimestampSensorPageProps) {
  const entityId = (await params).entityId;
  const timestampSensor = checkState(
    await haApiClient.getStateByEntityId(entityId),
    filterTimestampSensors,
  );

  if (timestampSensor === null) {
    notFound();
  }

  return (
    <PageWrapper>
      <div className="mx-auto my-auto flex flex-col items-center gap-8">
        <Text variant="h1">
          {timestampSensor.attributes?.friendlyName ?? timestampSensor.entityId}
        </Text>
        <Clock size={200} />
        <Text variant="h2">{timestampSensor.state.toLocaleString()}</Text>
      </div>
    </PageWrapper>
  );
}
