import { authClient } from '../src/auth/client';

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];
  if (!email || !password) {
    console.error(
      'Usage: bun script/link-discord-to-user.ts <email> <password>',
    );
    process.exit(1);
  }

  try {
    // Sign in the user with email and password
    const { data: signInData, error: signInError } =
      await authClient.signIn.email({ email, password });
    if (signInError || !signInData?.user) {
      console.error('Failed to sign in:', signInError || 'Unknown error');
      process.exit(1);
    }
    console.log('Signed in as:', signInData.user.email);

    // Link Discord social account
    const { data: linkData, error: linkError } = await authClient.linkSocial({
      provider: 'discord',
      callbackURL: '/', // or your desired callback URL
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${signInData.token}`,
        },
      },
    });
    if (linkError) {
      console.error('Failed to link Discord:', linkError);
      process.exit(1);
    }
    if (linkData?.url) {
      console.log(
        'To complete Discord linking, open this URL in your browser:',
      );
      console.log(linkData.url);
      console.log(
        '(After completing the flow, Discord will be linked to this user.)',
      );
    } else {
      console.log('Discord linked successfully (no browser flow required).');
    }
    process.exit(0);
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

main();
