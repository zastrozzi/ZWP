# ZWP — Platform Common

Core UI primitives, services, directives and NgRx wiring shared across ZWP applications.
This package provides a set of modular features (UI components, utils, directives and state
helpers) intended to be configured by the host application via `forRoot` initialisers.

Package: `@zwp/platform.common`

## Purpose
- Centralise common building blocks (buttons, inputs, dialogs, icons, layout helpers).
- Provide shared services (logging, storage), environment wiring and application-wide state
	modules (NGRX helpers) that apps can switch on or off.
- Reduce duplication across apps by exposing well-scoped modules that embed sensible defaults.

## Important modules
- `ZWPCommonModule.forRoot(config)`: core module to register environment, root services, and
	platform-wide configuration.
- `ZWPNgrxModule.forRoot(config)`: NGRX helper module to enable/disable specific persistence and
	state slices, devtools, router state and other store features.

## Typical AppModule setup

Configure both modules from your root `AppModule` to wire up common services and state:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ZWPCommonModule, ZWPNgrxModule } from '@zwp/platform.common';
import { ZWPConsoleLoggingService, ZWPLocalStorageService } from '@zwp/platform.common';
import { environment } from '../environments/environment';

@NgModule({
	imports: [
		BrowserModule,
		ZWPCommonModule.forRoot({
			environment,
			enableRootServices: true,
			fontFamilyFallback: `system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
			loggingService: ZWPConsoleLoggingService,
			storageService: ZWPLocalStorageService,
		}),
		ZWPNgrxModule.forRoot({
			enablePersistence: true,
			enableApplicationState: true,
			enableHistoryState: true,
			enableKeyboardState: false,
			enablePersistenceProfileState: true,
			enableRouterState: true,
			enableThemingState: true,
			enableDevtools: true,
			devtoolsMaxAge: 100,
			actionsBlocklist: [
				// Add action types that should not be persisted or should be ignored by middleware
			],
		}),
	],
})
export class AppModule {}
```

The `ZWPCommonModule.forRoot(...)` call registers environment information and optional root
services (logging, storage) while `ZWPNgrxModule.forRoot(...)` toggles and configures store
features such as persistence, router state and devtools.

## Public surface (high level)
- UI components and directives: `src/lib/components/`, `src/lib/directives/` (buttons, inputs,
	dialogs, scroll directives, styling directives).
- Models and config types: `src/lib/model/` (breakpoints, theming, environment, persistence models).
- Services: `src/lib/services/` (logging, storage, utilities).
- NGRX helpers: `src/lib/state/` (identifiers, actions, effects, facades, reducers, selectors).
- Module wiring: `src/lib/modules/` and `src/index.ts` for public exports.

## Building

From the monorepo root run:

```bash
nx build platform.common
```

## Running unit tests

Run the package tests with:

```bash
nx test platform.common
```

Use `--watch` for iterative development:

```bash
nx test platform.common --watch
```

## Configuration details

`ZWPCommonModule.forRoot(config)` accepts an object that typically contains:

- `environment`: the host app environment object (production flags, API URLs, etc.).
- `enableRootServices: boolean` — whether to register core root services.
- `fontFamilyFallback: string` — a fallback font stack used by shared components.
- `loggingService` — a class reference for the logging service to register via DI.
- `storageService` — a class reference for a storage service (e.g., localStorage wrapper).

`ZWPNgrxModule.forRoot(config)` accepts an object that typically contains booleans and options
to enable or disable store features. Example fields include:

- `enablePersistence` — enable store persistence features.
- `enableApplicationState` — include the application slice in the store.
- `enableHistoryState` — enable history-related state and persistence.
- `enableKeyboardState` — whether keyboard state handling is enabled.
- `enablePersistenceProfileState` — enable profile persistence behaviour.
- `enableRouterState` — sync Router state with the store.
- `enableThemingState` — include theming state in the store.
- `enableDevtools` — enable Redux devtools integration and configuration.
- `devtoolsMaxAge` — max age for devtools history.
- `actionsBlocklist` — array of action type strings to exclude from persistence or middleware.

Refer to `src/lib/modules/` and `src/lib/state/` for the canonical config shapes and tokens.

## Testing and migration notes

- Prefer to use the module `forRoot` initialisers in the root app only; feature modules should
	import non-root module variants when available.
- When changing persistence or state flags, add migration tests and document how to migrate
	persisted shape changes.

## Troubleshooting

- If providers or tokens are missing, ensure `ZWPCommonModule.forRoot(...)` is included in the
	application's root `AppModule` and that `nx build platform.common` completed successfully.
- If store features are not enabled, verify the `ZWPNgrxModule.forRoot(...)` options in the app
	bootstrap and that the store is correctly imported in the root module.

## Contributing

- Add unit tests for modules, directives and services you change.
- Document configuration changes and update `README.md` when adding new `forRoot` options.

## License

Follow the repository license at the project root.
