# Project TODO: Anya AI Platform

## Rules / Guidelines

- [x] Use functional-only approach for AI service logic.
- [x] Implement Go-style error handling (tuple return [result, error]).

## Core Architecture

- [x] Isolate core AI logic in its own service (e.g., `@anya/ai-service`)
  - [x] Expose `ask_anya` function for chat behavior
  - [x] Use functional-only approach for AI service logic
  - [x] Implement Go-style error handling (tuple return [result, error])
  - [x] Create `services/` directory with dedicated folder per service
  - [x] Each service folder contains an `index.ts` file exporting an `init` function and additional service-specific methods
  - [x] Ensure functional-only implementation of all service logic
  - [x] Consistent Go-style error handling (tuple `[result, error]`) across all services
  - [x] Enforce kebab-case or snake_case naming conventions across all files, folders, variables, and functions
  - [ ] Support tool usage (declaration, management, filtering)
  - [ ] Implement scalable tool boilerplate
  - [x] Add user permission system for tool filtering

## Database

- [x] Set up Drizzle ORM exclusively for all database interactions
- [x] Use PostgreSQL as the only supported database engine
- [x] Add `docker-compose.yml` for dev PostgreSQL
- [x] Design initial schema for user management using BetterAuth conventions
  - [x] Integrate BetterAuth for authentication and user management
  - [x] Define BetterAuth tables based on recommended setup
- [x] Ensure all models, schema, and migrations use Drizzle ORM
- [x] Maintain snake_case naming conventions for all tables and fields

## API & Interfaces

- [x] Create "Anya Service" API (separate from AI service logic)
- [ ] Support multiple interfaces (HTTP, Discord, etc.)
  - [ ] Generalize/pluggable interface abstraction
  - [ ] Allow users to link accounts across interfaces (API key, Discord auth, etc.)
  - [ ] User model supports mapping multiple interface identities to a single user

## Project Setup & Callouts

- [x] Bun, TypeScript, ESLint, Prettier, and `src/` structure
- [x] Use `bun x` for running CLI commands instead of `npx`
- [x] Import alias `@/` for all code in `src/`
- [x] Linting and formatting scripts in `package.json`
- [x] Designed for extensibility and modularity
- [x] Variable naming should ideally use snake_case or camelCase
- [x] All environment variable access must use the validated env lib (`src/lib/env.ts`), not process.env, for type safety and validation

---

**Next Steps:**

- [x] Create the API service and interface abstraction
- [x] Implement the core AI service and tool system
- [x] Set up Drizzle ORM and PostgreSQL schema for users
- [ ] Add Docker Compose for local PostgreSQL development

---

🔔 **Reminder:** Use this file to track all changes and update it every time you complete something.

- [x] Design initial schema for user management using BetterAuth conventions
  - [x] Integrate BetterAuth for authentication and user management
  - [x] Define BetterAuth tables based on recommended setup
- [x] All schema files are now located in `src/db/schema/` (one file per table or feature is recommended)
- [x] Drizzle config is set to include all `.ts` files in `src/db/schema/` for migrations
- [x] BetterAuth schema is generated and included in `src/db/schema/auth-schema.ts`
- [x] When adding new tables, create a new file in `src/db/schema/` and it will be picked up automatically
