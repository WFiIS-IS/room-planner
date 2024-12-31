import 'server-only';

import axios, { type AxiosInstance } from 'axios';

import { env } from '@/env/server';
import { memoize } from '@/lib/cache';
import type { StateObject } from '@/lib/home-assistant/api-types';
import { mainLogger } from '@/lib/logger';
import { r } from '@/lib/utils';

const logger = mainLogger.child({ name: 'home-assistant/client.ts' });

export type HaClientConstructorParams = {
  url: string;
  token: string;
};

export class HaClient {
  private readonly __httpClient: AxiosInstance;

  constructor({ token, url }: HaClientConstructorParams) {
    this.__httpClient = axios.create({
      baseURL: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      adapter: 'fetch',
    });
  }

  async checkAlive() {
    const [response, error] = await r(this.__httpClient.get('/api/'));
    if (error) {
      logger.error(`HaClient.checkAlive() - error: ${error}`, { error });
      return false;
    }
    logger.debug(`HaClient.checkAlive() - success "${JSON.stringify(response.data)}"`, {
      response,
    });
    return true;
  }

  readonly getStates = memoize(
    async () => {
      logger.info(`HaClient.getStates() requesting states`);
      const [response, error] = await r(this.__httpClient.get<StateObject[]>('/api/states'));
      if (error) {
        logger.error(`HaClient.getStates() - error: ${error}`, { error });
        throw error;
      }
      const data = response.data;
      logger.debug(`HaClient.getStates() - data.length: ${data.length}`);
      return data;
    },
    {
      log: ['datacache', 'dedupe'],
      logId: 'haClient.getStates()',
      revalidateTags: ['states'],
      persist: true,
      duration: 2 * 60, // 2 minutes
    },
  );
}

export const haApiClient = new HaClient({ url: env.HA_URL, token: env.HA_TOKEN });
