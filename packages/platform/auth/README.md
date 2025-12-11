# ZWP — Platform Auth

Shared authentication state, services and utilities used across ZWP applications. This package
provides NgRx state management for user authentication, access-token accessors, an authenticated
API service and a central Angular module with convenient initialisers for `live` and `mock` modes.

Package: `@zwp/platform.auth`

## Purpose
- Encapsulate auth-related models, accessors and state so apps can reuse a consistent implementation.
- Provide `live` and `mock` module initialisers to wire up production or test-friendly service
	implementations easily.

## Key features
- Module initialisers: `ZWPAuthModule.live()` and `ZWPAuthModule.mock()` for easy configuration.
- NgRx state for authentication under `src/lib/state/` (actions, effects, facades, reducers, selectors).
- Accessors: access token accessor and payload types under `src/lib/model/`.
- Services: authenticated API service implementations under `src/lib/services/`.

## Typical usage

Import the module in your root module using the initializer that matches your environment.

Production / live services:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ZWPAuthModule } from '@zwp/platform.auth';

@NgModule({
	imports: [BrowserModule, ZWPAuthModule.live()]
})
export class AppModule {}
```

Unit-test / local dev friendly (mock services):

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ZWPAuthModule } from '@zwp/platform.auth';

@NgModule({
	imports: [BrowserModule, ZWPAuthModule.mock()]
})
export class AppModule {}
```

Public exports (facades, accessors, services and types) are available from `@zwp/platform.auth` —
see `src/index.ts` for the definitive list.

## Where to look in the codebase
- Module: `src/lib/zwp.auth.module.ts`
- State: `src/lib/state/` (actions, effects, facades, reducers, selectors)
- Models: `src/lib/model/` (access-token accessor, payload and response types)
- Services: `src/lib/services/` (authenticated API service implementations)

## Building

From the monorepo root run:

```bash
nx build platform.auth
```

## Running unit tests

Run the package tests with:

```bash
nx test platform.auth
```

Use `--watch` for iterative development:

```bash
nx test platform.auth --watch
```

## Configuration

No environment variables are required by the library itself. Choose `ZWPAuthModule.live()` or
`ZWPAuthModule.mock()` depending on whether you want the live API service wiring or test-friendly
mock implementations.

## Testing guidance
- Use `ZWPAuthModule.mock()` in host test modules to avoid external auth dependencies.
- Test facades and accessors with focused unit tests rather than exercising the whole store.

## Troubleshooting
- If auth facades or services are missing, ensure `nx build platform.auth` completed and the
	consumer has correct path mappings.
- If tokens are not being read correctly, verify that the access-token accessor is wired into the
	environment or host application correctly.

## Contributing
- Add unit tests for new facades, selectors, effects and service behaviours.
- Keep public API changes minimal and document any breaking changes.

## License
Follow the repository license at the project root.
