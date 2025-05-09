import { db } from '../src/db';
import { users, accounts } from '../src/db/schema/auth-schema';
import { eq } from 'drizzle-orm';

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error('Usage: bun script/list-accounts-by-email.ts <email>');
    process.exit(1);
  }

  // Find the user by email
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (!user.length) {
    console.error(`No user found with email: ${email}`);
    process.exit(1);
  }
  const userId = user[0].id;

  // Find all accounts for this user
  const userAccounts = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, userId));
  if (!userAccounts.length) {
    console.log(`User with email ${email} has no linked accounts/providers.`);
    process.exit(0);
  }

  console.log(`Accounts for user ${email} (userId: ${userId}):`);
  for (const acc of userAccounts) {
    console.log(`- Provider: ${acc.providerId}, Account ID: ${acc.accountId}`);
    console.log(acc);
  }
  process.exit(0);
}

main();
