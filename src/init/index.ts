import './logging';

await Promise.all([import('./db-init'), import('./ha-check'), import('./media-setup')]);
