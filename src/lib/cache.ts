// From: https://github.com/alfonsusac/nextjs-better-unstable-cache/blob/main/src/index.ts
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import chalk from 'chalk';

import { mainLogger } from '@/lib/logger';

const logger = mainLogger.child({ name: 'cache.ts' });

type Callback<Parameters extends unknown[], ReturnType> = (
  ...args: Parameters
) => ReturnType | Promise<ReturnType>;

export type MemoizeOptionType<Parameters extends unknown[]> = {
  persist?: boolean;
  duration?: number;
  log?: ('dedupe' | 'datacache' | 'verbose')[];
  logId?: string;
  revalidateTags?: ((...params: Parameters) => string[]) | string[];
  additionalCacheKey?: ((...params: Parameters) => string[]) | string[];
  suppressWarnings?: boolean;
};

/**
 * ### MEMOIZE: unstable_cache() + cache()
 *
 * A way to generalize the data caching function in Next.js
 */

export function memoize<P extends unknown[], R>(cb: Callback<P, R>, opts?: MemoizeOptionType<P>) {
  if (typeof window !== 'undefined') {
    // Fallback to original function if window is defined (client side)
    if (!opts?.suppressWarnings) {
      logger.error('⚠️ Memoize: this function will not work in the client environment.');
    }
    return async (...args: P) => {
      return cb(...args);
    };
  }
  if (typeof cache === 'undefined' && typeof unstable_cache === 'undefined') {
    // Fallback to the original function if there's no caching functions (ex. on react native)
    if (!opts?.suppressWarnings) {
      logger.error(
        '⚠️ Memoize: cache or unstable_cache function not found. Falling back to original function',
      );
    }
    return async (...args: P) => {
      return cb(...args);
    };
  }

  const {
    // default values
    persist = true,
    duration = Infinity,
    log = [],
    revalidateTags: revalidateTagsFn,
    additionalCacheKey: additionalCacheKeyFn,
  } = opts ?? {};
  const logDataCache = log.includes('datacache');
  const logDedupe = log.includes('dedupe');
  const logVerbose = log.includes('verbose');
  const logID = opts?.logId ? `${opts.logId} ` : '';
  const _logger = logID ? logger.child({ name: `cache.ts -> ${logID}` }) : logger;

  let oldData: R;
  let renderCacheHit: boolean;
  renderCacheHit = false;

  const cachedFn = cache(async (...args: P) => {
    renderCacheHit = true;
    if (persist) {
      // Initialize unstable_cache
      const additionalCacheKey = additionalCacheKeyFn
        ? typeof additionalCacheKeyFn === 'function'
          ? additionalCacheKeyFn(...args)
          : additionalCacheKeyFn
        : [];
      const revalidateTags = revalidateTagsFn
        ? typeof revalidateTagsFn === 'function'
          ? revalidateTagsFn(...args)
          : revalidateTagsFn
        : [];
      const cacheKey = [cb.toString(), JSON.stringify(args), ...additionalCacheKey];
      const nextOpts = {
        revalidate: duration,
        tags: ['all', ...revalidateTags],
      };
      if (logDataCache) {
        let dataCacheMiss = false;
        const audit = new Audit();
        const data = await unstable_cache(
          async () => {
            dataCacheMiss = true;
            return cb(...args);
          },
          cacheKey,
          nextOpts,
        )();
        const time = audit!.getSec();
        const isSame = oldData === data;
        _logger.info(
          `${chalk.hex('AA7ADB').bold('Data Cache')} - ` +
            `${chalk.hex('A0AFBF')(`${logID}${cb.name}`)} ${chalk.hex('#AA7ADB').bold(dataCacheMiss ? 'MISS' : 'HIT')} ` +
            `${chalk.hex('A0AFBF')(time.toPrecision(3) + 's')} ` +
            `${chalk.hex('AA7ADB').bold(dataCacheMiss ? (isSame ? 'background-revalidation' : 'on-demand revalidation') : '')} `,
        );
        if (logVerbose) {
          _logger.info(
            `${chalk.hex('6A7C8E').bold(` └ ${cb.name ?? 'Anon Func'} ${JSON.stringify(args)}`)}`,
          );
        }

        oldData = data;
        return data;
      } else {
        return await unstable_cache(
          async () => {
            return cb(...args);
          },
          [cb.toString(), JSON.stringify(args), ...additionalCacheKey],
          {
            revalidate: duration,
            tags: ['all', ...revalidateTags],
          },
        )();
      }
    } else {
      // return callback directly
      return cb(...args);
    }
  });
  return async (...args: P) => {
    if (logDedupe) {
      const audit2 = new Audit();
      const data = await cachedFn(...args);
      const time = audit2.getSec();
      _logger.info(
        `${chalk.hex('#FFB713').bold('Memoization')} - ` +
          `${chalk.hex('A0AFBF')(`${logID}${cb.name}`)} ${chalk.hex('#FFC94E').bold(renderCacheHit ? 'HIT' : 'MISS')} ` +
          `${chalk.hex('A0AFBF')(time.toPrecision(3) + 's')} `,
      );
      renderCacheHit = false;
      return data;
    } else {
      return await cachedFn(...args);
    }
  };
}

class Audit {
  private _start: number = performance.now();
  private _end: number | null = null;
  getSec() {
    this._end = performance.now();
    return (this._end - this._start) / 1000;
  }
}
