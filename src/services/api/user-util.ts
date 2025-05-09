import { db } from '@/db';
import { users, accounts } from '@/db/schema/auth-schema';
import { eq } from 'drizzle-orm';
import { hashPassword } from 'better-auth/crypto';

export interface CreateAdminUserInput {
  name: string;
  email: string;
  password: string;
  image?: string;
}

export async function createAdminUser({
  name,
  email,
  password,
  image,
}: CreateAdminUserInput) {
  // Check if user already exists
  const existing = await db.select().from(users).where(eq(users.email, email));
  if (existing.length > 0) {
    throw new Error('User with this email already exists');
  }

  const now = new Date();
  const adminUserObj = {
    id: 'app-admin',
    name: name || 'Admin',
    email,
    emailVerified: true,
    image: image || null,
    createdAt: now,
    updatedAt: now,
    role: 'admin',
    banned: false,
    banReason: null,
    banExpires: null,
  };

  const adminAccountObj = {
    id: 'app-admin-main-account',
    accountId: 'app-admin',
    providerId: 'credential',
    userId: 'app-admin',
    accessToken: null,
    refreshToken: null,
    idToken: null,
    accessTokenExpiresAt: null,
    refreshTokenExpiresAt: null,
    scope: null,
    password: await hashPassword(password),
    createdAt: now,
    updatedAt: now,
  };

  await db.insert(users).values(adminUserObj);
  await db.insert(accounts).values(adminAccountObj);

  // Return the created user
  return await db.select().from(users).where(eq(users.id, 'app-admin'));
}

export interface SetAdminRoleInput {
  email: string;
}

export async function setAdminRole({ email }: SetAdminRoleInput) {
  // Find the user by email
  const existing = await db.select().from(users).where(eq(users.email, email));
  if (existing.length === 0) {
    throw new Error('User with this email does not exist');
  }
  // Update the user's role to 'admin' and emailVerified to true
  await db.update(users).set({ role: 'admin', emailVerified: true }).where(eq(users.email, email));
  // Return the updated user
  return await db.select().from(users).where(eq(users.email, email));
}
