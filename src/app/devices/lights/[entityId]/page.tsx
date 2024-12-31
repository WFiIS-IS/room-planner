import 'server-only';

import type { ComponentProps } from 'react';
import { notFound } from 'next/navigation';

import { changeLightState } from '@/actions/lights';
import { PageWrapper } from '@/components/PageWrapper';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { haApiClient } from '@/lib/home-assistant/client';
import { LightState } from '@/lib/home-assistant/device-types';
import { checkState, filterLights } from '@/lib/home-assistant/state';

import LightOff from '../light-off.svg';
import LightOn from '../light-on.svg';

export type LightPageProps = {
  params: Promise<{ entityId: string }>;
};

const svgProps = {
  height: '200',
  width: '200',
} satisfies ComponentProps<typeof LightOn>;

export default async function LightPage({ params }: LightPageProps) {
  const entityId = (await params).entityId;
  const lightData = checkState(await haApiClient.getStateByEntityId(entityId), filterLights);

  if (lightData === null) {
    notFound();
  }
  const toggleLight = changeLightState.bind(
    null,
    entityId,
    lightData.state === LightState.ON ? LightState.OFF : LightState.ON,
  );

  return (
    <PageWrapper>
      <div className="mx-auto my-auto flex flex-col items-center gap-8">
        <Text variant="h1">{lightData.attributes?.friendlyName ?? lightData.entityId}</Text>
        {lightData.state === LightState.ON ? <LightOn {...svgProps} /> : <LightOff {...svgProps} />}
        <form action={toggleLight}>
          <Button type="submit">Toggle Light</Button>
        </form>
      </div>
    </PageWrapper>
  );
}
