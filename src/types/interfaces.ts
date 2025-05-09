/**
 * Interface Types
 * 
 * Type definitions for various interface-related structures.
 */

import { z } from 'zod';
import { apiKeyCredentialsSchema } from '@/interfaces/api-interface';
import { discordCredentialsSchema } from '@/interfaces/discord-interface';

// User interface schema
export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'system']).default('system'),
    notifications_enabled: z.boolean().default(true),
  }).optional(),
});

// Interface schema
export const interfaceSchema = z.object({
  id: z.string(),
  type: z.enum(['api', 'discord', 'slack', 'web']),
  config: z.record(z.string(), z.any()).optional(),
  is_active: z.boolean().default(true),
});

// Linked interface schema
export const linkedInterfaceSchema = z.object({
  user_id: z.string(),
  interface_id: z.string(),
  credentials: z.record(z.string(), z.any()).optional(),
});

// Type exports
export type User = z.infer<typeof userSchema>;
export type UserInterface = z.infer<typeof interfaceSchema>;
export type LinkedInterface = z.infer<typeof linkedInterfaceSchema>;

// Credential types
export type ApiCredentials = z.infer<typeof apiKeyCredentialsSchema>;
export type DiscordCredentials = z.infer<typeof discordCredentialsSchema>; 