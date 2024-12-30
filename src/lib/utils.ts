import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Represents tuple of which first element is the result of computation and the second one is an
 * error (if any occurs)
 */
export type Result<DataType, ErrorType = Error> = [DataType, undefined] | [undefined, ErrorType];

/** Converse a promise to a promise that returns a Result */
export async function intoResult<T, ErrorType = Error>(
  promise: Promise<T>,
): Promise<Result<T, ErrorType>> {
  try {
    const result = await promise;
    return [result, undefined] as const;
  } catch (e: unknown) {
    return [undefined, e as ErrorType] as const;
  }
}

export { intoResult as r };
