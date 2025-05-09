import { env } from '../lib/env';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema/schema';
import * as authSchema from './schema/auth-schema';

// Combine all tables into a single schema object
const allSchemas = { ...schema, ...authSchema };

// Initialize Postgres client and Drizzle ORM with schemas for type safety
const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema: allSchemas });
