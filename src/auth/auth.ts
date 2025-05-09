import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db';
import { admin, apiKey, bearer, openAPI } from 'better-auth/plugins';
import { env } from '@/lib/env';

// Configure BetterAuth with Drizzle ORM adapter for PostgreSQL
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
  }),
  account: {
    accountLinking: {
      allowDifferentEmails: true,
    },
  },
  // Enable email/password authentication
  emailAndPassword: {
    enabled: true,
  },
  // Discord provider for social login - configured exactly as in docs
  socialProviders: {
    discord: {
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      scopes: ['identify', 'email', 'guilds'],
    },
  },
  // Admin plugin for user roles, banning, and impersonation
  plugins: [admin(), openAPI(), apiKey(), bearer()],
  // Additional social providers or methods can be added here
  advanced: {
    // crossSubDomainCookies: {
    //   enabled: true,
    // },
  },
});

export function getSession(headers: Headers) {
  return auth.getSession(headers);
}
