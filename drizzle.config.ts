import { defineConfig } from 'drizzle-kit';
import { env } from './src/lib/env';

/**
 * Drizzle config: only include schema.ts for migrations, not all db files.
 * Use a plain object export for compatibility with CLI and to avoid type errors.
 */
export default defineConfig({
  schema: './src/db/schema/*.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
