import { db } from '@/lib/db/client';

export type DbTransaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

export function getTransactionContext(tx?: DbTransaction) {
  if (tx) {
    return tx;
  }
  return db;
}
