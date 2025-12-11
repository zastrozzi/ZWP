---
id: cdp.users
title: Customer Data Platform - User Management
sidebar_label: User Management
---
# Zastrozzi CDP Users Library Documentation

This document details the **Zastrozzi CDP Users Library**. This library provides functionality for managing both administrator and enduser accounts within the Zastrozzi CDP suite. It leverages NgRx for state management (via actions, effects, reducers, selectors, and facades), exposes API routes and configuration tokens, provides shared accessors, and includes a variety of reusable UI components and services. The library covers domains such as admin‑users and endusers, along with their associated state and API operations.

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Modules](#modules)
4. [State Management](#state-management)
   - [Identifiers & State Assembly](#identifiers--state-assembly)
   - [Actions](#actions)
   - [Effects](#effects)
   - [Reducers](#reducers)
   - [Selectors](#selectors)
   - [Facades](#facades)
5. [Accessors](#accessors)
6. [API Routes & Configuration](#api-routes--configuration)
7. [Services](#services)
   - [Live API Services](#live-api-services)
   - [Mock API Services](#mock-api-services)
   - [Abstract API Services & Tokens](#abstract-api-services--tokens)
8. [Components](#components)
9. [Building and Usage](#building-and-usage)
10. [Conclusion](#conclusion)

---

## Overview

The **Zastrozzi CDP Users Library** delivers user management capabilities across two main domains:

- **Admin Users:** Features for managing administrator accounts, including creation, credentials, devices, email, session, and activity.
- **Endusers:** Features to manage standard enduser accounts along with their addresses, credentials, devices, emails, phones, sessions, and activity logs.

The library uses a robust NgRx state management setup to ensure that state is predictable and actions are traceable. It also offers a range of UI components (such as lists, paginated tables, and filter inputs) and accessors for handling user tokens. Additionally, API routes and services—both live and mock—provide flexibility when integrating with backend endpoints.

---

## Directory Structure

A high-level overview of the CDP‑Users library layout (located in [`/packages/cdp/users`]({{ site.repo_root_url }}/packages/cdp/users)):

```
.eslintrc.json
jest.config.ts
ng-package.json
package.json
project.json
README.md
tsconfig.json
tsconfig.lib.json
tsconfig.lib.prod.json
tsconfig.spec.json
src/
  index.ts
  test-setup.ts
  lib/
    cdp-users.module.ts            // Main module that aggregates state, components, services, and API routes.
    cdp-users.ts                   // Aggregates exports (state, models, accessors, routes, and services).
    +state/
      identifiers.ts             // Defines namespaced keys for admin-user and enduser states.
      index.ts                   // Re-exports state pieces.
      state.ts                   // Combines reducers into a central state.
      actions/                   // Contains NgRx actions for admin-user and enduser domains.
      effects/                   // Contains NgRx effects for asynchronous operations.
      facades/                   // Exposes high-level facades for state access:
                                 // e.g. AdminUserFacade, EnduserFacade, EnduserDeviceFacade, etc.
      reducers/                  // Contains reducers for processing actions immutably.
      selectors/                 // Provides memoized selectors for state slices.
    accessors/
      admin-user.access-token.accessor.ts   // Provides helper methods for admin user token operations.
      index.ts
    api-routes/                  // Aggregates API route definitions (for admin-user and enduser operations).
    components/                  // Reusable UI components (lists, forms, paginated tables, etc.).
    config/                      // Configuration files and tokens (e.g. CDP_USERS_API_CONFIG).
    model/                       // Shared models, enums, filters, requests, and responses.
    routes/                      // Angular route definitions specific to admin and enduser modules.
    services/                    // Contains abstract, live, and mock API service implementations.
```

---

## Modules

### CDPUsersModule
- **Purpose:**  
  The main Angular module for the CDP‑Users library. It bootstraps user management functionality and aggregates state slices, components, accessors, and services.
- **Setup:**  
  Defined in `cdp-users.module.ts`, the module imports common modules (e.g. `CommonModule`, `ZWPCommonModule`, `ZWPLayoutModule`, `ZWPAuthModule`), registers state via NgRx, and declares UI components. It also configures API routes and injects service providers based on module configuration.
- **Configuration:**  
  The module’s `forRoot()` method accepts a configuration object (of type `CDPUsersAPIConfig`) and sets up API endpoints and the live or mock service implementations accordingly.

---

## State Management

The library leverages NgRx to handle both admin-user and enduser states. Each domain defines its own actions, effects, reducers, selectors, and facades.

### Identifiers & State Assembly
- **Identifiers:**  
  Defined in [identifiers.ts]({{ site.repo_root_url }}/packages/cdp/users/src/lib/+state/identifiers.ts), key identifiers include:
  - `CDP_USERS_ACTION_IDENTIFIER`
  - `ADMIN_USER_STATE_FEATURE_KEY`
  - `ADMIN_USER_DEVICE_STATE_FEATURE_KEY`
  - `ADMIN_USER_EMAIL_STATE_FEATURE_KEY`
  - `ADMIN_USER_SESSION_STATE_FEATURE_KEY`
  - `ENDUSER_STATE_FEATURE_KEY`
  - `ENDUSER_ACTIVITY_STATE_FEATURE_KEY`
  - *(and others for addresses, credentials, phones, etc.)*
- **State Assembly:**  
  The state is assembled in [state.ts]({{ site.repo_root_url }}/packages/cdp/users/src/lib/+state/state.ts) by combining reducers for each feature area.

### Actions

The CDP‑Users library organizes its actions into two main domains: Admin‑User Actions and Enduser Actions. In addition to the main CRUD actions, sub‑actions handle operations for related domains (such as addresses, credentials, devices, emails, sessions, phones, and activity). Each action dispatches a specific event to the NgRx store via NgRx’s `createAction` and is used in effects to perform asynchronous operations and update state.

### Admin‑User Actions

These actions cover operations related to administrator accounts as well as the management of their sub-resources.

#### Main Admin‑User Actions
- **createAdminUser**  
  • **Description:** Initiates a request to create a new admin user.  
  • **Payload:**  
    - `request: CreateAdminUserRequest` (properties such as name, email, role, etc.)  
  • **Example:**  
    ```ts
    createAdminUser({ request: { name: 'Alice Admin', email: 'alice@example.com', role: 'admin' } })
    ```

- **getAdminUser**  
  • **Description:** Fetches details of an admin user by ID.  
  • **Payload:**  
    - `adminUserId: string`  
  • **Example:**  
    ```ts
    getAdminUser({ adminUserId: 'admin123' })
    ```

- **updateAdminUser**  
  • **Description:** Sends updated data for an admin user.  
  • **Payload:**  
    - `adminUserId: string`  
    - `update: UpdateAdminUserRequest`  
  • **Example:**  
    ```ts
    updateAdminUser({ adminUserId: 'admin123', update: { email: 'newemail@example.com' } })
    ```

- **deleteAdminUser**  
  • **Description:** Deletes an admin user; a `force` flag may bypass validations.  
  • **Payload:**  
    - `adminUserId: string`  
    - `force?: boolean`  
  • **Example:**  
    ```ts
    deleteAdminUser({ adminUserId: 'admin123', force: true })
    ```

#### Admin‑User Sub-Actions

These sub‑actions manage additional aspects of an admin user account.

- **Credentials Actions**  
  - **createAdminUserCredential**  
    • **Description:** Creates a new credential (e.g. a password or biometric record) for an admin user.  
    • **Payload:**  
      - `adminUserId: string`  
      - `credential: { type: string, value: string }`  
    • **Example:**  
      ```ts
      createAdminUserCredential({ adminUserId: 'admin123', credential: { type: 'password', value: 'securePass!' } })
      ```
    
  - **updateAdminUserCredential**  
    • **Description:** Updates an existing credential for an admin user.  
    • **Payload:**  
      - `adminUserId: string`  
      - `credentialId: string`  
      - `update: Partial<CredentialUpdate>`  
    • **Example:**  
      ```ts
      updateAdminUserCredential({ adminUserId: 'admin123', credentialId: 'cred456', update: { value: 'newSecurePass!' } })
      ```
    
  - **deleteAdminUserCredential**  
    • **Description:** Deletes a credential from an admin user’s account.  
    • **Payload:**  
      - `adminUserId: string`  
      - `credentialId: string`  
    • **Example:**  
      ```ts
      deleteAdminUserCredential({ adminUserId: 'admin123', credentialId: 'cred456' })
      ```

- **Device Actions**  
  - **registerAdminUserDevice**  
    • **Description:** Registers a new device for an admin user.  
    • **Payload:**  
      - `adminUserId: string`  
      - `device: DeviceInfo`  
    • **Example:**  
      ```ts
      registerAdminUserDevice({ adminUserId: 'admin123', device: { deviceId: 'dev001', type: 'desktop' } })
      ```
    
  - **updateAdminUserDevice**  
    • **Description:** Updates details for an admin user’s device.  
    • **Payload:**  
      - `adminUserId: string`  
      - `deviceId: string`  
      - `update: Partial<DeviceInfo>`  
    • **Example:**  
      ```ts
      updateAdminUserDevice({ adminUserId: 'admin123', deviceId: 'dev001', update: { type: 'laptop' } })
      ```
    
  - **deleteAdminUserDevice**  
    • **Description:** Removes a registered device from an admin user’s account.  
    • **Payload:**  
      - `adminUserId: string`  
      - `deviceId: string`  
    • **Example:**  
      ```ts
      deleteAdminUserDevice({ adminUserId: 'admin123', deviceId: 'dev001' })
      ```

- **Email Actions**  
  - **addAdminUserEmail**  
    • **Description:** Adds a new email address to an admin user’s account.  
    • **Payload:**  
      - `adminUserId: string`  
      - `email: string`  
    • **Example:**  
      ```ts
      addAdminUserEmail({ adminUserId: 'admin123', email: 'admin.new@example.com' })
      ```
    
  - **updateAdminUserEmail**  
    • **Description:** Updates an existing email address record for an admin user.  
    • **Payload:**  
      - `adminUserId: string`  
      - `emailId: string`  
      - `update: Partial<EmailUpdate>`  
    • **Example:**  
      ```ts
      updateAdminUserEmail({ adminUserId: 'admin123', emailId: 'email789', update: { verified: true } })
      ```
    
  - **deleteAdminUserEmail**  
    • **Description:** Deletes an email address from an admin user’s account.  
    • **Payload:**  
      - `adminUserId: string`  
      - `emailId: string`  
    • **Example:**  
      ```ts
      deleteAdminUserEmail({ adminUserId: 'admin123', emailId: 'email789' })
      ```

- **Session Actions**  
  - **startAdminUserSession**  
    • **Description:** Initiates a login session for an admin user.  
    • **Payload:**  
      - `adminUserId: string`  
      - `sessionDetails: SessionStartInfo`  
    • **Example:**  
      ```ts
      startAdminUserSession({ adminUserId: 'admin123', sessionDetails: { token: 'abc123', expiresIn: 3600 } })
      ```
    
  - **endAdminUserSession**  
    • **Description:** Ends an active session for an admin user.  
    • **Payload:**  
      - `adminUserId: string`  
      - `sessionId: string`  
    • **Example:**  
      ```ts
      endAdminUserSession({ adminUserId: 'admin123', sessionId: 'sess456' })
      ```
    
  - **refreshAdminUserSession**  
    • **Description:** Refreshes the authentication token for an admin user.  
    • **Payload:**  
      - `adminUserId: string`  
      - `sessionId: string`  
      - `newToken: string`  
    • **Example:**  
      ```ts
      refreshAdminUserSession({ adminUserId: 'admin123', sessionId: 'sess456', newToken: 'newtoken789' })
      ```

- **Activity Actions**  
  - **recordAdminUserActivity**  
    • **Description:** Records an activity event (e.g. login, update) for an admin user.  
    • **Payload:**  
      - `adminUserId: string`  
      - `activity: ActivityEvent`  
    • **Example:**  
      ```ts
      recordAdminUserActivity({ adminUserId: 'admin123', activity: { type: 'LOGIN', timestamp: Date.now() } })
      ```
    
  - **clearAdminUserActivity**  
    • **Description:** Clears activity logs from an admin user’s record.  
    • **Payload:**  
      - `adminUserId: string`  
    • **Example:**  
      ```ts
      clearAdminUserActivity({ adminUserId: 'admin123' })
      ```

### Enduser Actions

These actions manage standard enduser accounts and include additional operations for sub-resources such as addresses, credentials, devices, emails, phones, sessions, and activity.

#### Main Enduser Actions
- **createEnduser**  
  • **Description:** Initiates the creation of a new enduser account.  
  • **Payload:**  
    - `request: CreateEnduserRequest` (includes firstName, lastName, email, etc.)  
  • **Example:**  
    ```ts
    createEnduser({ request: { firstName: 'Bob', lastName: 'User', email: 'bob@example.com' } })
    ```

- **getEnduser**  
  • **Description:** Retrieves details for a specific enduser by ID.  
  • **Payload:**  
    - `enduserId: string`  
  • **Example:**  
    ```ts
    getEnduser({ enduserId: 'enduser456' })
    ```

- **updateEnduser**  
  • **Description:** Updates information for an enduser.  
  • **Payload:**  
    - `enduserId: string`  
    - `update: UpdateEnduserRequest`  
  • **Example:**  
    ```ts
    updateEnduser({ enduserId: 'enduser456', update: { phone: '123-456-7890' } })
    ```

- **deleteEnduser**  
  • **Description:** Deletes an enduser account; supports an optional force flag.  
  • **Payload:**  
    - `enduserId: string`  
    - `force?: boolean`  
  • **Example:**  
    ```ts
    deleteEnduser({ enduserId: 'enduser456', force: true })
    ```

#### Enduser Sub-Actions

- **Address Actions**  
  - **createEnduserAddress**  
    • **Description:** Creates a new address record for an enduser.  
    • **Payload:**  
      - `enduserId: string`  
      - `address: AddressInfo`  
    • **Example:**  
      ```ts
      createEnduserAddress({ enduserId: 'enduser456', address: { street: '123 Main St', city: 'Metropolis' } })
      ```
    
  - **updateEnduserAddress**  
    • **Description:** Updates an existing address for an enduser.  
    • **Payload:**  
      - `enduserId: string`  
      - `addressId: string`  
      - `update: Partial<AddressInfo>`  
    • **Example:**  
      ```ts
      updateEnduserAddress({ enduserId: 'enduser456', addressId: 'addr789', update: { city: 'Gotham' } })
      ```
    
  - **deleteEnduserAddress**  
    • **Description:** Deletes an address from an enduser’s account.  
    • **Payload:**  
      - `enduserId: string`  
      - `addressId: string`  
    • **Example:**  
      ```ts
      deleteEnduserAddress({ enduserId: 'enduser456', addressId: 'addr789' })
      ```

- **Credential Actions**  
  - **createEnduserCredential**  
    • **Description:** Creates a credential (e.g. password) for an enduser.  
    • **Payload:**  
      - `enduserId: string`  
      - `credential: { type: string, value: string }`  
    • **Example:**  
      ```ts
      createEnduserCredential({ enduserId: 'enduser456', credential: { type: 'password', value: 'enduserPass!' } })
      ```
    
  - **updateEnduserCredential**  
    • **Description:** Updates an existing credential for an enduser.  
    • **Payload:**  
      - `enduserId: string`  
      - `credentialId: string`  
      - `update: Partial<CredentialUpdate>`  
    • **Example:**  
      ```ts
      updateEnduserCredential({ enduserId: 'enduser456', credentialId: 'cred101', update: { value: 'newPass123' } })
      ```
    
  - **deleteEnduserCredential**  
    • **Description:** Deletes an enduser credential.  
    • **Payload:**  
      - `enduserId: string`  
      - `credentialId: string`  
    • **Example:**  
      ```ts
      deleteEnduserCredential({ enduserId: 'enduser456', credentialId: 'cred101' })
      ```

- **Device Actions**  
  - **registerEnduserDevice**  
    • **Description:** Registers a new device for an enduser.  
    • **Payload:**  
      - `enduserId: string`  
      - `device: DeviceInfo`  
    • **Example:**  
      ```ts
      registerEnduserDevice({ enduserId: 'enduser456', device: { deviceId: 'dev002', type: 'mobile' } })
      ```
    
  - **updateEnduserDevice**  
    • **Description:** Updates device information for an enduser.  
    • **Payload:**  
      - `enduserId: string`  
      - `deviceId: string`  
      - `update: Partial<DeviceInfo>`  
    • **Example:**  
      ```ts
      updateEnduserDevice({ enduserId: 'enduser456', deviceId: 'dev002', update: { type: 'tablet' } })
      ```
    
  - **deleteEnduserDevice**  
    • **Description:** Deletes a registered device from an enduser’s account.  
    • **Payload:**  
      - `enduserId: string`  
      - `deviceId: string`  
    • **Example:**  
      ```ts
      deleteEnduserDevice({ enduserId: 'enduser456', deviceId: 'dev002' })
      ```

- **Email Actions**  
  - **addEnduserEmail**  
    • **Description:** Adds an email address to an enduser’s account.  
    • **Payload:**  
      - `enduserId: string`  
      - `email: string`  
    • **Example:**  
      ```ts
      addEnduserEmail({ enduserId: 'enduser456', email: 'bob.user@example.com' })
      ```
    
  - **updateEnduserEmail**  
    • **Description:** Updates an existing email for an enduser.  
    • **Payload:**  
      - `enduserId: string`  
      - `emailId: string`  
      - `update: Partial<EmailUpdate>`  
    • **Example:**  
      ```ts
      updateEnduserEmail({ enduserId: 'enduser456', emailId: 'email202', update: { verified: true } })
      ```
    
  - **deleteEnduserEmail**  
    • **Description:** Deletes an email from an enduser’s account.  
    • **Payload:**  
      - `enduserId: string`  
      - `emailId: string`  
    • **Example:**  
      ```ts
      deleteEnduserEmail({ enduserId: 'enduser456', emailId: 'email202' })
      ```

- **Phone Actions**  
  - **addEnduserPhone**  
    • **Description:** Adds a new phone number to the enduser’s account.  
    • **Payload:**  
      - `enduserId: string`  
      - `phone: string`  
    • **Example:**  
      ```ts
      addEnduserPhone({ enduserId: 'enduser456', phone: '+11234567890' })
      ```
    
  - **updateEnduserPhone**  
    • **Description:** Updates a phone number for an enduser.  
    • **Payload:**  
      - `enduserId: string`  
      - `phoneId: string`  
      - `update: Partial<PhoneUpdate>`  
    • **Example:**  
      ```ts
      updateEnduserPhone({ enduserId: 'enduser456', phoneId: 'phone303', update: { primary: true } })
      ```
    
  - **deleteEnduserPhone**  
    • **Description:** Deletes a phone number from an enduser’s account.  
    • **Payload:**  
      - `enduserId: string`  
      - `phoneId: string`  
    • **Example:**  
      ```ts
      deleteEnduserPhone({ enduserId: 'enduser456', phoneId: 'phone303' })
      ```

- **Session Actions**  
  - **startEnduserSession**  
    • **Description:** Initiates a session for an enduser (login).  
    • **Payload:**  
      - `enduserId: string`  
      - `sessionDetails: SessionStartInfo`  
    • **Example:**  
      ```ts
      startEnduserSession({ enduserId: 'enduser456', sessionDetails: { token: 'xyz789', expiresIn: 3600 } })
      ```
    
  - **endEnduserSession**  
    • **Description:** Ends an active session for an enduser (logout).  
    • **Payload:**  
      - `enduserId: string`  
      - `sessionId: string`  
    • **Example:**  
      ```ts
      endEnduserSession({ enduserId: 'enduser456', sessionId: 'sess999' })
      ```
    
  - **refreshEnduserSession**  
    • **Description:** Refreshes an enduser’s session token.  
    • **Payload:**  
      - `enduserId: string`  
      - `sessionId: string`  
      - `newToken: string`  
    • **Example:**  
      ```ts
      refreshEnduserSession({ enduserId: 'enduser456', sessionId: 'sess999', newToken: 'newtoken321' })
      ```

- **Activity Actions**  
  - **recordEnduserActivity**  
    • **Description:** Records an activity event (like login, update) for an enduser.  
    • **Payload:**  
      - `enduserId: string`  
      - `activity: ActivityEvent`  
    • **Example:**  
      ```ts
      recordEnduserActivity({ enduserId: 'enduser456', activity: { type: 'UPDATE', timestamp: Date.now() } })
      ```
    
  - **clearEnduserActivity**  
    • **Description:** Clears activity logs for an enduser.  
    • **Payload:**  
      - `enduserId: string`  
    • **Example:**  
      ```ts
      clearEnduserActivity({ enduserId: 'enduser456' })
      ```

Each of these actions is typically defined with NgRx’s `createAction` function in the corresponding action file (e.g. `admin-user.actions.ts`, `enduser.actions.ts`, etc.) and are later used in effects to perform API calls, updating reducers to change the state.

### Effects
- **Purpose:**  
  NgRx effects handle asynchronous operations such as HTTP requests for CRUD operations.
- **Implementation:**  
  Effects (found in the `effects/` folder) use RxJS operators (`switchMap`, `map`, `catchError`) to invoke API services and dispatch success/failure actions.

### Reducers
- **Purpose:**  
  Reducers in the `reducers/` folder update state immutably based on dispatched actions.
- **Implementation:**  
  They are defined using NgRx’s `createReducer` and `on` functions for both admin-user and enduser subdomains.

### Selectors
- **Purpose:**  
  Selectors (in the `selectors/` folder) provide memoized views of the state — for instance, current user lists, selected user details, filter settings, and pagination metadata.
- **Implementation:**  
  They use NgRx `createSelector` to derive slices of the admin-user and enduser state.

### Facades
Facades simplify store interactions by exposing observable state and dispatch methods.

#### AdminUserFacade
- **Observables:**  
  - `adminUsers$`: Emits an array of admin user records.
  - `adminUserFilters$`: Emits current filter criteria.
  - `adminUserRemotePagination$`: Emits pagination metadata.
  - `adminUserRemoteState$`: Emits the status of remote API calls.
- **Methods:**  
  - `createAdminUser(request: CreateAdminUserRequest): void`
  - `getAdminUser(adminUserId: string): void`
  - `updateAdminUser(adminUserId: string, update: UpdateAdminUserRequest): void`
  - `deleteAdminUser(adminUserId: string, force?: boolean): void`
  - `selectAdminUser(adminUserId: string): void`
  - `deselectAdminUser(): void`
  - `updateAdminUserFilters(filters: Partial<AdminUserFilters>, triggerRemoteFetch?: boolean): void`
  - `resetAdminUserFilters(triggerRemoteFetch?: boolean): void`
  - `resetPagination(): void`

#### EnduserFacade
- **Observables:**  
  - `endusers$`: Emits a list of enduser records.
  - `enduserFilters$`: Emits current filter criteria.
  - `enduserRemotePagination$`: Emits pagination details.
  - `enduserRemoteState$`: Emits the remote API status.
- **Methods:**  
  - `createEnduser(request: CreateEnduserRequest): void`
  - `getEnduser(enduserId: string): void`
  - `updateEnduser(enduserId: string, update: UpdateEnduserRequest): void`
  - `deleteEnduser(enduserId: string, force?: boolean): void`
  - `selectEnduser(enduserId: string): void`
  - `deselectEnduser(): void`
  - `updateEnduserFilters(filters: Partial<EnduserFilters>, triggerRemoteFetch?: boolean): void`
  - `resetEnduserFilters(triggerRemoteFetch?: boolean): void`
  - `resetPagination(): void`

Additional facades exist for managing subfeatures such as admin-user devices, emails, credentials, and enduser phones, sessions, etc.

---

## Accessors

The library provides accessors to simplify working with tokens and other computed data. For example, the `admin-user.access-token.accessor.ts` exports helper functions to retrieve and update admin user access tokens from state or storage.

---

## API Routes & Configuration

API route definitions are located in the `api-routes/` folder and consolidate endpoints for both admin-user and enduser operations.

- **Admin-User API Routes:**  
  Define endpoints for creating, retrieving, updating, and deleting admin users as well as sub-resources (credentials, devices, emails, sessions, activity).
- **Enduser API Routes:**  
  Include endpoints for address, credential, device, email, phone, session, and activity operations.
- **Configuration:**  
  API configuration tokens (such as `CDP_USERS_API_CONFIG` and `CDP_USERS_API_BASE_URL`) are defined in the `config/` folder to allow environment-specific behavior (e.g. switching between local and remote endpoints).

---

## Services

The library provides several layers of API services:

### Live API Services
- **AdminUserLiveAPIService:**  
  Implements methods to perform HTTP calls for admin user operations (create, get, list, update, delete).  
  Example method:
  - `createAdminUser(request: Model.CreateAdminUserRequest): Observable<Model.AdminUserResponse>`
- **EnduserLiveAPIService:**  
  Provides live HTTP implementations for enduser operations including addresses, credentials, devices, emails, phones, sessions, and activity.
  
### Mock API Services
- **AdminUserMockAPIServices:**  
  Simulates backend responses for admin user operations using predefined mock data.
- **EndUserMockAPIServices:**  
  Simulates API responses for enduser operations.
  
### Abstract API Services & Tokens
Abstract interfaces (e.g. `AdminUserAPIService` and `EnduserAPIService`) are defined in the `services/abstract` folder. Injection tokens (such as `ADMIN_USER_API_SERVICE` and `ENDUSER_API_SERVICE`) allow the application to switch between live and mock implementations based on configuration.

---

## Components

The CDP‑Users library declares a rich set of reusable UI components for managing user data. These include:

- **Admin User Components:**  
  - `AdminUserListComponent`: Displays a paginated table of admin users with filtering and sorting.
  - `AdminAccountDevicesComponent`: Manages device information for an admin user.
  - `AdminAccountEmailComponent`: Handles email addresses.
  - Additional components for credentials, sessions, activity, and details.
- **Enduser Components:**  
  - `EnduserListComponent`: A list component for endusers with paginated tables, filter inputs, and sort options.
  - Components for account details such as `EnduserAccountDevicesComponent`, `EnduserAccountCommunicationsComponent`, etc.
- **Audience Components:**  
  - `AudienceListComponent`: Provides an aggregated view of audiences with filtering and selection capabilities.
  
Components utilize Angular Material elements, responsive layouts (using Flex Layout) and connect to facades for state data.

---

## Building and Usage

1. **Building the Library:**
    ```sh
    nx build cdp.users
    ```
2. **Running Tests:**
    ```sh
    nx test cdp.users
    ```
3. **Usage in an Angular Project:**
    Import the module in your root module:
    ```typescript
    import { CDPUsersModule } from '@zwp/cdp.users';

    @NgModule({
      imports: [
        CDPUsersModule.forRoot({
          remoteBaseUrl: 'https://api.remote.example.com',
          localBaseUrl: 'http://localhost:3000',
          apiState: ModuleAPIState.LIVE, // or ModuleAPIState.MOCK
        }),
        // Other module imports
      ]
    })
    export class AppModule {}
    ```
4. **Integrating with Components and State:**
    Use the provided facades (e.g. AdminUserFacade, EnduserFacade) in your components to dispatch actions and subscribe to state. For example, an admin user list component can use the AdminUserFacade to fetch and display user data in a paginated table.

---

## Conclusion

The **Zastrozzi CDP Users Library** provides a complete, scalable solution for managing both admin and enduser accounts. With comprehensive NgRx state management, shared accessors, well-structured API routes, and a suite of live and mock API services, this library supports robust user management across the CDP suite. Customize its components, facades, and services as our project requirements evolve.
