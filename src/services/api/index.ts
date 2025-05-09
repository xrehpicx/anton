import { Hono } from 'hono';
import { init_env } from '@/lib/env';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { auth } from '@/auth/auth';
import { requireAuth, apiKeyAuth } from './middleware';
import { db } from '@/db';
import { users } from '@/db/schema/auth-schema';
import type { InferSelectModel } from 'drizzle-orm';
import { env } from '@/lib/env';

// Define all schemas first
const signup_schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

const login_schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const user_schema = z.object({
  id: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  preferences: z
    .object({
      theme: z.enum(['light', 'dark', 'system']).default('system'),
      notifications_enabled: z.boolean().default(true),
    })
    .optional(),
});

// User API routes with type safety
const user_api = new Hono()
  .get('/', (c) => {
    return c.json({ users });
  })
  .post('/', zValidator('json', user_schema), (c) => {
    const user = c.req.valid('json');
    users.push(user);
    return c.json({
      message: 'User created successfully',
      user,
    });
  })
  .get('/:id', (c) => {
    const id = c.req.param('id');
    const user = (users as Array<{ id: string }>).find(
      (u: { id: string }) => u.id === id,
    );
    if (!user) return c.json({ error: 'User not found' }, 404);
    return c.json({ user });
  })
  .put('/:id', zValidator('json', user_schema), (c) => {
    const id = c.req.param('id');
    const updated_user = c.req.valid('json');
    const index = (users as Array<{ id: string }>).findIndex(
      (u: { id: string }) => u.id === id,
    );

    if (index === -1) return c.json({ error: 'User not found' }, 404);

    (users as Array<{ id: string }>)[index] = updated_user;
    return c.json({
      message: 'User updated successfully',
      user: updated_user,
    });
  });

const api = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>()
  .basePath('/api')
  // Use method chaining for the API's own routes
  .post('/signup', async (c) => {
    let data;
    const contentType = c.req.header('content-type') || '';
    if (contentType.includes('application/json')) {
      data = await c.req.json();
    } else {
      data = await c.req.parseBody();
    }
    console.log('Parsed signup data:', data);
    const parse = signup_schema.safeParse(data);
    if (!parse.success) {
      return c.json({ success: false, error: parse.error }, 400);
    }
    const { name, email, password } = parse.data;
    try {
      const response = await auth.api.signUpEmail({
        body: { email, password, name },
        asResponse: true,
      });
      const respData = await response.json();
      if (!response.ok) {
        return c.json(
          { error: respData.error || 'Signup failed' },
          response.status,
        );
      }
      return c.json({
        message: 'Signup successful',
        user: respData.user || { email, name },
      });
    } catch (err) {
      return c.json(
        { error: err instanceof Error ? err.message : 'Unknown error' },
        500,
      );
    }
  })
  .post('/login', zValidator('json', login_schema), async (c) => {
    const { email, password } = c.req.valid('json');
    try {
      const response = await auth.api.signInEmail({
        body: { email, password },
        asResponse: true,
      });
      const data = await response.json();
      if (!response.ok) {
        return c.json({ error: data.error || 'Login failed' }, response.status);
      }
      return c.json({ message: 'Login successful', user: data.user }, 200);
    } catch (err) {
      return c.json(
        { error: err instanceof Error ? err.message : 'Login error' },
        500,
      );
    }
  })
  .get('/me', requireAuth, async (c) => {
    const user = c.get('user');
    if (!user) {
      return c.json({ error: 'Not authenticated' }, 401);
    }
    const dbUser = await db.query.users.findFirst({
      where: (
        u: InferSelectModel<typeof users>,
        { eq }: { eq: (a: string, b: string) => boolean },
      ) => eq(u.id, user.id),
    });
    if (!dbUser) {
      return c.json({ error: 'User not found' }, 404);
    }
    return c.json({ user: dbUser });
  })
  // Chain route() calls for better RPC type inference
  .route('/user', user_api);

// Create main Hono app with routes - use a variable for routes to improve type inference
const routes = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>()
  .use('*', logger())
  .use(
    '*',
    cors({
      origin: '*',
      allowHeaders: ['Content-Type', 'Authorization'],
      allowMethods: ['POST', 'GET', 'OPTIONS'],
      exposeHeaders: ['Content-Length'],
      credentials: true,
    }),
  )
  .use('*', async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
      c.set('user', null);
      c.set('session', null);
    } else {
      c.set('user', session.user);
      c.set('session', session.session);
    }
    return next();
  })
  .get('/health', (c) => c.text('OK'))
  .get('/', (c) => c.redirect(env.UI_HOME_URL))
  .on(['POST', 'GET'], '/api/auth/*', (c) => auth.handler(c.req.raw))
  .get('/auth/callback', (c) => auth.api.handleCallback(c))
  .route('/', api); // Mount all API routes

// The main app
export const app = routes;

// Export API types for client-side type safety
export type UserApi = typeof user_api;
export type ApiType = typeof api;

// Initialize the API service with environment validation
export async function init(): Promise<[boolean, Error | null]> {
  try {
    init_env();
    return [true, null];
  } catch (err: unknown) {
    return [false, err instanceof Error ? err : new Error(String(err))];
  }
}
