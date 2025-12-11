# @zwp/platform.analytics

Angular library providing Google Analytics helpers and integrations used across ZWP applications.

This package contains a lightweight wrapper around Google Analytics (gtag) with Angular-friendly
initialisers, directives, tokens and services to standardise event tracking across apps.

**Key features:**
- Reusable `@zwp/platform.analytics` module and a routing-aware initialiser.
- Directives for common tracking patterns (clicks, form inputs, custom events).
- Injection tokens for configuring `gtag`, the data layer and routing behaviour.
- A small service API for sending commands and building `gtag` payloads.

**Repository path:** `packages/platform/analytics`

**Install**
- The library is published as `@zwp/platform.analytics` and is consumed via the workspace package.
- From the monorepo root use: `nx build platform.analytics` to produce the library artifacts.

## Usage

Import the module you need into your Angular application or library module.

Example (application-level):

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ZWPGoogleAnalyticsModule, ZWPGoogleAnalyticsRouterModule } from '@zwp/platform.analytics/google';

@NgModule({
	imports: [
        BrowserModule, 
        ZWPGoogleAnalyticsModule.forRoot({ trackingCode: '', initDelay: 10000 }),
        ZWPGoogleAnalyticsRouterModule.forRoot()
    ]
})
export class AppModule {}
```

Routing-aware initialiser:
- The package includes a router initialiser that can automatically send page_view events when
	the Angular Router navigates. Enable it by importing `ZWPGoogleAnalyticsRouterModule` instead
	of `ZWPGoogleAnalyticsModule` (or by providing the router-specific initialiser token).

## API surface (high level)
- Modules: `zwp.google-analytics.module.ts`, `zwp.google-analytics.router.module.ts`
- Services: `ZWPGoogleAnalyticsService` — methods to `send` commands, build `gtag` payloads and
	interact with the data layer.
- Directives: `google-analytics.event.directive.ts`, `google-analytics.event-form-input.directive.ts`,
	`google-analytics.event-category.directive.ts` — attach event tracking directly in templates.
- Tokens: configuration tokens for `gtag`, data layer and routing settings (see `tokens/`).

Refer to `google/src/lib` for detailed types, tokens and examples.

## Building

From the monorepo root:

```bash
nx build platform.analytics
```

## Running unit tests

Run the package tests with:

```bash
nx test platform.analytics
```

## Configuration

No environment variables are required by the library itself; provide runtime settings from the
app's environment files or runtime-config service.

## Example: minimal setup

1. Provide the settings token in your AppModule (see Usage above).
2. Add `ZWPGoogleAnalyticsRouterModule` if you want automatic page_view events for router navigations.
3. Use the provided directives in templates to instrument clicks or form interactions.

## Troubleshooting
- If events do not appear in GA4, verify your `measurementId` and that `gtag` is loaded on the page.
- Ensure your browser privacy settings or ad-blockers are not blocking network requests to Google.

## Contributing
- See `CONTRIBUTING.md` in the root (if present) for monorepo contribution guidelines.
- Keep changes small and add unit tests for new behaviour in `google/src` where applicable.

## Where to look in the codebase
- Tokens and types: `google/src/lib/model/tokens` and `google/src/lib/model/types`
- Services and initialisers: `google/src/lib/services` and `google/src/lib/initialisers`
- Directives: `google/src/lib/directives`

## License
Follow the monorepo license in the repository root.
