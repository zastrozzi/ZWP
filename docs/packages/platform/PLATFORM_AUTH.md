# Platform Auth Documentation

This document details the **platform.auth** library. The package manages authentication state using NgRx. It provides actions, reducers, selectors, and effects to manage tokens, device identifiers, and authenticated user data. It also offers facades and services for interacting with authentication-related API endpoints and for integrating with other modules in your application.

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Modules](#modules)
4. [State Management](#state-management)
    - [Actions](#actions)
    - [Reducers](#reducers)
    - [Effects](#effects)
    - [Selectors](#selectors)
5. [Facades](#facades)
6. [Models](#models)
7. [Services](#services)
8. [Configuration and Testing](#configuration-and-testing)
9. [Building and Usage](#building-and-usage)
10. [Conclusion](#conclusion)

---

## Overview

The **platform.auth** package is designed to handle user authentication across your application. It leverages NgRx to maintain a consistent state and provides a set of actions with namespaced identifiers, secure token management, and a facade layer that abstracts the complexity of state interactions. The package also contains services for making authenticated API requests.

Key features include:
- **State Management:** Actions, reducers, effects, and selectors for handling access and refresh tokens, local device identifiers, and rehydration of state.
- **Facades:** UserAuthFacade simplifies dispatching actions, retrieving authentication data, and building appropriate HTTP headers.
- **Models:** Type definitions and accessors for tokens and authenticated user data.
- **Services:** Integration with HTTP services to perform authed requests using the stored tokens and device identifiers.

---

## Directory Structure

A high-level overview of the auth package structure:

- **Root Files:**  
  - `.eslintrc.json`, `jest.config.ts`, `ng-package.json`, `package.json`, `project.json`, and various `tsconfig` files.
  - **README.md** – Brief description and usage instructions.

- **src/**  
  - **index.ts:** Re-exports the auth module, state facades, and actions.
  - **test-setup.ts:** Initialization for unit tests.
  - **lib/**
    - **zwp.auth.module.ts:** Main module that registers state, effects, and facades.
    - **platform.auth.ts:** Aggregates exports from the model and services.
    - **+state/**  
      - **identifiers.ts:** Defines the namespaced identifiers.
      - **actions/**
        - Contains definitions in [user-auth.actions.ts](packages/platform/auth/src/lib/+state/actions/user-auth.actions.ts) for setting and removing tokens, managing the local device identifier, and rehydrating state.
      - **effects/**
        - Houses side effect handling in [user-auth.effects.ts](packages/platform/auth/src/lib/+state/effects/user-auth.effects.ts) to process actions and trigger API calls.
      - **facades/**
        - [UserAuthFacade](packages/platform/auth/src/lib/+state/facades/user-auth.facade.ts) abstracts NgRx interactions by dispatching actions and providing helper methods to retrieve authentication data.
      - **reducers/**
        - [user-auth.reducer.ts](packages/platform/auth/src/lib/+state/reducers/user-auth.reducer.ts) manages state changes for tokens and device identifiers.
      - **selectors/**
        - Exports multiple selectors (e.g. [user-auth.selectors.ts](packages/platform/auth/src/lib/+state/selectors/user-auth.selectors.ts)) to access parts of the auth state.
    - **model/**
      - Defines authentication-related models and type definitions (e.g. [access-token.accessor.ts](packages/platform/auth/src/lib/+state/model/access-token.accessor.ts), [authed-user.response.ts](packages/platform/auth/src/lib/+state/model/authed-user.response.ts)).
    - **services/**
      - Provides services such as [AuthedAPIService](packages/platform/auth/src/lib/services/authed.api.service.ts) that encapsulate HTTP logic for authenticated API calls.

---

## Modules

### ZWPAuthModule
- **Purpose:**  
  Registers the auth state by configuring NgRx, registering effects, and providing an injectable facade.
- **Setup:**  
  The module imports common Angular modules and the [ZWPCommonModule](#) from the common package, and sets up the auth features with persistence (via static methods `mock()` and `live()`).
- **Configuration:**  
  Uses helper functions such as `createNamespacedFeatureKey` (see [zwp.auth.module.ts](packages/platform/auth/src/lib/zwp.auth.module.ts)) to properly namespace auth state.

---

## State Management

The auth state is managed using NgRx. The following sections detail the key parts:

### Actions
- **File:** [user-auth.actions.ts](packages/platform/auth/src/lib/+state/actions/user-auth.actions.ts)
- **Purpose:**  
  Define actions to set and remove access tokens, refresh tokens, manage the local device identifier, and rehydrate the auth state.
- **Examples:**
  - `setAccessToken`, `setRefreshToken`, and `setTokens` to store tokens.
  - `removeAccessToken` and `removeRefreshToken` to clear specific tokens.
  - `clearTokens` to remove all tokens.
  - `setLocalDeviceIdentifier` and `clearLocalDeviceIdentifier` to manage device-specific data.
- **Implementation:**  
  Uses `createAction` combined with `createActionType` from the common package to produce namespaced action types.

### Reducers
- **File:** [user-auth.reducer.ts](packages/platform/auth/src/lib/+state/reducers/user-auth.reducer.ts)
- **Purpose:**  
  Handle state transitions based on dispatched actions. Updates include:
  - Setting and clearing tokens.
  - Managing the local device identifier.
  - Processing rehydration of the auth state.
- **Structure:**  
  Combines multiple state transitions with NgRx's `on` operator.

### Effects
- **File:** [user-auth.effects.ts](packages/platform/auth/src/lib/+state/effects/user-auth.effects.ts)
- **Purpose:**  
  Listen for dispatched actions and execute side effects such as calling APIs or triggering persistence actions.
- **Key Points:**  
  - Uses decorators like `@Injectable` and `@ZWPDebuggableInjectable` for debugging.
  - Integrates with other parts of the auth system (e.g., the UserAuthFacade).
  - Often involves delays and distinct filter operators to aggregate or delay actions for improved UX.

### Selectors
- **File:** [user-auth.selectors.ts](packages/platform/auth/src/lib/+state/selectors/user-auth.selectors.ts)
- **Purpose:**  
  Provide a convenient way to access specific parts of the auth state.
- **Examples:**
  - Selectors to retrieve the local device identifier.
  - Check if tokens exist (i.e. `hasAccessToken`, `hasRefreshToken`).
  - Retrieve details from the access token payload (e.g., user roles and expiration times).

---

## Facades

### UserAuthFacade
- **File:** [user-auth.facade.ts](packages/platform/auth/src/lib/+state/facades/user-auth.facade.ts)
- **Purpose:**  
  Simplify interactions with the auth state by abstracting the complexity of dispatching actions and reading state.
- **Features:**  
  - Methods such as `setAccessToken`, `setRefreshToken`, `removeAccessToken`, and `clearTokens` dispatch the appropriate actions.
  - Helper methods to retrieve HTTP headers for authenticated requests:
    - `authHeader`: Returns an `HttpHeaders` object with the bearer token.
    - `addDeviceIdHeader`: Adds device-specific headers (like `X-Local-Device-Identifier` and `X-Forwarded-For`) to HTTP requests.
- **Design:**  
  Subscribes to state changes (e.g., device identifier and IP address) and cleans up subscriptions on destroy.

---

## Models

- **Purpose:**  
  Define types and interfaces for authentication-related data.
- **Contents:**  
  - Token accessors and payload definitions (e.g. [access-token.accessor.ts](packages/platform/auth/src/lib/+state/model/access-token.accessor.ts) and [access-token.payload.ts](packages/platform/auth/src/lib/+state/model/access-token.payload.ts)).
  - Models for the authenticated user response.
  - Enumerations and interfaces that ensure type safety when managing auth data.

---

## Services

### AuthedAPIService
- **File:** [authed.api.service.ts](packages/platform/auth/src/lib/services/authed.api.service.ts)
- **Purpose:**  
  Encapsulates logic for making HTTP requests that require authentication.
- **Features:**  
  - Retrieves the access token using the token accessor.
  - Prepares authenticated HTTP headers via the UserAuthFacade.
  - Provides a method `accessTokenAuthedRequest` to simplify authed API calls with standard parameters such as HTTP method, URL, body, and additional headers.
- **Implementation:**  
  Leverages dependency injection for HTTP services and the auth facade, ensuring consistent header management across API calls.

---

## Configuration and Testing

- **Configuration Files:**  
  The package includes `.eslintrc.json`, `jest.config.ts`, and various `tsconfig` files to ensure consistency in style and type checking.
- **Testing:**  
  - Unit tests are configured using Jest.  
  - The [test-setup.ts](packages/platform/auth/src/test-setup.ts) file sets up the testing environment.
- **Nx Integration:**  
  The [project.json](packages/platform/auth/project.json) defines targets for building (`nx build platform.auth`), testing (`nx test platform.auth`), and linting (`nx lint platform.auth`).

---

## Building and Usage

1. **Build the Package:**
    ```sh
    nx build platform.auth
    ```

2. **Run Tests:**
    ```sh
    nx test platform.auth
    ```

3. **Usage in an Angular Project:**
    Import the auth module and add it to your application module:
    ```typescript
    import { ZWPAuthModule } from '@zwp/platform.auth';

    @NgModule({
      imports: [
        ZWPAuthModule.live() // or ZWPAuthModule.mock() as needed
      ]
    })
    export class AppModule {}
    ```

4. **Dispatching Actions and Using the Facade:**
    The [UserAuthFacade](packages/platform/auth/src/lib/+state/facades/user-auth.facade.ts) can be injected into any Angular service or component to manage authentication state. For example:
    ```typescript
    constructor(private authFacade: UserAuthFacade) {}

    login(accessToken: string, refreshToken: string): void {
      this.authFacade.setTokens(accessToken, refreshToken);
    }
    ```

---

## Conclusion

The **platform.auth** package offers a comprehensive solution for managing authentication in your Angular application. With well-organized state management, robust facades, detailed models, and authed API services, this package ensures that your authentication logic is both scalable and maintainable.

This documentation should serve as a guide to understanding, configuring, and extending the authentication features provided by **platform.auth**.