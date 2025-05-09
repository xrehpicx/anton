import { db } from '../src/db';
import {
  users,
  accounts,
  sessions,
  verifications,
  apikeys,
} from '../src/db/schema/auth-schema';

async function main() {
  try {
    await db.delete(apikeys);
    await db.delete(verifications);
    await db.delete(sessions);
    await db.delete(accounts);
    await db.delete(users);
    console.log('All user-related tables have been cleared.');
    process.exit(0);
  } catch (err) {
    console.error(
      'Error clearing user tables:',
      err instanceof Error ? err.message : err,
    );
    process.exit(1);
  }
}

main();
