import pino from 'pino';

export const isDev = !!process && process.env.NODE_ENV === 'development';

export const logger = (defaultConfig) =>
  !isDev
    ? // JSON in production
      pino({ ...defaultConfig, level: 'warn' })
    : // Pretty print in development
      pino({
        ...defaultConfig,
        mixin: () => ({ name: 'nextjs' }),
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
        level: 'debug',
      });
