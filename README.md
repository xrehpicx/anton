# Anya AI Platform

A modular AI platform with strong authentication and multiple interface options.

## Features

- **User Authentication**: Complete authentication system using BetterAuth with email/password and Discord login
- **Multiple Interface Methods**: Connect to the platform via:
  - Web UI
  - Discord Integration (as an interface method)
  - API Keys
- **Extensible Design**: Easily add new interface methods like Slack, Telegram, etc.

## Setup Instructions

### Prerequisites

- [Bun](https://bun.sh/) installed
- PostgreSQL database (for production)
- Discord Developer Application (for Discord OAuth)

### Discord Developer Setup

1. Create a new application at the [Discord Developer Portal](https://discord.com/developers/applications)
2. Go to the OAuth2 section and add a redirect URL:
   ```
   http://localhost:3000/api/auth/callback/discord
   ```
3. Copy your Client ID and Client Secret to use in your .env file

### Environment Variables

Create a `.env` file with:

```
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/anya

# Auth
AUTH_SECRET=your-secret-key

# Discord Integration (required for Discord OAuth)
DISCORD_CLIENT_ID=your-discord-client-id  
DISCORD_CLIENT_SECRET=your-discord-client-secret
```

### Installation

1. Install dependencies:

```bash
bun install
```

2. Run migrations (if using BetterAuth CLI):

```bash
bunx @better-auth/cli migrate
```

3. Start the development server:

```bash
bun dev
```

## Usage

1. Navigate to `http://localhost:3000/ui` to access the web interface
2. Create an account or sign in with Discord
3. Set up API keys for programmatic access
4. Connect your Discord account as an interface method to interact with the platform

## Authentication Flow

1. Users can authenticate with email/password or sign in with Discord
2. The OAuth callback is handled by BetterAuth at `/api/auth/callback/discord`
3. After authentication, users can see their account details and connect additional interface methods

## Project Structure

- `src/auth`: Authentication setup and client
- `src/components`: UI components
- `src/interfaces`: Interface implementations (API, Discord, etc.)
- `src/services`: Core services including API endpoints

## Adding New Interface Methods

1. Create a new interface implementation in `src/interfaces/`
2. Add necessary API routes
3. Update UI to include the new interface option

## License

MIT
