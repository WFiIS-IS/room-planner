'use server';

import { revalidateTag } from 'next/cache';

import { haApiClient } from '@/lib/home-assistant/client';
import { isLightEntityId, type LightState } from '@/lib/home-assistant/device-types';

export async function changeLightState(entityId: string, newLightState: LightState) {
  if (!isLightEntityId.safeParse(entityId).success) {
    throw new Error(`Entity id ${entityId} is not a light`);
  }
  const payload = { state: newLightState };
  await haApiClient.updateStateObject(entityId, payload);
  revalidateTag('states');
}
