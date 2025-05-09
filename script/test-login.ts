import { createAuthClient } from 'better-auth/client';

// Configure the Better Auth client (adjust the URL as needed)
const authClient = createAuthClient({
  baseURL: 'http://localhost:3000',
});

// Get credentials from env or command line
const email = process.env.BA_EMAIL || process.argv[2];
const password = process.env.BA_PASSWORD || process.argv[3];

if (!email || !password) {
  console.error(
    'Usage: BA_EMAIL=... BA_PASSWORD=... bun src/services/api-service/test-login.ts',
  );
  console.error(
    '   or: bun src/services/api-service/test-login.ts <email> <password>',
  );
  process.exit(1);
}

(async () => {
  try {
    const { data, error } = await authClient.signIn.email({ email, password });
    if (error) {
      console.error('Login failed:', error);
      process.exit(1);
    }
    console.log('Login successful!');
    console.log('User:', data?.user || data);
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
})();
