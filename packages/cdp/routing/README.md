# ZWP — CDP Routing Library

Shared routing utilities and UI containers used by CDP applications. This package centralises
application-level routes, route guards, interceptors and a small set of reusable components
that are commonly used by CDP frontends.

Package: `@zwp/cdp.routing`

## Purpose
- Provide a consistent set of application routes and route helper utilities for CDP applications.
- Expose reusable container/components such as authenticated containers and utility-dock panels.
- Provide guards and interceptors commonly required across CDP apps (e.g. admin guard, logging).

## Key features
- Angular module: `cdp-routing.module.ts` — import this to add CDP routes and components.
- Components: `authed.container.component.ts`, `home.component.ts`, `utility-dock.component.ts`,
	and utility panels (clipboard, notifications).
- Guards: `admin-user-auth.guard.ts` — guard routes that require admin privileges.
- Interceptors: `logging.interceptor.ts` — request/response logging utilities.
- Routes: shared route definitions in `src/lib/routes/` and `src/lib/routes/cdp.routes.ts`.

## Typical usage

Import the `CDPRoutingModule` (or the specific route definitions) in your application's root
module to reuse the shared routes and components.

Example:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CDPRoutingModule } from '@zwp/cdp.routing';

@NgModule({
	imports: [
        BrowserModule, 
        CDPRoutingModule.forRoot(false) // boolean value determines whether logging is enabled
    ]
})
export class AppModule {}
```

If you prefer to compose routes directly, route definitions are exported from `src/lib/routes` and
can be merged into your app's Router configuration.

## Where to look in the codebase
- Module: `src/lib/cdp-routing.module.ts`
- Components: `src/lib/components/` (authed container, utility dock, home, panels)
- Guards: `src/lib/guards/`
- Interceptors: `src/lib/interceptors/`
- Routes: `src/lib/routes/` and `src/lib/routes/cdp.routes.ts`

## Building

From the monorepo root run:

```bash
nx build cdp.routing
```

## Running unit tests

Run the package tests with:

```bash
nx test cdp.routing
```

Use `--watch` for iterative development:

```bash
nx test cdp.routing --watch
```

## Configuration and integration notes

- The library is UI- and route-focused and does not require runtime environment variables by itself.
- Interceptors and guards are provided with sensible defaults — apps can override them by providing
	their own implementations in the app module providers.
- To extend or modify routing, import the route definitions and merge or override them in your
	application's `RouterModule.forRoot(...)` or `forChild(...)` configuration.

## Testing guidance
- Component-level tests should import the specific component and any small dependencies from this
	package; prefer shallow tests that mock services provided by the host app.
- Guards and interceptors have unit-testable public APIs — add focused unit tests in the package
	when changing guard logic or interceptor behavior.

## Troubleshooting
- If components or routes are not available, ensure `nx build cdp.routing` completed and the consuming
	app has the correct path mappings or dependency installed.
- If a guard is blocking navigation unexpectedly, add logging to the guard or run the guard's unit
	tests to reproduce the behaviour locally.

## Contributing
- Add unit tests for new or changed route definitions, guards and interceptors.
- Keep component APIs minimal and prefer facades/services for complex interactions.

## License
Follow the monorepo license located at the repository root.
