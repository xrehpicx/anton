# Service Template for Adding a New Service

This guide defines the canonical steps and conventions for creating and contributing a new service to the Anya AI Platform.

## 1. Directory & Naming

- All services live under `src/services/`.
- Each service must have its own folder named in **kebab-case** or **snake_case** (no camelCase).
- Inside the service folder, create a single entrypoint file named `index.ts`.

Example structure:

```
src/
└── services/
    └── my_service/     <-- folder must be kebab-case or snake_case
        └── index.ts    <-- required entrypoint
```

## 2. File Template (`index.ts`)

Copy and paste this skeleton into your new `index.ts`, then replace placeholders:

```typescript
// External dependencies (if any)
import OpenAI from 'openai';

// Types (use snake_case)
export type request_message = OpenAI.ChatCompletionMessageParam;
export type response_message = OpenAI.ChatCompletionMessage;

// Core function(s) with Go-style error handling
export async function perform_task(
  input: request_message[],
  config_key?: string,
): Promise<[response_message | null, Error | null]> {
  try {
    // ... implementation ...
    return [, /* result */ null];
  } catch (err: unknown) {
    return [null, err instanceof Error ? err : new Error(String(err))];
  }
}

// Any additional functional exports
// export async function other_function(...): Promise<[..., Error | null]> { /* ... */ }

// Initialize or start the service
export async function init(): Promise<[boolean, Error | null]> {
  // Optional setup logic
  return [true, null];
}
```

### Conventions

- **Functional-only:** no classes or side-effectful singletons.
- **Go-style error tuple:** every function returns `[result, error]`.
- **Naming:** use **snake_case** (for functions, types, variables) and **kebab-case** for files/folders.

## 3. Contribution Workflow

1. Fork or branch from `main`.
2. Create new service folder under `src/services/`.
3. Copy the `index.ts` template and implement your logic.
4. Add any third-party dependencies to `package.json`.
5. Write tests for your service (if applicable).
6. Update `requirements.md` to mark your service and calls as completed:
   - `[x] Create services/<your-service>`
   - `[x] Export init and other functions`
7. Open a pull request and tag relevant reviewers.

---

🔔 **Reminder:** Always keep this file updated with best practices and major structural changes.
