# Contributing to Anya AI Platform

Thank you for your interest in contributing! To keep the project consistent and maintainable, please follow these guidelines:

---

## 1. Code of Conduct

Please adhere to our Code of Conduct. Be respectful, inclusive, and collaborative.

## 2. Contribution Workflow

1. Fork the repository.
2. Create a descriptive branch name in **kebab-case**, for example:
   - feature/your-feature-name
   - bugfix/your-bug-description
3. Commit changes with clear messages (see Conventional Commits below).
4. Push to your fork and open a Pull Request against `main`.
5. Fill in the PR template and link any related issues.
6. Request review from at least one maintainer.

## 3. Branch and Commit Guidelines

- **Branch names**: kebab-case (e.g., `feature/add-env-util`).
- **Commit messages**: use [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`.

## 4. Coding Conventions

To ensure clarity and consistency across the codebase, please follow these naming conventions:

- **Files & directories**: kebab-case (e.g., `user-service`, `auth-schema.ts`).
  - **Callout:** All files and folders in the UI (`web` folder) _must_ use kebab-case. For example: `user-profile.tsx`, `api-client.ts`, `sign-in-form/`.
  - **Common mistake:** Do NOT use PascalCase or camelCase for files or folders in the UI.
- **Variables & functions**: snake_case (e.g., `get_env`, `init_env`).
- **Constants & environment variables**: UPPER_SNAKE_CASE (e.g., `DATABASE_URL`).
- **Types & interfaces**: PascalCase (e.g., `UserModel`, `AuthService`).

> **Note:**
> **All environment variable access must go through the validated env util (`src/lib/env.ts`).**
> **Do NOT use `process.env` directly anywhere in the codebase.**
> This ensures all environment variables are validated, typed, and consistent across the project.

## 5. Technology Standards

To maintain consistency across the codebase, please adhere to these technology standards:

- **API Server**: Use [Hono](https://hono.dev/) for all API endpoints. Group all `/api` endpoints using a dedicated Hono instance with `.basePath('/api')` and chain all route and sub-router registrations for best type inference.
- **API Client (UI)**: Always use the Hono client (`hc`) for API requests. Create a single, properly typed client instance for the `/api` group, and use it for all API communication in the UI.
  - **Callout:** The Hono API client _must_ have a single entry point in the UI, e.g., `web/src/lib/api.ts`. All API calls in the UI must go through this client. Do **not** use fetch or axios directly for API endpoints.
  - **Example:**
    ```ts
    // web/src/lib/api.ts
    import type { ApiType } from '@api';
    import { hc } from 'hono/client';
    export const apiClient = hc<ApiType>('/api', { init: { credentials: 'include' } });
    ```
- **Authentication Client (UI)**: For user authentication operations (signup, login, logout, session management), use only the `better-auth` client instance exported from `@client.ts` (e.g., `src/auth/client.ts`).
  - **Callout:** Do NOT duplicate or re-instantiate the auth client in the UI. Import and use the single exported instance.
- **UI Components**: Use shadcn components for all UI elements.
- **Styling**: Use Tailwind CSS v4 directly in components rather than separate CSS files.
- **Component Installation**: Always use `bun x shadcn@latest add [component-name]` to add new shadcn components.
- **Notifications**: Use `sonner` for displaying toasts and notifications.

## 6. UI and API Communication

- **React File Placement:**
  - **All React `.tsx` files must live inside the `web` folder** (preferably under `web/src` or its subfolders). Do NOT place React files in backend or shared folders.
  - **Example:**
    - ✅ `web/src/components/user-profile/user-profile.tsx`
    - ❌ `src/lib/query-provider.tsx` (move to `web/src/components` or similar)
- **Component Naming:**
  - All UI component files and folders must use kebab-case.
  - Place all UI components under `web/src/components` (or a subfolder).
- **API Communication:**
  - Use the Hono client (`web/src/lib/api.ts`) for communicating with general API server endpoints (defined in `src/services/api/index.ts`).
  - Do NOT use fetch or axios directly for these API endpoints.
- **Authentication:**
  - For authentication, use only the exported `authClient` from `src/auth/client.ts` (imported as `@client.ts` in the UI).
- **API Typing:**
  - Export the API type from the server (e.g., `export type ApiType = typeof api;`) and import it in the client for full type safety and autocompletion.
- **Grouping:**
  - All non-auth API endpoints must be grouped under `/api` using `.basePath('/api')` and chained `.route()` calls for sub-routers on the server. This ensures type inference works correctly for the Hono client.
- **Error Handling:**
  - Implement proper error handling for all API requests.
- **Type Safety:**
  - Ensure type safety between client and server by sharing interface definitions and using the exported API type.

## 7. Testing

- Write tests alongside your code in the appropriate folder.
- Run tests with:
  ```bash
  bun x test
  ```
- Ensure 100% test coverage for new features.

## 8. Common Mistakes to Avoid

- ❌ Placing React `.tsx` files outside the `web` folder (e.g., in `src/lib/`).
- ❌ Using camelCase or PascalCase for files or folders in the UI—always use kebab-case.
- ❌ Creating multiple Hono or auth client instances in the UI—use the single exported instance only.
- ❌ Using fetch or axios directly for API calls in the UI—always use the typed Hono client.
- ❌ Accessing environment variables directly—always use the validated env util.
- ❌ Placing UI components outside `web/src/components`.

## 9. Pull Request Checklist

- [ ] Code follows naming conventions (kebab-case for files/dirs in UI, snake_case for vars, etc.).
- [ ] All React `.tsx` files are inside the `web` folder (preferably under `web/src`).
- [ ] All UI components are in `web/src/components` (or subfolders) and use kebab-case.
- [ ] Only the single exported Hono client (`web/src/lib/api.ts`) is used for API calls in the UI.
- [ ] Only the single exported auth client (`src/auth/client.ts`) is used for authentication in the UI.
- [ ] No direct use of fetch/axios for API endpoints in the UI.
- [ ] All environment variable access goes through the validated env util.
- [ ] All tests pass.
- [ ] Documentation updated (if needed).
- [ ] No lint/format errors (`bun x lint`, `bun x format`).
- [ ] API endpoints are grouped and typed as described above.
- [ ] Hono client (`apiClient`) is used for general API communication in the UI.
- [ ] Better Auth client (`authClient`) is used for authentication operations in the UI.

## 10. Reporting Issues

- Check existing issues before opening a new one.
- Provide a clear title, detailed description, and steps to reproduce.

---

**References:**
- [Better Auth Docs](https://www.better-auth.com/docs/reference/contributing)
- [Hono Best Practices](https://hono.dev/docs/guides/best-practices)

Thank you for helping improve Anya AI Platform! 🚀
