import 'dotenv/config';
import { z } from 'zod';

// Define and validate environment variables
const env_schema = z.object({
  DATABASE_URL: z.string().url(),
  OPENAI_API_KEY: z.string().min(1),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z
    .string()
    .regex(/^[0-9]+$/)
    .transform((val) => parseInt(val, 10))
    .optional(),
  DISCORD_CLIENT_ID: z.string().min(1),
  DISCORD_CLIENT_SECRET: z.string().min(1),
  DISCORD_REDIRECT_URI: z.string().url(),
  RESEND_API_KEY: z.string().min(1),
  UI_HOME_URL: z.string().url().default('http://localhost:5173'),
});

type Env = z.infer<typeof env_schema>;
let parsed_env: Env | null = null;

/**
 * Validates process.env against the combined base and custom schemas.
 * Throws on validation errors.
 */
export function init_env() {
  const result = env_schema.parse(process.env);
  // Type assertion is safe here because Zod guarantees the type
  if (
    !('DATABASE_URL' in result) ||
    !('OPENAI_API_KEY' in result) ||
    !('NODE_ENV' in result)
  ) {
    throw new Error('Environment variables are missing required fields.');
  }
  parsed_env = result as Env;
  return parsed_env;
}

export function get_env(): Env {
  if (parsed_env === null) {
    parsed_env = init_env();
  }
  return parsed_env;
}

// Export a stable env object for direct imports
export const env = get_env();
