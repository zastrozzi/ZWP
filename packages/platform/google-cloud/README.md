# ZWP — Platform Google Cloud

Integration library providing Google Cloud Storage and file-upload primitives for ZWP apps.
This package includes typed models, API routes, NgRx state, facades and service implementations
(abstract / live / mock) to interact with storage buckets and storage objects.

Package: `@zwp/platform.google-cloud`

## Purpose
- Provide a reusable abstraction over Google Cloud Storage features used by ZWP applications.
- Expose facades, state and service implementations for file upload, bucket management and
	object operations.
- Offer `forRoot` configuration to set API endpoints and select `live` or `mock` service wiring.

## Typical usage (preferred `forRoot` configuration)

Configure the module in your application's root module using `PlatformGoogleCloudModule.forRoot(...)`.
Import `ModuleAPIState` from `@zwp/platform.common` when specifying the `apiState`.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PlatformGoogleCloudModule } from '@zwp/platform.google-cloud';
import { ModuleAPIState } from '@zwp/platform.common';

@NgModule({
	imports: [
		BrowserModule,
		PlatformGoogleCloudModule.forRoot({
			remoteBaseUrl: 'https://example.com/google-cloud/1.0',
			localBaseUrl: 'https://localhost:8080/google-cloud/1.0',
			apiState: ModuleAPIState.LIVE,
		})
	]
})
export class AppModule {}
```

The `forRoot` call registers the package configuration token (see `src/lib/config/google-cloud.api-config.ts`)
and computes a `GOOGLE_CLOUD_API_BASE_URL` provider based on the global API location. It also wires
service providers appropriate for the chosen `apiState`.

## What this package exports (high level)
- Angular module: `platform.google-cloud.module.ts` with a `forRoot` entrypoint.
- API config tokens: `GOOGLE_CLOUD_API_CONFIG` and `GOOGLE_CLOUD_API_BASE_URL`.
- Services: abstract/live/mock implementations under `src/lib/services/` (file upload, bucket,
	object APIs).
- State: NgRx pieces under `src/lib/state/` with facades for UI consumption.
- Components and routes: UI utilities for file upload and bucket/object management under
	`src/lib/components/` and `src/lib/routes/`.

## Building

From the monorepo root run:

```bash
nx build platform.google-cloud
```

## Running unit tests

Run the package tests with:

```bash
nx test platform.google-cloud
```

Use `--watch` for iterative development:

```bash
nx test platform.google-cloud --watch
```

## Configuration

The `forRoot` configuration object shape is defined by `GoogleCloudAPIConfig` (see
`src/lib/config/google-cloud.api-config.ts`). It typically contains:

- `remoteBaseUrl: string` — production/remote API endpoint for Google Cloud integrations.
- `localBaseUrl: string` — local/dev API endpoint for testing and local development.
- `apiState: ModuleAPIState` — whether to use `LIVE`, `LOCAL` or `MOCK` implementations.

No environment variables are required by the library itself; the host application should supply
runtime values via the `forRoot` call or DI providers.

## Where to look in the codebase
- Module: `src/lib/platform.google-cloud.module.ts`
- Config: `src/lib/config/google-cloud.api-config.ts`
- Services: `src/lib/services/` (`abstract`, `live`, `mock`)
- State: `src/lib/state/` (facades, effects, selectors, reducers)
- API routes and components: `src/lib/api-routes/` and `src/lib/components/`
- Models and types: `src/lib/model/`

## Testing guidance
- Use `mock` services to isolate UI tests and avoid external Google Cloud dependencies.
- Add unit tests for facades and reducers when changing state behaviour.

## Troubleshooting
- If tokens or providers are missing, ensure `nx build platform.google-cloud` completed and the
	app includes the `forRoot` call in its root module.
- If requests hit the wrong endpoint, verify the computed base URL and the `forRoot` configuration
	passed to the module.

## Contributing
- Add unit tests and documentation for public API changes.
- Keep public model changes backwards-compatible where possible and update README accordingly.

## License
Follow the repository license at the project root.
