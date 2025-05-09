import type { ApiType } from './index';
import { hc } from 'hono/client';

export const client = hc<ApiType>('', {
  init: { credentials: 'include' },
});

export type Client = typeof client;
