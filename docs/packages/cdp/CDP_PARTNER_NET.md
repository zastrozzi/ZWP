---
id: cdp.partner-net
title: Customer Data Platform - Partner Network
sidebar_label: Partner Network
---
# Customer Data Platform - Partner Network

[**View on Github**]({{ site.repo_root_url }}/packages/cdp/partner-net)

This document details the **cdp.partner‑net** library. This library is part of the Zastrozzi CDP suite and provides functionality for managing partner data, subscriptions, types, assets, and subgroup assignments. It leverages NgRx for state management (with actions, effects, reducers, selectors, and facades), exposes API routes and configuration tokens, and offers a set of reusable UI components and abstracted API service implementations (both live and mock). Detailed facades give you a high‑level API to interact with partner data, while API services (using Angular’s HttpClient) target live REST endpoints.

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
     - [Detailed Facades and Their Methods](#detailed-facades-and-their-methods)
5. [API Routes & Configuration](#api-routes--configuration)
6. [Models & Enums](#models--enums)
7. [Services](#services)
   - [Live API Services](#live-api-services)
   - [Abstract API Services & Tokens](#abstract-api-services--tokens)
7. [Components](#components)
8. [Building and Usage](#building-and-usage)
9. [Conclusion](#conclusion)

---

## Overview

The **cdp.partner‑net** library provides partner‑related features including creation, retrieval, update, deletion, and subscription management. Key features include:

- **NgRx State Management:** Provides a comprehensive state engine for partners using actions, effects, reducers, selectors, and facades.
- **API Integration:** Implements live API services for partners, partner types, and enduser subscriptions. Configuration tokens (e.g. [CDP_PARTNER_NET_API_CONFIG](#api-routes--configuration)) help switch endpoints between local and remote environments.
- **Facades:** Abstract the complexity of NgRx. Facades such as `PartnerNetPartnerFacade`, `PartnerNetPartnerTypeFacade`, and `PartnerNetPartnerEnduserSubscriptionFacade` expose methods like create, update, list, select, and delete.
- **UI Components:** Reusable components (for example, the partner paginated list) are provided to render partner data with integrated filtering, sorting, and pagination.
- **API Routes:** Centralized route definitions are available for partners, assets, endusers, and more.
- **Modularity:** The library is built as an Nx project with its own module (`CDPPartnerNetModule`), configuration, and environment providers.

---

## Directory Structure

A high-level directory structure for the library (located in [`/packages/cdp/partner-net`]({{ site.repo_root_url }}/packages/cdp/partner-net)) is as follows:

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
    cdp.partner-net.module.ts
    cdp.partner-net.ts
    +state/
      identifiers.ts
      index.ts
      state.ts
      actions/
        // e.g. partner.actions.ts, partner-type.actions.ts, partner-enduser-subscription.actions.ts, etc.
      effects/
        // e.g. partner.effects.ts, partner-type.effects.ts, partner-enduser-subscription.effects.ts, partner-type-assignment.effects.ts, etc.
      reducers/
        // Reducers for partner, partner-type, subscriptions, etc.
      selectors/
        // Selectors for filtering and state retrieval.
      facades/
        // Detailed facades like PartnerNetPartnerFacade, PartnerNetPartnerTypeFacade, PartnerNetPartnerEnduserSubscriptionFacade, etc.
    api-routes/
      api-routes.ts
      asset.routes.ts
      enduser.routes.ts
      partner.routes.ts
      partner-type.routes.ts
      // Other route files...
    components/
      // UI components for partner lists, paginated tables, etc.
    config/
      cdp.partner-net.api-config.ts
      // Other configuration files.
    model/
      // Models, filters, requests, responses, and enums.
    routes/
      // Angular routing definitions if available.
    services/
      // Live and mock API service implementations.
```

---

## Modules

### CDPPartnerNetModule
- **Purpose:**  
  The main Angular module that bootstraps the partner‑net functionality.
- **Setup:**  
  Defined in `cdp.partner-net.module.ts`, it imports common Angular modules along with `ZWPCommonModule`, `ZWPLayoutModule`, `ZWPAuthModule`, and `CDPUsersModule`. It declares all internal components (exported via `INTERNAL_COMPONENTS`) and provides all state facades (exported from the +state/facades folder).
- **Configuration:**  
  The module’s static `forRoot()` method accepts a configuration object of type `CDPPartnerNetAPIConfig` and registers providers for API tokens (e.g. [CDP_PARTNER_NET_API_CONFIG](#api-routes--configuration) and [CDP_PARTNER_NET_API_BASE_URL](#api-routes--configuration)).

---

## State Management

### Identifiers & State Assembly

**Identifiers:**  
Defined in [identifiers.ts]({{ site.repo_root_url }}/packages/cdp/partner-net/src/lib/+state/identifiers.ts), these include:
- `CDP_COMMON_ACTION_IDENTIFIER` (often used as a prefix)
- `PARTNER_STATE_FEATURE_KEY`
- `PARTNER_TYPE_STATE_FEATURE_KEY`
- `PARTNER_ENDUSER_SUBSCRIPTION_STATE_FEATURE_KEY`
- etc.

**State Assembly:**  
The state is assembled by combining reducers (exported via `state.ts`) to create a single state slice. This central state is then accessed through selectors.

### Actions

The partner‑net library defines actions for every domain. Here is a complete breakdown:

#### Partner Actions (in e.g. partner.actions.ts)
- **createPartner**  
  **Description:** Initiates the creation of a partner record.  
  **Payload:**  
  • `request: CreatePartnerRequest` – Object containing new partner data.  
  **Example:**  
  ```ts
  createPartner({ request: { name: 'New Partner', status: 'active', ... } })
  ```
- **getPartner**  
  **Description:** Triggers fetching the details of a specific partner by ID.  
  **Payload:**  
  • `partnerId: string`  
  **Example:**  
  ```ts
  getPartner({ partnerId: 'partner123' })
  ```
- **listPartners**  
  **Description:** Requests a list of partners, supporting filters like pagination and sorting.  
  **Payload:**  
  • `parentId?: string`  
  • `parentType?: 'partnerType' | 'asset' | 'enduser' | 'none'`  
  • `pagination?: Partial<PaginatedQueryParams<PartnerResponse>>`  
  **Example:**  
  ```ts
  listPartners({ parentId: 'parent123', pagination: { page: 1, pageSize: 20 } })
  ```
- **updatePartner**  
  **Description:** Dispatches an update for a partner record.  
  **Payload:**  
  • `partnerId: string`  
  • `update: UpdatePartnerRequest`  
  **Example:**  
  ```ts
  updatePartner({ partnerId: 'partner123', update: { status: 'inactive' } })
  ```
- **deletePartner**  
  **Description:** Removes a partner record. Optionally accepts a `force` flag to bypass validations.  
  **Payload:**  
  • `partnerId: string`  
  • `force?: boolean`  
  **Example:**  
  ```ts
  deletePartner({ partnerId: 'partner123', force: true })
  ```

#### Partner Type Actions (in e.g. partner-type.actions.ts)
- **createPartnerType**  
  **Description:** Initiates the creation of a partner type.  
  **Payload:**  
  • `request: CreatePartnerTypeRequest`  
  **Example:**  
  ```ts
  createPartnerType({ request: { typeName: 'Preferred' } })
  ```
- **getPartnerType**  
  **Description:** Fetches details for a given partner type.  
  **Payload:**  
  • `partnerTypeId: string`  
  **Example:**  
  ```ts
  getPartnerType({ partnerTypeId: 'type123' })
  ```
- **listPartnerTypes**  
  **Description:** Requests a filtered, paginated list of partner types.  
  **Payload:**  
  • `parentId?: string`  
  • `parentType?: 'partner' | 'none'`  
  • `pagination?: Partial<PaginatedQueryParams<PartnerTypeResponse>>`  
  **Example:**  
  ```ts
  listPartnerTypes({ parentType: 'none', pagination: { page: 1, pageSize: 10 } })
  ```
- **updatePartnerType**  
  **Description:** Updates details of an existing partner type.  
  **Payload:**  
  • `partnerTypeId: string`  
  • `update: UpdatePartnerTypeRequest`  
  **Example:**  
  ```ts
  updatePartnerType({ partnerTypeId: 'type123', update: { typeName: 'Updated Type' } })
  ```
- **deletePartnerType**  
  **Description:** Deletes a partner type by its ID.  
  **Payload:**  
  • `partnerTypeId: string`  
  **Example:**  
  ```ts
  deletePartnerType({ partnerTypeId: 'type123' })
  ```

#### Partner Enduser Subscription Actions (in e.g. partner-enduser-subscription.actions.ts)
- **createPartnerEnduserSubscription**  
  **Description:** Initiates creation of a subscription linking an enduser to a partner.  
  **Payload:**  
  • `request: CreateSubscriptionRequest`  
  **Example:**  
  ```ts
  createPartnerEnduserSubscription({ request: { partnerId: 'partner123', enduserId: 'user456', plan: 'premium' } })
  ```
- **getPartnerEnduserSubscription**  
  **Description:** Fetches the details of a specific partner subscription.  
  **Payload:**  
  • `subscriptionId: string`  
  **Example:**  
  ```ts
  getPartnerEnduserSubscription({ subscriptionId: 'subs789' })
  ```
- **listPartnerEnduserSubscriptions**  
  **Description:** Retrieves a list of subscriptions filtered by partner or enduser.  
  **Payload:**  
  • Optional identifiers and pagination.  
  **Example:**  
  ```ts
  listPartnerEnduserSubscriptions({ partnerId: 'partner123', pagination: { page: 1, pageSize: 15 } })
  ```
- **updatePartnerEnduserSubscription / deletePartnerEnduserSubscription**  
  **Description:** Dispatches update or deletion events for subscriptions.  
  **Payload:**  
  • Corresponding IDs and update requests or flags.  
  **Example:**  
  ```ts
  updatePartnerEnduserSubscription({ subscriptionId: 'subs789', update: { plan: 'standard' } })
  ```

Each action follows standard NgRx conventions (using `createAction`) and is organized under remote and local action groups.

### Effects

Effects listen for remote and local actions and trigger asynchronous API calls. They typically use:
- **createRemoteEffect:** Provided by `@zwp/platform.common` to simplify remote API calls.
- **Operators:** `switchMap`, `map`, `catchError`, `debounceTime`, and `withLatestFrom`.

Examples include:
- **Partner Effects:**  
  In `partner.effects.ts`, effects such as `createPartner$`, `getPartner$`, `listPartners$`, `updatePartner$`, and `deletePartner$` call corresponding API services from `PartnerLiveAPIService`.
- **Partner Type Effects:**  
  In `partner-type.effects.ts`, manage creation, retrieval, listing, and updating of partner types.
- **Partner Enduser Subscription Effects:**  
  Similar structure for handling subscription actions.

### Reducers

Reducers update state slices in response to dispatched actions. Common features:
- **Immutable Updates:**  
  Use NgRx `createReducer` and `on` to modify state immutably.
- **Separate Domains:**  
  Separate reducers for partner, partner type, and subscription state.
- **Error Handling:**  
  Update state with error flags on remote failure.

### Selectors

Selectors provide memoized access to state slices. They include:
- **PartnerSelectors:**  
  For selecting all partners, filtered partners, the selected partner, partner remote state, and pagination details.
- **PartnerTypeSelectors:**  
  For partner type filters, lists, selected partner type, and remote state.
- **SubscriptionSelectors:**  
  For subscription listings, filters, and remote state related to enduser subscriptions.

### Facades

Facades abstract NgRx interactions and provide a simple API to components. They encapsulate dispatching actions and exposing selectors via observables.

#### PartnerNetPartnerFacade (in e.g. partner.facade.ts)
- **Observables:**
  - `partners$`: Emits an array of all partner records.
  - `paginatedFilteredPartners$`: Emits partners after applying filters and pagination.
  - `partnerFilters$`: Emits current filter criteria.
  - `partnerRemotePagination$`: Emits remote pagination metadata.
  - `partnerRemoteState$`: Emits the state of the remote API call (loading, error, success, etc.).
- **Methods:**
  - **createPartner(request: CreatePartnerRequest): void**  
    Dispatches a create action with the provided partner data.
  - **getPartner(partnerId: string): void**  
    Dispatches an action to fetch details for the specified partner.
  - **listPartners(parentId?: string, parentType?: 'partnerType' | 'asset' | 'enduser' | 'none', pagination?: Partial<PaginatedQueryParams<PartnerResponse>>): void**  
    Dispatches a list action that can apply filter criteria and pagination.
  - **updatePartner(partnerId: string, update: UpdatePartnerRequest): void**  
    Dispatches an update action with modified partner information.
  - **deletePartner(partnerId: string, force?: boolean): void**  
    Dispatches a delete action; the optional force flag bypasses certain checks.
  - **selectPartner(partnerId: string): void**  
    Updates state to mark the partner as selected.
  - **deselectPartner(): void**  
    Clears any current partner selection.
  - **updatePartnerFilters(filters: Partial<PartnerFilters>, triggerRemoteFetch?: boolean): void**  
    Merges new filter criteria into state and optionally triggers data retrieval.
  - **resetPartnerFilters(triggerRemoteFetch?: boolean): void**  
    Resets the filters to their default values and may trigger a new fetch.
  - **resetPagination(): void**  
    Resets pagination settings to default values.

#### PartnerNetPartnerTypeFacade (in e.g. partner-type.facade.ts)
- **Observables:**
  - `partnerTypes$`: Emits all partner types.
  - `paginatedFilteredPartnerTypes$`: Emits filtered and paginated lists of partner types.
  - `partnerTypeFilters$`: Exposes the current filter settings for partner types.
  - `selectedPartnerType$`: Emits the currently selected partner type.
- **Methods:**
  - **createPartnerType(request: CreatePartnerTypeRequest): void**  
    Dispatches creation action for a new partner type.
  - **getPartnerType(partnerTypeId: string): void**  
    Dispatches an action to retrieve details for a partner type.
  - **listPartnerTypes(parentId?: string, parentType?: 'partner' | 'none', pagination?: Partial<PaginatedQueryParams<PartnerTypeResponse>>): void**  
    Dispatches a list action with optional filtering and pagination.
  - **updatePartnerType(partnerTypeId: string, update: UpdatePartnerTypeRequest): void**  
    Dispatches an update action with the new partner type data.
  - **deletePartnerType(partnerTypeId: string, force?: boolean): void**  
    Dispatches a delete action; the force flag can be used if necessary.
  - **resetPagination(): void**  
    Resets pagination state for partner types.

#### PartnerNetPartnerEnduserSubscriptionFacade (in e.g. partner-enduser-subscription.facade.ts)
- **Observables:**
  - `partnerSubscriptions$`: Emits a list of enduser subscription records.
  - `partnerSubscriptionFilters$`: Emits the current subscription filters.
  - `partnerSubscriptionRemotePagination$`: Emits pagination details for subscriptions.
  - `partnerSubscriptionRemoteState$`: Emits the API call state for subscription actions.
- **Methods:**
  - **createPartnerEnduserSubscription(request: CreateSubscriptionRequest): void**  
    Dispatches an action to create a new partner-enduser subscription.
  - **getPartnerEnduserSubscription(subscriptionId: string): void**  
    Dispatches an action to fetch details of a specific subscription.
  - **listPartnerEnduserSubscriptions(filter?: { partnerId?: string; enduserId?: string }, pagination?: Partial<PaginatedQueryParams<PartnerResponse>>): void**  
    Dispatches an action to list subscriptions based on provided filters.
  - **updatePartnerEnduserSubscription(subscriptionId: string, update: UpdateSubscriptionRequest): void**  
    Dispatches an action to update an existing subscription.
  - **deletePartnerEnduserSubscription(subscriptionId: string, force?: boolean): void**  
    Dispatches a delete action for the subscription.
  - *(Additional helper methods may be implemented to manage selection state similarly to the partner facade.)*

#### Additional Facades
- Other facades (such as for partner asset assignments or subgroup management) follow similar patterns:  
  • They expose observables for the current state (models, filters, pagination, remote state).  
  • Their methods dispatch actions for CRUD operations (create, get/list, update, delete) and additional helper methods (select/deselect, reset filters, etc.).

---

## API Routes & Configuration

The library centralizes route definitions in the `api-routes/` folder.

- **partner.routes.ts:**  
  Contains endpoints for:
  - `createPartner()`
  - `listPartners()`
  - `getPartner(partnerId: string)`
  - `updatePartner(partnerId: string)`
  - `deletePartner(partnerId: string)`
  - It also includes nested routes for asset and enduser routes (e.g. via `assetRoutesForPartner()` and `enduserRoutesForPartner()`).

- **partner-type.routes.ts:**  
  Provides endpoints for partner type CRUD operations.
- **Configuration Tokens:**  
  Defined in `cdp.partner-net.api-config.ts`:
  - `CDP_PARTNER_NET_API_CONFIG`: The configuration object with `remoteBaseUrl` and `localBaseUrl`.
  - `CDP_PARTNER_NET_API_BASE_URL`: Selected based on the global API location.

---

## Models & Enums

Models and types are organized under the `/model` folder and include:
- **Requests:**  
  `CreatePartnerRequest`, `UpdatePartnerRequest`, `CreatePartnerTypeRequest`, `UpdatePartnerTypeRequest`, etc.
- **Responses:**  
  `PartnerResponse`, `PartnerTypeResponse`, `PartnerTypeAssignmentResponse`, etc.
- **Filters:**  
  Models for partner filtering.
- **Enums:**  
  Enumerations for partner status, partner type, subscription status, etc. These are typically defined in `/model/enums`.

---

## Services

The cdp.partner‑net library provides abstract API service definitions and live implementations to interact with live REST endpoints. These services are used by NgRx effects and facades to perform CRUD operations for partners, partner types, and partner enduser subscriptions. In addition, services for subgroup management (such as subgroup and subgroup-enduser subscriptions) are also provided. Below is a detailed description of each live API service.

### Live API Services

#### PartnerLiveAPIService
- **Description:**  
  Provides methods to create, retrieve, list, update, and delete partner records.
- **Methods:**
  - `createPartner(request: Model.CreatePartnerRequest): Observable<Model.PartnerResponse>`  
    • Makes an HTTP POST request to the partner creation endpoint using the provided request payload.
  - `getPartner(partnerId: string): Observable<Model.PartnerResponse>`  
    • Makes an HTTP GET request to retrieve details of the partner identified by `partnerId`.
  - `listPartners(parentId: Nullable<string>, parentType: 'partnerType' | 'none', pagination: Nullable<Partial<PaginatedQueryParams<Model.PartnerResponse>>>, filters: Nullable<Partial<Model.PartnerFilters>>): Observable<PaginatedResponse<Model.PartnerResponse>>`  
    • Constructs HTTP parameters (for pagination, filters, etc.) and makes an HTTP GET request to list partners.
  - `updatePartner(partnerId: string, request: Model.UpdatePartnerRequest): Observable<Model.PartnerResponse>`  
    • Sends an HTTP PATCH request to update the partner's information.
  - `deletePartner(partnerId: string, force: boolean): Observable<void>`  
    • Dispatches an HTTP DELETE request. When `force` is true, additional query parameters are added to override validations.

#### PartnerTypeLiveAPIService
- **Description:**  
  Provides endpoints for managing partner types including creation, retrieval, listing, updating, and deletion. It also supports linking a partner to a given type.
- **Methods:**
  - `createPartnerType(request: Model.CreatePartnerTypeRequest): Observable<Model.PartnerTypeResponse>`  
    • Posts the request payload to create a new partner type.
  - `getPartnerType(partnerTypeId: string): Observable<Model.PartnerTypeResponse>`  
    • Retrieves partner type details for the provided ID.
  - `listPartnerTypes(parentId: Nullable<string>, parentType: 'partner' | 'none', pagination: Nullable<Partial<PaginatedQueryParams<Model.PartnerTypeResponse>>>, filters: Nullable<Partial<Model.PartnerTypeFilters>>): Observable<PaginatedResponse<Model.PartnerTypeResponse>>`  
    • Compiles pagination and filters into HTTP parameters and calls the list endpoint.
  - `updatePartnerType(partnerTypeId: string, update: Model.UpdatePartnerTypeRequest): Observable<Model.PartnerTypeResponse>`  
    • Issues a PATCH request to update the partner type.
  - `deletePartnerType(partnerTypeId: string): Observable<void>`  
    • Sends a DELETE request to remove the partner type.
  - `addPartner(partnerId: string, partnerTypeId: string): Observable<Model.PartnerTypeAssignmentResponse>`  
    • Associates a partner with a partner type.
  - `removePartner(partnerId: string, partnerTypeId: string): Observable<void>`  
    • Disassociates a partner from the partner type.

#### PartnerEnduserSubscriptionLiveAPIService
- **Description:**  
  Manages the creation, retrieval, listing, updating, and deletion of subscriptions linking partner data and endusers.
- **Methods:**
  - `createPartnerEnduserSubscription(request: Model.CreateSubscriptionRequest): Observable<Model.SubscriptionResponse>`  
    • Initiates a subscription creation via an HTTP POST request.
  - `getPartnerEnduserSubscription(subscriptionId: string): Observable<Model.SubscriptionResponse>`  
    • Retrieves subscription details using an HTTP GET request.
  - `listPartnerEnduserSubscriptions(filter: { partnerId?: string; enduserId?: string }, pagination?: Partial<PaginatedQueryParams<Model.SubscriptionResponse>>): Observable<PaginatedResponse<Model.SubscriptionResponse>>`  
    • Lists subscriptions by constructing query parameters for filtering and pagination.
  - `updatePartnerEnduserSubscription(subscriptionId: string, update: Model.UpdateSubscriptionRequest): Observable<Model.SubscriptionResponse>`  
    • Sends an HTTP PATCH request to update an existing subscription.
  - `deletePartnerEnduserSubscription(subscriptionId: string, force: boolean): Observable<void>`  
    • Dispatches an HTTP DELETE request; the `force` flag bypasses certain validations when needed.

### Additional Live API Services

In addition to partner-related services, the library may include services for managing subgroup data and subgroup enduser subscriptions. These are structured similarly to the above services.

#### SubgroupLiveAPIService
- **Description:**  
  Handles operations related to subgroups, such as deletion and querying subgroup data.
- **Methods:**  
  - `deleteSubgroup(subgroupId: string, force: boolean): Observable<void>`  
    • Constructs HTTP parameters (using helpers like `upsertHTTPParam`) and sends an HTTP DELETE request to remove the subgroup.

#### SubgroupEnduserSubscriptionLiveAPIService
- **Description:**  
  Manages the retrieval and manipulation of subgroup enduser subscription data.
- **Methods:**  
  - Methods in this service mirror those of PartnerEnduserSubscriptionLiveAPIService but target subgroup endpoints. For example, it includes:
    - `createSubgroupEnduserSubscription(request: Model.CreateSubgroupSubscriptionRequest): Observable<Model.SubgroupSubscriptionResponse>`
    - `getSubgroupEnduserSubscription(subscriptionId: string): Observable<Model.SubgroupSubscriptionResponse>`
    - `listSubgroupEnduserSubscriptions(filter: { subgroupId?: string; enduserId?: string }, pagination?: Partial<PaginatedQueryParams<Model.SubgroupSubscriptionResponse>>): Observable<PaginatedResponse<Model.SubgroupSubscriptionResponse>>`
    - `updateSubgroupEnduserSubscription(subscriptionId: string, update: Model.UpdateSubgroupSubscriptionRequest): Observable<Model.SubgroupSubscriptionResponse>`
    - `deleteSubgroupEnduserSubscription(subscriptionId: string, force: boolean): Observable<void>`

### Abstract API Services & Tokens

All live services implement abstract API service interfaces defined in the `/services/abstract` folder. Injection tokens (e.g., `PARTNER_API_SERVICE`, `PARTNER_TYPE_API_SERVICE`, etc.) allow the module’s configuration (via the `forRoot()` method in `CDPPartnerNetModule`) to determine whether to use live implementations or mock alternatives.

- **Abstract Classes:**  
  - `PartnerAPIService` defines the API surface for partner operations.
  - `PartnerTypeAPIService` defines the partner type operations.
  - `PartnerEnduserSubscriptionAPIService` defines the subscription operations.
- **Injection Tokens:**  
  - Tokens such as `PARTNER_API_SERVICE` are provided by the module’s providers in the services configuration. Based on the configuration, the appropriate live or mock service is injected.

These services work in conjunction with NgRx effects, which invoke them to drive state changes.

## Components

The library provides UI components grouped by domain:

- **Partner Components:**  
  - `PartnerPaginatedListComponent`:  
    Renders a paginated table displaying partner data. It supports filtering (using a filter chip component), sorting, and pagination. Buttons in each row trigger events like navigation (open partner details), inspector view, and clipboard actions. See [partner.paginated-list.component.ts]({{ site.repo_root_url }}/packages/cdp/partner-net/src/lib/components/partner/partner.paginated-list.component.ts) for details.
- **Asset & Subgroup Components:**  
  Exported via folders such as `asset` and `subgroup` (see the index file in `/components`). These components integrate with their respective facades.
- **Reusable Components:**  
  Other internal components are exported in the INTERNAL_COMPONENTS object (see [components/index.ts]({{ site.repo_root_url }}/packages/cdp/partner-net/src/lib/components/index.ts)), which aggregates asset, partner, and subgroup components.

---

## Building and Usage

1. **Building the Library:**
    ```sh
    nx build cdp.partner-net
    ```
2. **Running Tests:**
    ```sh
    nx test cdp.partner-net
    ```
3. **Usage in an Angular Project:**
    Import the module in your root module:
    ```typescript
    import { CDPPartnerNetModule } from '@zwp/cdp.partner-net';

    @NgModule({
      imports: [
        CDPPartnerNetModule.forRoot({
          remoteBaseUrl: 'https://api.remote.example.com',
          localBaseUrl: 'http://localhost:3000'
        }),
        // other imports...
      ]
    })
    export class AppModule {}
    ```
4. **Interacting with the State:**
    Example usage in a component:
    ```typescript
    import { Component } from '@angular/core';
    import { PartnerNetPartnerFacade } from '@zwp/cdp.partner-net';

    @Component({
      selector: 'app-partner-demo',
      template: `
        <button (click)="createPartner()">Create Partner</button>
        <cdp-partnernet-partner-paginated-list></cdp-partnernet-partner-paginated-list>
      `
    })
    export class PartnerDemoComponent {
      constructor(private partnerFacade: PartnerNetPartnerFacade) {}

      createPartner() {
        const request = { /* populate request with partner data */ };
        this.partnerFacade.createPartner(request);
      }
    }
    ```

---

## Conclusion

The **cdp.partner‑net** library provides a detailed and scalable solution for partner data management within the Zastrozzi CDP ecosystem. With comprehensive NgRx state management (actions, effects, reducers, selectors, and facades), robust live API service integrations, and a suite of reusable UI components, this library enables seamless partner interactions, subscriptions, type assignments, and related workflows.

This documentation is intended as a complete guide for understanding, configuring, and extending the partner‑net functionality. Feel free to update or expand on this documentation as our project requirements evolve.