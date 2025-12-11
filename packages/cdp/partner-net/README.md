# ZWP — CDP Partner Net Library

CDP Partner Net contains the partner management domain used by CDP apps: partner and subgroup
models, asset and location handling, API routes and a full set of NgRx state helpers (actions,
reducers, selectors, effects and facades). It also provides live and mock services, route
definitions and a central Angular module to consume these features.

Package: `@zwp/cdp.partner-net`

## Purpose
- Encapsulate partner-related domain logic and data flows so multiple applications and libraries
	can reuse a single implementation.
- Expose a set of facades to hide NgRx details and make components simple and testable.
- Provide API routing helpers and configurable service implementations (live vs mock) for local
	development and integration testing.

## Key features
- Domain models and enums for partners, subgroups, assets, locations and subscriptions.
- API route definitions used by server/client code in `api-routes/`.
- NgRx state for partner assets, partner types, subgroups, assignments and subscriptions.
- Facades to interact with partner state from components.
- Service implementations under `services/` with `abstract`, `live` and `mock` versions.

## Typical usage

Import the module and use facades or services from the package. Public exports are available from
`@zwp/cdp.partner-net` (see `src/index.ts`).

Example AppModule (preferred `forRoot` configuration):

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CDPPartnerNetModule } from '@zwp/cdp.partner-net';
import { ModuleAPIState } from '@zwp/platform.common';

@NgModule({
	imports: [
		BrowserModule,
		CDPPartnerNetModule.forRoot({
			remoteBaseUrl: 'https://example.com/partnernet/1.0',
			localBaseUrl: 'https://localhost:8080/partnernet/1.0',
			apiState: ModuleAPIState.LIVE,
		})
	]
})
export class AppModule {}
```

## Where to look in the codebase
- Public exports: `src/index.ts`
- Angular module: `src/lib/cdp.partner-net.module.ts`
- State: `src/lib/state/` (actions, reducers, selectors, effects, facades)
- API route definitions: `src/lib/api-routes/`
- Services: `src/lib/services/` (see `abstract/`, `live/`, `mock/`)
- Models and types: `src/lib/model/`
- UI components and routes: `src/lib/components/` and `src/lib/routes/`

## Building

From the repository root run:

```bash
nx build cdp.partner-net
```

## Running unit tests

Run the package tests with:

```bash
nx test cdp.partner-net
```

For iterative testing use:

```bash
nx test cdp.partner-net --watch
```

## Configuration

Prefer configuring the library via `CDPPartnerNetModule.forRoot(...)` as shown above. The `forRoot`
call accepts an object with the following shape (see `src/lib/config/cdp.partner-net.api-config.ts` for
the canonical definition):

- `remoteBaseUrl: string` — URL to the remote/production PartnerNet API.
- `localBaseUrl: string` — URL to a local/mock API used during development.
- `apiState: ModuleAPIState` — enum controlling whether the module uses `LIVE`, `LOCAL`, or `MOCK`
	implementations (e.g. `ModuleAPIState.LIVE`).

No environment variables are required by the library itself; supply runtime values from the host
application (environment files, DI providers, or runtime config services).

## Testing notes
- Services have `mock` implementations useful for unit and integration tests — prefer injecting the
	mock service when isolating UI tests.
- Facades are the recommended seam for tests: unit-test components against the facade's public
	observables and methods rather than the store directly.

## Troubleshooting
- If imports fail, ensure `nx build cdp.partner-net` finished successfully and the consumer's tsconfig
	path mappings or package dependency is configured.
- For API issues, verify the `CDP_PARTNER_NET_API_CONFIG` baseUrl is correct and that backend routes
	defined in `api-routes/` match the server implementation.

## Contributing
- Add unit tests for any new public behavior (facades, reducers, services).
- When changing shared models or API routes, coordinate versioning with other CDP packages and update
	consumers accordingly.

## License
Follow the monorepo license at the repository root.
