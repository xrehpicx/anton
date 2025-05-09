import { authClient } from '../src/auth/client';

(async () => {
  try {
    // Initiate Discord social login
    const { data, error } = await authClient.signIn.social({
      provider: 'discord',
      // Optionally, you can specify a callbackURL here if needed
      scopes: ['identify', 'email', 'guilds'],
    });
    if (error) {
      console.error('Failed to initiate Discord login:', error);
      process.exit(1);
    }
    if (!data?.url) {
      console.error('No login URL returned.');
      process.exit(1);
    }
    console.log(
      'To test Discord login, open the following URL in your browser:',
    );
    console.log(data.url);
    console.log(
      '\nAfter completing the login in your browser, you will be authenticated in that browser session.',
    );
    console.log(
      'This CLI script does not fetch the session after login, as Discord OAuth is browser-based.',
    );
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
})();
