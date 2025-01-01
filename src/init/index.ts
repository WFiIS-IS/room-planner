import './logging';

await Promise.all([
  import('./bucketSetup'),
  import('./db-init'),
  import('./ha-check'),
  import('./media-setup'),
]);
