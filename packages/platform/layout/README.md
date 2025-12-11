# ZWP — Platform Layout

Shared layout primitives, panels, menus, windows and related state used across ZWP applications.
This package provides layout modules, facades, directives and services to compose complex
application layouts (menus, panels, popups, windows, tables and snackbars).

Package: `@zwp/platform.layout`

## Purpose
- Centralise UI layout pieces (panel layout, menu layout, popups, windows and main-panel tabs) so
	applications have a consistent and testable layout surface.
- Provide NgRx state and facades for layout concerns and optional persistence for layouts that need it.
- Offer a `forRoot(...)` initialiser to enable or disable specific layout features at app bootstrap.

## Typical AppModule setup

Initialise the layout module in your root `AppModule` using `ZWPLayoutModule.forRoot(...)` to
control which layout features are included and which layouts should persist state.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ZWPLayoutModule } from '@zwp/platform.layout';

@NgModule({
	imports: [
		BrowserModule,
		ZWPLayoutModule.forRoot({
			includeMenuLayout: true,
			includePanelLayout: true,
			includePopupLayout: true,
			includeWindowLayout: true,
			persistPanelLayout: true,
			persistWindowLayout: false,
			includeSnackbarLayout: true,
			includeMainPanelTabs: true,
			includeTableLayout: true,
		})
	]
})
export class AppModule {}
```

The `forRoot` call registers state providers, optional persistence features and any services
required by the selected layout features. Feature modules should not call `forRoot` again —
import non-root module variants where available.

## Key features
- Module entrypoints: `zwp.layout.module.ts` and `zwp.panel-layout.module.ts`.
- State and facades: `src/lib/state/` — includes actions, effects, facades, reducers and selectors
	for panels, windows, snackbars, table layout and utility/popup layout.
- Components: reusable panels, menus, tables and window components under `src/lib/components/`.
- Directives and decorators: layout decorators and resize/sticky/resizable directives in
	`src/lib/decorators/` and `src/lib/directives/`.
- Services: overlay, popup and snackbar services under `src/lib/services/`.

## Where to look in the codebase
- Module: `src/lib/modules/zwp.layout.module.ts` and `src/lib/modules/zwp.panel-layout.module.ts`
- Layout state: `src/lib/state/` (main-panel, panel-layout, window-layout, utility-layout, table-layout)
- Components: `src/lib/components/` (panels, windows, menus, tables)
- Directives/decorators: `src/lib/directives/` and `src/lib/decorators/`
- Services: `src/lib/services/` (snackbar, popup, window overlay, menu overlay)
- Models and config: `src/lib/model/` (panel configs, menu definitions, window models)

## Building

From the monorepo root run:

```bash
nx build platform.layout
```

## Running unit tests

Run the package tests with:

```bash
nx test platform.layout
```

Use `--watch` for iterative development:

```bash
nx test platform.layout --watch
```

## Configuration options (forRoot)

The `forRoot` configuration lets you include or exclude layout features and enable persistence.
Typical options include:

- `includeMenuLayout: boolean` — include the menu layout and related services.
- `includePanelLayout: boolean` — enable panel layout features and state.
- `includePopupLayout: boolean` — include popups and popup overlay services.
- `includeWindowLayout: boolean` — enable window layout and window overlay services.
- `persistPanelLayout: boolean` — enable persistence for panel layout state.
- `persistWindowLayout: boolean` — enable persistence for window layout state.
- `includeSnackbarLayout: boolean` — provide snackbar services and state.
- `includeMainPanelTabs: boolean` — enable main-panel tab support.
- `includeTableLayout: boolean` — include table layout helpers and state.

Refer to the module source for the canonical config type and token names in
`src/lib/modules/zwp.layout.module.ts`.

## Testing guidance
- Unit-test facades and reducers in isolation by importing the state providers or using the
	package's test setup helpers.
- For component tests that use overlays or popups, prefer shallow tests and mock overlay services.

## Troubleshooting
- If layout components or facades are missing, ensure `ZWPLayoutModule.forRoot(...)` is called in
	the application's root module and that `nx build platform.layout` completed successfully.
- If persistence isn't happening, verify that the persistence flags passed to `forRoot` are set
	correctly and that your app's storage service is available.

## Contributing
- Add unit tests for reducers, facades and services when making changes.
- Keep layout components small and composable; document any changes to the `forRoot` config.

## License
Follow the repository license at the project root.
