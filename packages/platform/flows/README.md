# ZWP — Platform Flows

Shared flow and conversation orchestration primitives used across ZWP applications. This
package provides typed models, API routes, NgRx state (actions, reducers, effects and facades),
and service implementations for managing flow containers, nodes and prompts.

Package: `@zwp/platform.flows`

## Purpose
- Provide a reusable flow engine surface for building interactive, stateful flows and prompts.
- Offer `live` and `mock` service implementations to make integration and testing straightforward.
- Expose facades and NgRx state to keep UI components decoupled from store internals.

## Key features
- Module: `ZWPFlowsModule` with `live()` and `mock()` initialisers to select service wiring.
- State: full NgRx setup under `src/lib/state/` for flow containers, nodes and prompts.
- Services: `flow-container` and `flow-node` service implementations in `src/lib/services/`.
- Models: request/response types, filters and common flow model types under `src/lib/model/`.

## Typical usage

Import the module in your application's root module using either `live()` or `mock()` depending
on the environment.

Production / live services:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ZWPFlowsModule } from '@zwp/platform.flows';

@NgModule({
	imports: [BrowserModule, ZWPFlowsModule.live()]
})
export class AppModule {}
```

Local development / unit-test friendly (mock services):

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ZWPFlowsModule } from '@zwp/platform.flows';

@NgModule({
	imports: [BrowserModule, ZWPFlowsModule.mock()]
})
export class AppModule {}
```

Public exports (facades, services, models and types) are available from `@zwp/platform.flows` —
see `src/index.ts` for the definitive list.

## Where to look in the codebase
- Module: `src/lib/zwp.flows.module.ts`
- State: `src/lib/state/` (actions, effects, facades, reducers, selectors)
- Services: `src/lib/services/` (`flow-container`, `flow-node` with `live`/`mock` variants)
- Models and types: `src/lib/model/` (requests, responses, filters)
- Components: any UI components that consume facades under `src/lib/components/`

## Building

From the monorepo root run:

```bash
nx build platform.flows
```

## Running unit tests

Run the package tests with:

```bash
nx test platform.flows
```

Use `--watch` for iterative development:

```bash
nx test platform.flows --watch
```

## Configuration

The module initialisers `ZWPFlowsModule.live()` and `ZWPFlowsModule.mock()` are the preferred
configuration points. They register appropriate service providers and any state environment
providers required by the package. No runtime environment variables are required by the library
itself.

## Testing guidance
- Use `ZWPFlowsModule.mock()` in host modules for unit tests to avoid external API calls.
- Test facades and reducers with focused unit tests; use integration tests for end-to-end flow
	behaviour.

## Troubleshooting
- If services or facades are not available, ensure `nx build platform.flows` completed and the
	consuming app imports `ZWPFlowsModule.live()` or `mock()` in the root module.
- If flows behave unexpectedly, add unit tests for the affected facade or reducer and run
	`nx test platform.flows` locally.

## Contributing
- Add unit tests for any changed reducers, facades or service behaviour.
- Keep flow model changes backwards-compatible and document any breaking changes.

## License
Follow the repository license at the project root.
