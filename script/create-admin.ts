import { setAdminRole } from '../src/services/api/user-util';

// Seed the database with admin user
async function main() {
  const email = process.env.ADMIN_EMAIL || process.argv[2];
  if (!email) {
    console.error('Usage: bun script/create-admin.ts <email>');
    process.exit(1);
  }
  try {
    const user = await setAdminRole({ email });
    console.log('User updated to admin:', user);
    process.exit(0);
  } catch (err) {
    console.error('Error setting admin role:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
