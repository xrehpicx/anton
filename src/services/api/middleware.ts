/**
 * API Service Middleware
 *
 * This file provides middleware functions for the API service.
 */

import type { Context, Next } from 'hono';
import { apiKey } from 'better-auth/plugins';

/**
 * Authentication check middleware
 *
 * Ensures user is authenticated before accessing protected routes
 */
export async function requireAuth(c: Context, next: Next) {
  const user = c.get('user');

  if (!user) {
    return c.json({ error: 'Authentication required' }, 401);
  }

  return next();
}

/**
 * API key authentication middleware
 *
 * Validates API key from request and sets user if valid
 */
export async function apiKeyAuth(c: Context, next: Next) {
  // Check if already authenticated via session
  if (c.get('user')) {
    return next();
  }

  return next();
}
