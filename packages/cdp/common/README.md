# ZWP — CDP Common Library

Shared common utilities, state and models used by CDP-related apps and libraries in the ZWP monorepo.

This package provides a small collection of Angular module(s), NgRx state management pieces (actions,
reducers, selectors, effects and facades), and domain models used across the CDP family of packages.

**Package name:** `@zwp/cdp.common`

## Key responsibilities
- Provide shared domain models and enums for CDP components.
- Expose NgRx state scaffolding (actions, reducers, selectors, effects) for common UI features such as the
	utility dock.
- Provide facades that encapsulate store interactions to keep consumers thin and to centralise state logic.

## Typical usage

Import the common module(s) and use the exported facades or selectors in your feature modules or apps.

Example AppModule usage:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CDPCommonModule } from '@zwp/cdp.common';

@NgModule({
	imports: [
        BrowserModule, 
        CDPCommonModule.forRoot()
    ]
})
export class AppModule {}
```

Using a facade in a component:

```ts
import { Component } from '@angular/core';
import { CDPCommon } from '@zwp/cdp.common';

@Component({ selector: 'app-sample', template: `...` })
export class SampleComponent {
	constructor(private dock: CDPCommon.State.Facades.CDPCommonUtilityDockFacade) {}

	openPanel() {
		this.dock.openUtilityDockPanel(CDPCommon.Model.UtilityDockPanelType.clipboard);
	}
}
```

Note: Exact exported class and token names are available from `src/index.ts` — import them directly from
`@zwp/cdp.common`.

## API surface (high level)
- Modules: `cdp-common.module.ts` — central Angular module for shared CDP features.
- State: `state/` — contains `actions`, `reducers`, `effects`, `selectors` and `facades` for shared UI state.
- Models: `model/` — shared types, enums and domain model helpers (including `utility-dock` panel definitions).

Refer to `src/lib` for implementation details and `src/index.ts` for the public exports.

## Building

From the monorepo root run:

```bash
nx build cdp.common
```

## Running unit tests

Run the package tests with:

```bash
nx test cdp.common
```

## Testing notes
- Unit tests live under `src` and use the workspace Jest configuration. Use `nx test cdp.common --watch`
	for iterative testing.

## Configuration and environment

This library is a reusable code library and does not require runtime environment variables. Consumers
should provide any environment-specific configuration from the host app (for example, app-level DI
providers or environment files).

## Where to look in the codebase
- Public exports: `src/index.ts`
- Angular module: `src/lib/cdp-common.module.ts`
- State pieces: `src/lib/state/` (actions, reducers, selectors, effects, facades)
- Models and enums: `src/lib/model/`

## Contributing
- Keep changes isolated and add unit tests for new public behaviour.
- Follow the monorepo commit / review guidelines in the root `CONTRIBUTING.md` (if present).
- When adding new pieces of shared state, prefer facades to keep components decoupled from NgRx details.

## Troubleshooting
- If imports fail, ensure `nx build cdp.common` ran successfully and the consuming project has a path alias
	or dependency pointing to the built package.
- For unexpected state behaviour, prefer to add unit tests to the affected facade or reducer and run them
	locally using `nx test cdp.common`.

## License
Follow the repository license at the project root.
