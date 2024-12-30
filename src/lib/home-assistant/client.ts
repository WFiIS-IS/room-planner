import 'server-only';

import axios, { type AxiosInstance } from 'axios';

import { env } from '@/env/server';
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
}

export const haApiClient = new HaClient({ url: env.HA_URL, token: env.HA_TOKEN });
