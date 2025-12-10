# Platform Identity Documentation

This document details the **platform.identity** library. This package handles user identity management for your Angular application. It provides tools for managing authentication, user profiles, and associated data. The package leverages NgRx for state management (with actions, effects, reducers, selectors, and facades), defines API routes and service implementations (both live and mock), and delivers reusable UI components for identity interactions.

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Modules](#modules)
4. [State Management](#state-management)
   - [Identifiers & State Assembly](#identifiers--state-assembly)
   - [Actions](#actions)
     - [Admin User Actions](#admin-user-actions)
     - [Enduser Actions](#enduser-actions)
   - [Effects](#effects)
   - [Reducers](#reducers)
   - [Selectors](#selectors)
   - [Facades](#facades)
     - [Detailed Facades and Their Methods](#detailed-facades-and-their-methods)
5. [Models](#models)
6. [API Routes & Configurations](#api-routes--configurations)
7. [Services](#services)
8. [Building and Usage](#building-and-usage)
9. [Conclusion](#conclusion)

---

## Overview

The **platform.identity** package provides a comprehensive solution for managing identity-related functionality in your application. Key features include:

- **State Management:** Uses NgRx to track identity state such as authentication tokens, profile data, and user preferences.
- **Facades:** Abstract direct NgRx interactions to simplify component code. Both admin-user and enduser domains are supported.
- **API Communication:** Defines API routes and service implementations (live and mock) to handle requests for user identity.
- **UI Components:** Optional components can be used to render user profiles, login forms, and other identity-related interfaces.

This package is designed to seamlessly integrate with your Angular application in both production and development environments.

---

## Directory Structure

A high-level overview of the package layout:

- **Root Files:**  
  - Configuration: `.eslintrc.json`, `jest.config.ts`, `ng-package.json`, `package.json`, `project.json`
  - TypeScript configurations: `tsconfig.json`, `tsconfig.lib.json`, `tsconfig.lib.prod.json`, `tsconfig.spec.json`
  - [README.md](packages/platform/identity/README.md)

- **src/**  
  - `index.ts` – Main entry point re-exporting the module and library API.
  - `test-setup.ts` – Configuration for Jest.
  - **lib/**  
    - **platform.identity.module.ts:**  
      The main Angular module that bootstraps the identity state, effects, routes, and UI components.
    - **platform.identity.ts:**  
      Aggregates exports for easier consumption.
    - **+state/**  
      - **identifiers.ts:**  
        Contains namespaced keys (such as `IDENTITY_ACTION_IDENTIFIER`) for use in actions and reducers.
      - **actions/**  
        Defines NgRx actions for admin users, endusers, and related data.
      - **effects/**  
        Implements side effects for asynchronous operations such as fetching user data.
      - **reducers/**  
        Contains reducers that update state slices for identity data.
      - **selectors/**  
        Offers selectors to extract specific interface slices (e.g., authentication status, selected user).
      - **facades/**  
        Provides a higher-level, component-friendly API to interact with identity state (see detailed facades below).
    - **api-routes/**  
      Contains API route definitions used to communicate with identity endpoints.
    - **components/**  
      Contains reusable UI components for identity management.
    - **config/**  
      Holds configuration files, including [identity.api-config.ts](packages/platform/identity/src/lib/config/identity.api-config.ts).
    - **model/**  
      Defines data models and types for user identity (e.g. profile models, credential models).
    - **routes/**  
      Contains navigation route definitions if applicable.
    - **services/**  
      Implements API service handlers for live and mock identity-related operations.

---

## Modules

### PlatformIdentityModule
- **Purpose:**  
  The central Angular module for identity management. It wires up state slices, imports necessary libraries (e.g. Angular Material, platform.common), and registers API providers.
- **Setup:**  
  Defined in [platform.identity.module.ts](packages/platform/identity/src/lib/platform.identity.module.ts). It uses helper functions (like `createNamespacedFeatureKey`) to register state features for both admin and enduser domains.
- **Configuration:**  
  The module supports static methods (for example, `.live()` or `.mock()`) for specifying whether to use live or mock API services.

---

## State Management

The identity package uses NgRx to maintain state consistency for authentication and profile data.

### Identifiers & State Assembly
- **Identifiers:**  
  The file [identifiers.ts](packages/platform/identity/src/lib/+state/identifiers.ts) defines consistent keys such as `IDENTITY_ACTION_IDENTIFIER` and keys for various state slices (e.g., admin-user and enduser state).
- **State Assembly:**  
  State is composed from individual slices defined in reducer files and aggregated in [state.ts](packages/platform/identity/src/lib/+state/state.ts). All parts are re-exported via the index for easy consumption.

### Actions

Identity actions are divided primarily into admin-user and enduser groups.

#### Admin User Actions
- **Examples:**  
  - `createAdminUser`: Initiates the creation of an admin user.
  - `updateAdminUser`: Updates details for an existing admin user.
  - `deleteAdminUser`: Removes an admin user.
  - `resetAdminUserFilters`: Resets any filter state applied to admin user lists.
- **Implementation:**  
  Actions are defined using NgRx’s `createAction` and include required payloads (e.g. user credentials, profile data).

#### Enduser Actions
- **Examples:**  
  - `listEndusers`: Dispatches a request to load a list of endusers (optionally with pagination).
  - `selectEnduser`: Selects an individual enduser by ID.
  - `updateEnduserFilters`: Updates the filter criteria for enduser queries.
  - `resetEnduserFilters`: Clears any applied filters.
- **Implementation:**  
  Similar to admin actions, these are built with `createAction` and are tailored to handle enduser state.

### Effects
- **Purpose:**  
  Effects listen for dispatched actions and execute asynchronous operations such as API calls.  
- **Examples:**  
  - Effects in `admin-user.effects.ts` might handle admin user creation, update, or deletion workflows.
  - Effects in `enduser.effects.ts` handle fetching enduser lists and detailed profiles.
- **Implementation:**  
  RxJS operators like `switchMap`, `map`, and `catchError` are used to send and process API responses.

### Reducers
- **Purpose:**  
  Reducers update the identity state based on the actions dispatched.  
- **Examples:**  
  - The admin user reducer updates the state when actions such as `resetAdminUserFilters` are dispatched.
  - The enduser reducer maintains the list of endusers and updates filters, selections, and pagination data.
- **Implementation:**  
  Reducers are created using NgRx’s `createReducer` and `on` functions.

### Selectors
- **Purpose:**  
  Selectors extract and derive pieces of the identity state for consumption by components.  
- **Examples:**  
  - Selectors under [selectors/](packages/platform/identity/src/lib/+state/selectors/) allow access to the current logged-in admin user, selected enduser, or applied filters.
- **Implementation:**  
  Selectors use NgRx’s `createSelector` to generate memoized state slices.

### Facades

Facades provide a higher-level interface for interacting with identity state without directly dispatching actions or subscribing to selectors.

#### Detailed Facades and Their Methods

- **AdminUserFacade:**  
  *Methods and Properties:*  
  - **Observables:**  
    - `adminUserFilters$`: Streams current admin user filter settings.
    - `adminUserRemotePagination$`: Provides pagination details for the admin user list.
    - `adminUsers$`: An observable stream of all admin user records.
    - `selectedAdminUser$`: Returns the currently selected admin user.
    - `loggedInAdminUser$`, `hasLoggedInAdminUser$`, `loggedInAdminUserName$`: Observables for authentication state.
  - **Methods:**  
    - `resetAdminUserFilters()`: Dispatches an action to clear admin user filters.
    - *Other methods* (not fully excerpted): Likely include methods to create, update, and delete admin users via their respective actions.

- **EnduserFacade:**  
  *Methods and Properties:*  
  - **Observables:**  
    - `enduserFilters$`: Provides current filter settings for endusers.
    - `enduserRemotePagination$`: Streams pagination info.
    - `endusers$`: Collection of enduser records.
    - `selectedEnduser$`: The currently selected enduser.
    - `selectedEnduserId$`: Observable for the selected enduser ID.
    - `enduserById$(id: string)`: Function returning an observable for a specific enduser.
  - **Methods:**  
    - `listEndusers(pagination?: Nullable<Partial<PaginatedQueryParams<Model.EnduserResponse>>>): void`: Dispatches an action to list endusers.
    - `selectEnduser(enduserId: string): void`: Dispatches an action to select an enduser.
    - `updateEnduserFilters(filters: Partial<Model.EnduserFilters>): void`: Dispatches an action to update filters.
    - `resetEnduserFilters(): void`: Dispatches an action to clear filters.

- **EnduserAddressFacade:**  
  *Methods and Properties:*  
  - **Observables:**  
    - `enduserAddressFilters$`, `enduserAddressRemotePagination$`, `enduserAddresses$`, `selectedEnduserAddress$`, `filteredEnduserAddresses$`: Provide reactive streams for address-related state.
  - **Methods:**  
    - `createEnduserAddress(enduserId: string, request: Model.CreateEnduserAddressRequest): void`: Dispatches an action to create a new enduser address.
    - `listEnduserAddresses(enduserId: string, pagination?: Nullable<Partial<PaginatedQueryParams<Model.EnduserAddressResponse>>>): void`: Dispatches an action to list addresses.
    - `updateEnduserAddressFilters(filters: Partial<Model.EnduserAddressFilters>): void`: Dispatches an action to update address filter criteria.

- **EnduserSessionFacade:**  
  *Methods and Properties:*  
  - **Observables:**  
    - `enduserSessionFilters$`, `enduserSessionRemotePagination$`, `enduserSessionRemoteState$`, `enduserSessions$`, `selectedEnduserSession$`, and a helper `enduserSessionById$(id: string)` observable.
  - **Methods:**  
    - (Other session-related methods can include dispatching actions to load or update session details.)

*Note:* Additional facades (e.g., EnduserCredentialFacade, EnduserDeviceFacade, EnduserEmailFacade, EnduserPhoneFacade) are exported and available via the facades index. Each follows similar patterns of exposing selectors as observables and methods that dispatch actions.

---

## Models

Models in the identity package define the shape of identity-related data:
- **Identity Model:**  
  Defined in [model/model.ts](packages/platform/identity/src/lib/model/model.ts) and re-exported via [model/index.ts](packages/platform/identity/src/lib/model/index.ts).
- **User Profiles, Credentials, and Session Models:**  
  Structures that represent admin users and endusers, including their credentials and session states.
- **Filters & Requests:**  
  Types for filtering user lists and making API requests are defined in respective folders under `model/`.

---

## API Routes & Configurations

- **API Routes:**  
  Located within the `api-routes/` folder, these files centralize endpoint definitions for identity. This may include routes for admin user operations, enduser data fetches, and other identity tasks.
- **Configurations:**  
  The file [identity.api-config.ts](packages/platform/identity/src/lib/config/identity.api-config.ts) defines the configuration interface and instantiates injection tokens (e.g. `IDENTITY_API_CONFIG`). These tokens are used in module configuration to determine API endpoints for live or mock modes.

---

## Services

Services implement the actual API calls for identity operations. Both live and mock service implementations exist to support production and development use cases.

- **Live API Services:**  
  Connect to real backend endpoints to manage identity data.
- **Mock API Services:**  
  Simulate API responses with stubbed data for testing and local development.

Services are provided via factory providers declared in the module, ensuring that the appropriate implementation (live or mock) is used based on configuration.

---

## Building and Usage

1. **Build the Package:**
    ```sh
    nx build platform.identity
    ```
2. **Run Tests:**
    ```sh
    nx test platform.identity
    ```
3. **Usage in an Angular Project:**
    Import the module and configure the API providers:
    ```typescript
    import { PlatformIdentityModule } from '@zwp/platform.identity';

    @NgModule({
      imports: [
        // For production:
        PlatformIdentityModule.live(),
        // For development/testing:
        // PlatformIdentityModule.mock()
      ]
    })
    export class AppModule {}
    ```
4. **Interacting with State:**
    Inject facades (such as EnduserFacade or AdminUserFacade) into your components:
    ```typescript
    constructor(private enduserFacade: EnduserFacade) {}

    loadUsers() {
      this.enduserFacade.listEndusers();
    }
    ```
    
---

## Conclusion

The **platform.identity** package offers a powerful, scalable solution for managing user identity within your Angular application. With well-organized NgRx state management (actions, effects, reducers, selectors, and facades), robust model definitions, centralized API routes, and flexible service implementations, it supports both admin and enduser domains. Detailed facade methods further simplify integration with your component logic.
