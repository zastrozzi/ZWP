# ZWP — Platform Dynamic Query

Library providing typed query models, API routes, NgRx state and service adapters to build
dynamic query UI and APIs. The package includes service implementations (`live`, `mock`),
facades, route helpers and reusable components for building query builders and filter UIs.

Package: `@zwp/platform.dynamic-query`

## Purpose
- Provide a shared implementation of dynamic query primitives (filters, queryable schema,
	structured queries) so applications can build consistent UI and server integrations.
- Offer NgRx state scaffolding and facades for working with query state in a predictable way.
- Supply `live`/`mock` service implementations and route helpers to simplify development and testing.

## Typical usage (preferred `forRoot` configuration)

Configure the module at application startup using `PlatformDynamicQueryModule.forRoot(...)`.
Import `ModuleAPIState` from `@zwp/platform.common` when specifying the `apiState`.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PlatformDynamicQueryModule } from '@zwp/platform.dynamic-query';
import { ModuleAPIState } from '@zwp/platform.common';

@NgModule({
	imports: [
		BrowserModule,
		PlatformDynamicQueryModule.forRoot({
			remoteBaseUrl: 'https://example.com/dynamic-query/1.0',
			localBaseUrl: 'https://localhost:8080/dynamic-query/1.0',
			apiState: ModuleAPIState.LIVE,
		})
	]
})
export class AppModule {}
```

The `forRoot` call registers `DYNAMIC_QUERY_API_CONFIG`, computes `DYNAMIC_QUERY_API_BASE_URL`
based on the global API location, and wires the appropriate State providers and service
implementations.

## What this package exports (high level)
- Module: `platform.dynamic-query.module.ts` with a `forRoot` entrypoint.
- API config tokens: `DYNAMIC_QUERY_API_CONFIG` and `DYNAMIC_QUERY_API_BASE_URL`.
- State: NgRx pieces under `src/lib/state/` (actions, effects, facades, selectors, reducers).
- Services: abstract/live/mock implementations under `src/lib/services/`.
- API routes and components: `src/lib/api-routes/` and `src/lib/components/`.
- Models and types: `src/lib/model/` (filters, requests, responses, schema types).

## Building

From the monorepo root run:

```bash
nx build platform.dynamic-query
```

## Running unit tests

Run the package tests with:

```bash
nx test platform.dynamic-query
```

Use `--watch` for iterative development:

```bash
nx test platform.dynamic-query --watch
```

## Configuration

The `forRoot` configuration object shape is defined by `DynamicQueryAPIConfig` (see
`src/lib/config/dynamic-query.api-config.ts`). It typically contains:

- `remoteBaseUrl: string` — remote/production API base URL.
- `localBaseUrl: string` — local/dev API base URL.
- `apiState: ModuleAPIState` — whether to use `LIVE`, `LOCAL` or `MOCK` implementations.

No environment variables are required by the library itself; the host application should supply
runtime values via the `forRoot` call or DI providers.

## Where to look in the codebase
- Public exports: `src/index.ts`
- Module: `src/lib/platform.dynamic-query.module.ts`
- State: `src/lib/state/` (actions, effects, facades, reducers, selectors)
- API routes: `src/lib/api-routes/`
- Services: `src/lib/services/` (`abstract`, `live`, `mock`)
- Models and types: `src/lib/model/`
- Components and routes: `src/lib/components/` and `src/lib/routes/`

## Testing guidance
- Use the package `mock` services to isolate UI tests and avoid external API dependencies.
- Test facades for behaviour rather than testing store internals in components.

## Troubleshooting
- If imports fail, ensure `nx build platform.dynamic-query` completed and the consuming project has
	the correct path mapping or package dependency.
- If API calls hit the wrong endpoint, verify the computed `DYNAMIC_QUERY_API_BASE_URL` and your
	`forRoot` configuration.

## Contributing
- Add unit tests for new public behaviour and document changes to config shapes or route helpers.
- Keep changes backwards-compatible where possible and update README when adding new `forRoot`
	options.

## License
Follow the repository license at the project root.
