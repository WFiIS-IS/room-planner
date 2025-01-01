import { format } from 'date-fns';
import pino, { type Logger, type LoggerOptions } from 'pino';

import { isDev } from '@/env/common';

const COLOR = {
  GREEN: `\x1b[32m`,
  RED: `\x1b[31m`,
  WHITE: `\x1b[37m`,
  YELLOW: `\x1b[33m`,
  CYAN: `\x1b[36m`,
} as const;

const LEVEL_COLORS = {
  FATAL: COLOR.RED,
  ERROR: COLOR.RED,
  WARN: COLOR.YELLOW,
  INFO: COLOR.GREEN,
  DEBUG: COLOR.GREEN,
  TRACE: COLOR.GREEN,
} as const;

const dispatchers = {
  FATAL: console.error.bind(console),
  ERROR: console.error.bind(console),
  WARN: console.warn.bind(console),
  INFO: console.info.bind(console),
  DEBUG: console.debug.bind(console),
  TRACE: console.trace.bind(console),
} as const;

const commonOptions = {
  browser: {
    write: (logObj) => {
      const { level, msg, name, time } = logObj as Record<string, string>;

      const levelUppercased = level.toUpperCase();

      const timeFormatted = format(new Date(time), `HH:mm:ss.sss`);

      const LEVEL_COLOR = LEVEL_COLORS[levelUppercased as keyof typeof LEVEL_COLORS];

      const dispatcher = dispatchers[levelUppercased as keyof typeof dispatchers];

      const nameGroup = name ? ` [${name}] ` : '';

      dispatcher(
        `[${timeFormatted}] ${LEVEL_COLOR}${levelUppercased} ${COLOR.CYAN}${nameGroup}${msg} ${COLOR.WHITE}`,
      );
    },
    formatters: {
      level: (label) => {
        return {
          level: label,
        };
      },
    },
  },
} as const satisfies Partial<LoggerOptions>;

export const mainLogger: Logger = !isDev
  ? // JSON in production
    pino({ ...commonOptions, level: 'warn' })
  : // Pretty print in development
    pino({
      ...commonOptions,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
      level: 'debug',
    });
