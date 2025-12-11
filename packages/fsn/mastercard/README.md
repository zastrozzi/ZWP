# ZWP — FSN Mastercard Library

Client library for interacting with the Mastercard-related portion of the Financial Services
Network (FSN). This package exposes HTTP service implementations, API route definitions,
NgRx state pieces and an Angular module that can be configured at application startup.

Package: `@zwp/fsn.mastercard`

## Purpose
- Provide a reusable, configurable FSN Mastercard integration for ZWP apps.
- Centralise API routes and model types for Mastercard merchants, requests and responses.
- Offer `live`, `local` and `mock` service implementations and state scaffolding to simplify
	development and testing.

## Typical usage (preferred `forRoot` configuration)

Configure the library in your application's root module using `FSNMastercardModule.forRoot(...)`.
Import `ModuleAPIState` from `@zwp/platform.common` when setting the `apiState`.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FSNMastercardModule } from '@zwp/fsn.mastercard';
import { ModuleAPIState } from '@zwp/platform.common';

@NgModule({
	imports: [
		BrowserModule,
		FSNMastercardModule.forRoot({
			remoteBaseUrl: 'https://example.com/mastercard/1.0',
			localBaseUrl: 'https://localhost:8080/mastercard/1.0',
			apiState: ModuleAPIState.LIVE,
		})
	]
})
export class AppModule {}
```

The `forRoot` call registers the `MASTERCARD_API_CONFIG` and a `MASTERCARD_API_BASE_URL` provider
and also installs service providers appropriate for the selected `apiState` (see `Services.environmentProviders`).

## What this package exports (high level)
- Angular module: `fsn.mastercard.module.ts` with a `forRoot` configuration entrypoint.
- API config tokens: `MASTERCARD_API_CONFIG` and `MASTERCARD_API_BASE_URL`.
- Services: abstract/live/mock implementations under `src/lib/services/`.
- State: NgRx pieces under `src/lib/state/` for local UI state and data caching.
- Routes, components and models: available under `src/lib/routes/`, `src/lib/components/` and `src/lib/model/`.

## Building

From the monorepo root run:

```bash
nx build fsn.mastercard
```

## Running unit tests

Run the package tests with:

```bash
nx test fsn.mastercard
```

For iterative testing use:

```bash
nx test fsn.mastercard --watch
```

## Configuration

The `forRoot` configuration object shape is defined by `MastercardAPIConfig` (see
`src/lib/config/mastercard.api-config.ts`). It typically contains:

- `remoteBaseUrl: string` — the production/remote API endpoint.
- `localBaseUrl: string` — the local or dev API endpoint.
- `apiState: ModuleAPIState` — controls whether `LIVE`, `LOCAL` or `MOCK` service implementations
	are used.

No environment variables are required by the library itself; runtime configuration should be
provided by the host application via the `forRoot` call or by DI providers.

## Where to look in the codebase
- Module: `src/lib/fsn.mastercard.module.ts`
- Config: `src/lib/config/mastercard.api-config.ts`
- Services: `src/lib/services/` (`abstract`, `live`, `mock`)
- State: `src/lib/state/`
- Routes and components: `src/lib/routes/` and `src/lib/components/`
- Models and types: `src/lib/model/`

## Testing guidance
- Use the package `mock` services when writing UI tests to avoid backend dependencies.
- Add unit tests for any new public-facing service, facade or state change.

## Troubleshooting
- If consumers cannot import tokens like `MASTERCARD_API_CONFIG`, ensure `nx build fsn.mastercard`
	completed successfully and the app has the correct path mapping or package dependency.
- If API calls are routed to the wrong endpoint, verify `MASTERCARD_API_BASE_URL` is being selected
	based on `GlobalAPILocation` and your provided `forRoot` config.

## Contributing
- Add unit tests and keep public API changes backwards compatible where possible.
- Document any changes to the `MastercardAPIConfig` shape so consuming apps can update accordingly.

## License
Follow the repository license at the project root.
