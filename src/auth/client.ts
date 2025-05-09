import { createAuthClient } from 'better-auth/client';
import {
  adminClient,
  apiKeyClient,
  inferAdditionalFields,
} from 'better-auth/client/plugins';
import type { auth } from './auth';
import { env } from '@/lib/env';

// Create auth client for client-side authentication operations
export const authClient = createAuthClient({
  baseURL: env.UI_HOME_URL,
  plugins: [
    adminClient(),
    inferAdditionalFields<typeof auth>(),
    apiKeyClient(),
  ],
});

// Example functions for authentication operations
export async function signInWithDiscord(callbackURL: string = env.UI_HOME_URL) {
  return await authClient.signIn.social({
    provider: 'discord',
    callbackURL,
  });
}
