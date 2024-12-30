export const isDev = !!process && process.env.NODE_ENV === 'development';
export const renderType = typeof window === 'undefined' ? 'server' : 'client';
export const isBrowser = renderType === 'client';
