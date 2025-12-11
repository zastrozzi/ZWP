# ZWP — CDP Users Library

Shared user and admin-user domain, state and services for CDP applications. This package
centralises models, API routes, NgRx state (actions, reducers, selectors, effects), facades,
and service implementations for both admin users and endusers.

Package: `@zwp/cdp.users`

## Purpose
- Provide reusable user-related domain models, request/response types and enums.
- Expose NgRx state scaffolding and facades for admin-user and enduser features.
- Provide service implementations (`abstract`, `live`, `mock`) and API route helpers for the
	users domain.

## Key features
- Angular module: `cdp-users.module.ts` — central module exposing public exports.
- State: full NgRx setup under `src/lib/state/` (separate areas for `admin-user` and `enduser`).
- Accessors: token/accessor utilities for auth tokens and other user-specific runtime values.
- API routes: shared route definitions in `src/lib/api-routes/`.
- Services: `abstract`, `live` and `mock` implementations under `src/lib/services/`.

## Typical usage (preferred `forRoot` configuration)

Configure the module in your root module using `CDPUsersModule.forRoot(...)`. Import `ModuleAPIState`
from `@zwp/platform.common` when specifying the `apiState`.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CDPUsersModule } from '@zwp/cdp.users';
import { ModuleAPIState } from '@zwp/platform.common';

@NgModule({
	imports: [
		BrowserModule,
		CDPUsersModule.forRoot({
			remoteBaseUrl: 'https://example.com/users/1.0',
			localBaseUrl: 'https://localhost:8080/users/1.0',
			apiState: ModuleAPIState.LIVE,
		})
	]
})
export class AppModule {}
```

Public exports (facades, services, models and types) are available from `@zwp/cdp.users` — see
`src/index.ts` for the definitive list.

## Where to look in the codebase
- Public exports: `src/index.ts`
- Module: `src/lib/cdp-users.module.ts`
- State: `src/lib/state/` (actions, effects, facades, reducers, selectors)
- Accessors: `src/lib/accessors/`
- API routes: `src/lib/api-routes/`
- Models and types: `src/lib/model/`
- Services: `src/lib/services/` (`abstract`, `live`, `mock`)
- Components and routes: `src/lib/components/` and `src/lib/routes/`

## Building

From the monorepo root run:

```bash
nx build cdp.users
```

## Running unit tests

Run the package tests with:

```bash
nx test cdp.users
```

Use `--watch` for iterative development:

```bash
nx test cdp.users --watch
```

## Configuration

Prefer `CDPUsersModule.forRoot(...)` for configuration. The expected shape (see
`src/lib/config/cdp-users.config.ts` for the canonical definition) is:

- `remoteBaseUrl: string` — remote/production API base URL for users.
- `localBaseUrl: string` — local/dev API base URL for testing.
- `apiState: ModuleAPIState` — controls whether `LIVE`, `LOCAL` or `MOCK` implementations are used.

No environment variables are required by the library itself; apps should supply runtime values via
environment files, DI providers, or a runtime configuration service.

## Testing guidance
- Use the package's `mock` services to isolate UI tests when needed.
- Prefer testing components against facades rather than the NgRx store directly.

## Troubleshooting
- If imports fail, ensure `nx build cdp.users` completed and the consuming project has the correct
	path mappings or dependency.
- If API calls fail, confirm the configured `remoteBaseUrl`/`localBaseUrl` and that the backend
	routes (see `api-routes/`) match the server implementation.

## Contributing
- Add unit tests for any new public behaviour (facades, services, reducers).
- When changing shared models or routes, coordinate with consuming packages and update docs.

## License
Follow the repository license at the project root.
