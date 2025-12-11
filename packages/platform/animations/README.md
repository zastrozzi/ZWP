# ZWP — Platform Animations

Reusable animation utilities, directives and components used across ZWP applications. This
library exposes a small Angular module that wires up animation triggers, directives and a
convenience service for programmatic control.

Package: `@zwp/platform.animations`

## Purpose
- Provide a set of common entrance/exit animations, micro-interactions and utilities (shake,
	pulse, fade, zoom, etc.) that can be reused in UI components.
- Offer structural directives and a `ZWPAnimationService` to make animations declarative and
	testable across the monorepo.

## Key features
- A central module: `ZWPAnimationsModule` that initialises runtime behaviour.
- A set of pre-built animation triggers (entrances, exits, attention animations).
- Directives: `animation.container.directive.ts`, `animation.item.directive.ts` for templated
	animation composition.
- A small `ZWPAnimationService` for programmatic control and helpers.
- Config and model types under `src/lib/model/` for animation options and trigger modes.

## Typical usage

Initialise the module in your application's root module. The library exposes an `init` entrypoint
to select the trigger mode (for example, using the browser `IntersectionObserver`):

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ZWPAnimationsModule } from '@zwp/platform.animations';

@NgModule({
	imports: [
		BrowserModule,
		ZWPAnimationsModule.init('intersectionObserver')
	]
})
export class AppModule {}
```

The `init` parameter accepts a trigger mode string (see `src/lib/model/zwp.animation.trigger-mode.ts`)
— `intersectionObserver` is recommended for efficient, scroll-aware animations.

## API surface (high level)
- Module: `zwp.animations.module.ts` with an `init(...)` entrypoint.
- Components: `animation.component.ts` — base component supporting animation slots.
- Directives: container/item directives to apply animations in templates.
- Services: `zwp.animation.service.ts` — helper methods and trigger mode factory.
- Models: `zwp.animation.options.ts`, `zwp.animation.speed.ts`, and trigger mode types.

## Building

From the monorepo root run:

```bash
nx build platform.animations
```

## Running unit tests

Run the package tests with:

```bash
nx test platform.animations
```

Use `--watch` for iterative development:

```bash
nx test platform.animations --watch
```

## Configuration

The module initialisation (`ZWPAnimationsModule.init(...)`) is the preferred configuration point.
No environment variables are required by the library itself. Control runtime trigger behaviour by
selecting the appropriate trigger mode string when calling `init`.

## Where to look in the codebase
- Module: `src/lib/zwp.animations.module.ts`
- Animation primitives: `src/lib/animations/` (entrances, exits, attention animations)
- Components and directives: `src/lib/components/` and `src/lib/directives/`
- Models and config: `src/lib/model/`
- Service: `src/lib/services/zwp.animation.service.ts`

## Testing guidance
- Unit-test directives and components by providing a deterministic trigger mode (e.g., a test
	double) instead of `intersectionObserver` where appropriate.
- For visual regression, prefer screenshot or storybook-based tests outside of unit tests.

## Troubleshooting
- If animations do not trigger, verify that the selected trigger mode is supported in the
	running environment (some trigger modes require browser APIs like `IntersectionObserver`).
- Ensure that directive selectors are applied to the intended DOM elements and that change
	detection runs when expected.

## Contributing
- Add unit tests for new directives, services or animation primitives.
- Keep animation primitives small and composable so they can be reused across components.

## License
Follow the repository license at the project root.
