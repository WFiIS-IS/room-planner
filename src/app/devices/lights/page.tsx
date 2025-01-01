import 'server-only';

import type { ComponentProps } from 'react';

import { changeLightState } from '@/actions/lights';
import { PageWrapper } from '@/components/PageWrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { haApiClient } from '@/lib/home-assistant/client';
import { LightState } from '@/lib/home-assistant/device-types';
import { filterLights } from '@/lib/home-assistant/state';

import LightOff from './light-off.svg';
import LightOn from './light-on.svg';

const svgProps = {
  className: '!w-full !h-full p-2',
} satisfies ComponentProps<typeof LightOn>;

export const dynamic = 'force-dynamic';

export default async function LightsPage() {
  const states = await haApiClient.getStates();
  const lights = filterLights(states);

  return (
    <PageWrapper>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-6">
        {lights.map((light) => (
          <Card key={light.entityId}>
            <CardContent className="my-2 flex flex-col items-center gap-4">
              <Text variant="h4">{light.attributes?.friendlyName ?? light.entityId}</Text>
              <form
                action={changeLightState.bind(
                  null,
                  light.entityId,
                  light.state === LightState.ON ? LightState.OFF : LightState.ON,
                )}
              >
                <Button variant="ghost" type="submit" className="flex h-[100px] w-[100px] p-0">
                  {light.state === LightState.ON ? (
                    <LightOn {...svgProps} />
                  ) : (
                    <LightOff {...svgProps} />
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
}
