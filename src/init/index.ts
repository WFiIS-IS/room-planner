import './logging';

await Promise.all([import('./bucketSetup'), import('./db-init')]);
