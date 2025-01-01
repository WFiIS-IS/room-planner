import { db } from '@/lib/db/client';

export type DbTransaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

export function getTransactionContext(tx?: DbTransaction) {
  if (tx) {
    return tx;
  }
  return db;
}

export const takeUnique = <T extends unknown[]>(values: T): T[number] | null => {
  if (values.length > 2) throw new Error('Found multiple matching values');
  return values[0] ?? null;
};
