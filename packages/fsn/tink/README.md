# ZWP — FSN Tink Library

Client library for integrating Tink services into ZWP applications. The package provides API
route definitions, models, NgRx state (actions, reducers, selectors, effects), facades, and
service implementations (abstract / live / mock) for account, transaction, merchant, provider and
user workflows.

Package: `@zwp/fsn.tink`

## Purpose
- Reusable integration layer for Tink within the FSN domain.
- Provides typed request/response models and API route helpers.
- Offers `live`, `local` and `mock` service implementations and state scaffolding for robust
	development and testing.

## Typical usage (preferred `forRoot` configuration)

Configure the module at application startup using `FSNTinkModule.forRoot(...)`. Import
`ModuleAPIState` from `@zwp/platform.common` when specifying the `apiState`.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FSNTinkModule } from '@zwp/fsn.tink';
import { ModuleAPIState } from '@zwp/platform.common';

@NgModule({
	imports: [
		BrowserModule,
		FSNTinkModule.forRoot({
			remoteBaseUrl: 'https://example.com/tink/1.0',
			localBaseUrl: 'https://localhost:8080/tink/1.0',
			apiState: ModuleAPIState.LIVE,
		})
	]
})
export class AppModule {}
```

The `forRoot` call registers the package config token (see `src/lib/config/tink.api-config.ts`) and
selects appropriate service providers for the chosen `apiState`.

## What this package exports (high level)
- Angular module: `fsn.tink.module.ts` with a `forRoot` entrypoint.
- Config tokens and types: see `src/lib/config/tink.api-config.ts`.
- Services: abstract/live/mock implementations under `src/lib/services/`.
- State: NgRx pieces under `src/lib/state/` with facades for UI consumption.
- API routes, components and models: available under `src/lib/api-routes/`, `src/lib/components/` and
	`src/lib/model/` respectively.

## Building

From the monorepo root run:

```bash
nx build fsn.tink
```

## Running unit tests

Run the package tests with:

```bash
nx test fsn.tink
```

Use `--watch` for iterative development:

```bash
nx test fsn.tink --watch
```

## Configuration

Prefer `FSNTinkModule.forRoot(...)` for configuration. The canonical config type is defined in
`src/lib/config/tink.api-config.ts` and typically includes:

- `remoteBaseUrl: string` — production/remote API endpoint
- `localBaseUrl: string` — local/dev API endpoint
- `apiState: ModuleAPIState` — controls whether `LIVE`, `LOCAL` or `MOCK` implementations are wired up

No environment variables are required by the library itself; the host application should supply
runtime values via the `forRoot` call or by DI providers.

## Where to look in the codebase
- Module: `src/lib/fsn.tink.module.ts`
- Config: `src/lib/config/tink.api-config.ts`
- Services: `src/lib/services/` (`abstract`, `live`, `mock`)
- State: `src/lib/state/`
- API routes: `src/lib/api-routes/`
- Components and routes: `src/lib/components/` and `src/lib/routes/`
- Models and types: `src/lib/model/`

## Testing guidance
- Use mock services to isolate UI tests and avoid external API dependencies.
- Add unit tests for facades, reducers and any public service APIs when making changes.

## Troubleshooting
- If consumers cannot import tokens or types, ensure `nx build fsn.tink` completed successfully and
	the consuming project has the correct path mapping or dependency.
- If API calls target the wrong endpoint, verify the selected base URL and that `GlobalAPILocation`
	selection matches expectations in your app.

## Contributing
- Add unit tests and documentation for any changes to public APIs or config shapes.
- Coordinate breaking changes with consumers and bump package versions appropriately.

## License
Follow the repository license at the project root.
