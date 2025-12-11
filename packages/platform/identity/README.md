# ZWP — Platform Identity

Shared identity features for ZWP applications: admin-user and enduser models, accessors,
NgRx state, API routes and service implementations. The package provides a configurable module
that apps should initialise using `forRoot(...)` to register API endpoints and select
`live`/`mock` implementations.

Package: `@zwp/platform.identity`

## Purpose
- Centralise identity-related domain models (admin users, endusers, sessions, credentials).
- Provide NgRx state, facades and service implementations for identity workflows.
- Offer a `forRoot` entry point so host applications can configure API base URLs and pick a
	service mode (LIVE, LOCAL, MOCK).

## Typical usage (preferred `forRoot` configuration)

Configure the module at application startup using `PlatformIdentityModule.forRoot(...)`. Import
`ModuleAPIState` from `@zwp/platform.common` when specifying the `apiState`.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PlatformIdentityModule } from '@zwp/platform.identity';
import { ModuleAPIState } from '@zwp/platform.common';

@NgModule({
	imports: [
		BrowserModule,
		PlatformIdentityModule.forRoot({
			remoteBaseUrl: 'https://example.com/identity/1.0',
			localBaseUrl: 'https://localhost:8080/identity/1.0',
			apiState: ModuleAPIState.LIVE,
		})
	]
})
export class AppModule {}
```

The `forRoot` call registers the `IDENTITY_API_CONFIG` token and computes `IDENTITY_API_BASE_URL`
based on the global API location. It also installs state providers and the appropriate service
implementations for the selected `apiState`.

## What this package exports (high level)
- Module: `platform.identity.module.ts` with a `forRoot` initialiser.
- Accessors: admin-user and enduser access-token accessors in `src/lib/accessors/`.
- State: NgRx pieces under `src/lib/state/` (actions, effects, facades, reducers, selectors).
- Services: abstract/live/mock implementations under `src/lib/services/`.
- API routes and models: `src/lib/api-routes/` and `src/lib/model/` (requests/responses/enums).

## Building

From the monorepo root run:

```bash
nx build platform.identity
```

## Running unit tests

Run the package tests with:

```bash
nx test platform.identity
```

Use `--watch` for iterative development:

```bash
nx test platform.identity --watch
```

## Configuration

The `forRoot` configuration object shape is defined by `IdentityAPIConfig` (see
`src/lib/config/identity.api-config.ts`). It typically contains:

- `remoteBaseUrl: string` — production/remote API endpoint for identity services.
- `localBaseUrl: string` — local/dev API endpoint for testing and development.
- `apiState: ModuleAPIState` — whether to use `LIVE`, `LOCAL` or `MOCK` implementations.

No environment variables are required by the library itself; the host application should supply
runtime values via the `forRoot` call or DI providers.

## Where to look in the codebase
- Module: `src/lib/platform.identity.module.ts`
- Accessors: `src/lib/accessors/` (admin-user & enduser access-token accessors)
- State: `src/lib/state/` (facades, effects, reducers, selectors)
- Services: `src/lib/services/` (`abstract`, `live`, `mock`)
- API routes: `src/lib/api-routes/`
- Models and types: `src/lib/model/`

## Testing guidance
- Use `mock` services provided by the package when writing UI tests to avoid external
	dependencies.
- Unit-test facades and accessors directly and prefer focused tests for reducers and effects.

## Troubleshooting
- If tokens or providers are missing, ensure `nx build platform.identity` completed and the
	consuming app calls `PlatformIdentityModule.forRoot(...)` in its root module.
- If API requests fail, verify the computed `IDENTITY_API_BASE_URL` and that the backend matches
	the expected routes in `api-routes/`.

## Contributing
- Add unit tests for any changed public APIs and document changes to config shapes.
- Coordinate breaking changes with consumers and increment package versions accordingly.

## License
Follow the repository license at the project root.
