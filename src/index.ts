import { app, init } from '@/services/api';
import { get_env } from '@/lib/env';

async function main() {
  const [ok, err] = await init();
  if (!ok) {
    console.error('API service init failed:', err);
    process.exit(1);
  }
  const env = get_env();
  const port = env.PORT ?? 3000;
  console.log(`🚀 Starting Anya API on http://localhost:${port}`);
  console.log(`🌐 Web UI available at: ${env.UI_HOME_URL}`);
  
  Bun.serve({
    fetch: app.fetch,
    port,
  });
}

main();
