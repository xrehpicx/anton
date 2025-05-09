import { db } from '../src/db';
import { users } from '../src/db/schema/auth-schema';

async function main() {
  try {
    const allUsers = await db.select().from(users);
    console.log(JSON.stringify(allUsers, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error fetching users:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main(); 