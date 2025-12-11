---
id: rewards-network.merchant-net
title: Rewards Network - Merchant Management
sidebar_label: Merchant Management
---
# Rewards Network - Merchant Management

[**View on GitHub**]({{ site.repo_root_url }}/packages/rewards-network/merchant-net)

This document details the **Zastrozzi Rewards Network Merchant Net Library**. This library is part of the Rewards Network module and provides functionality to manage merchants, their locations, assets, brands, categories, invoices, and more. It leverages NgRx state management, provides abstracted and live API service implementations, a comprehensive set of UI components, and centralized API routes, ensuring modularity and scalability in merchant data management.

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Modules](#modules)
4. [State Management](#state-management)
   - [Identifiers & Actions](#identifiers--actions)
   - [Effects, Reducers & Selectors](#effects-reducers--selectors)
   - [Facades](#facades)
5. [API Routes & Configuration](#api-routes--configuration)
6. [Components](#components)
7. [Services](#services)
8. [Building and Usage](#building-and-usage)
9. [Conclusion](#conclusion)

---

## Overview

The **Rewards Network Merchant Net Library** provides a complete solution for merchant data management within the Rewards Network suite. Its key features include:

- **NgRx State Management:** Handles merchants, locations, assets, brands, categories, invoices, loyalty cards, offers, and more.
- **API Integration:** Abstract and live API services enable seamless communication with backend endpoints.
- **Reusable UI Components:** A rich set of components are available for displaying paginated lists, detailed merchant views, and navigation panels.
- **Flexible Configuration:** API routes and configuration tokens (such as `MERCHANT_NET_API_CONFIG` and `MERCHANT_NET_API_BASE_URL`) allow environment-specific settings.

---

## Directory Structure

A high-level overview of the Rewards Network Merchant Net library layout:

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
    rewards-network.merchant-net.module.ts      // Main Angular module aggregating state, components, services, and API routes.
    rewards-network.merchant-net.ts             // Aggregates exports from state, services, components, and routes.
    +state/
      identifiers.ts                           // Defines namespaced keys and action identifiers.
      index.ts                                 // Re-exports state pieces.
      state.ts                                 // Combines reducers into a central state.
      actions/                                 // Contains NgRx actions for merchant and related domains.
      effects/                                 // Contains NgRx effects to handle asynchronous operations.
      facades/                                 // Exposes high-level facades for state access.
      reducers/                                // Reducers for state transitions.
      selectors/                               // Memoized selectors for accessing state slices.
    api-routes/                                 // Centralized API route definitions (merchant, asset, brand, category, location, etc.).
    components/                                 // Reusable Angular components (merchant list, detail components, windows, etc.).
    config/                                     // Configuration tokens (e.g. MERCHANT_NET_API_CONFIG).
    model/                                      // Shared models, enums, requests, responses, and filters.
    routes/                                     // Angular route definitions for merchant features.
    services/                                   // Contains abstract, live, and mock API service implementations.
```

---

## Modules

### RewardsNetworkMerchantNetModule
- **Purpose:**  
  The main module responsible for bootstrapping merchant management features. It imports common Angular modules along with platform-specific libraries (e.g. ZWPCommonModule, ZWPLayoutModule, ZWPAuthModule) and registers NgRx state and effects.
- **Configuration:**  
  The module exposes a `forRoot()` method, accepting a configuration object (of type `MerchantNetAPIConfig`) to set API endpoints (local and remote) and to determine whether live or mock services should be used.

---

## State Management

The library uses NgRx to manage and centralize state across various merchant domains.

### Identifiers & Actions
- **Identifiers:**  
  Defined in `+state/identifiers.ts`, keys such as `MERCHANT_ACTION_IDENTIFIERS` are used to namespace actions including creating, retrieving, listing, updating, and deleting merchants.
- **Actions:**  
  Actions are organized by domain (merchants, web-locations, loyalty cards, etc.) and defined using NgRx’s `createAction` (with remote action groups for side effects). For example, actions like `createMerchant`, `getMerchant`, `listMerchants`, `updateMerchant`, `deleteMerchant` are defined in files under `+state/actions/`.

### Effects, Reducers & Selectors
- **Effects:**  
  Effects (in `+state/effects/`) listen for dispatched remote actions and trigger API calls. For instance, the `MerchantEffects` class handles merchant creation, listing, updating, and deletion—often navigating to the correct route after successful actions.
- **Reducers:**  
  Reducers (located in `+state/reducers/`) process state transformations in response to actions.
- **Selectors:**  
  Selectors (in `+state/selectors/`) provide memoized access to state slices such as the list of merchants, chosen merchant details, filters, and pagination data.

### Facades

Facades provide an abstraction layer over the NgRx store, exposing observable streams of state data and methods to dispatch actions. They encapsulate the logic for each domain and keep components decoupled from store internals.

#### MerchantFacade
- **Observables:**
  - `merchants$`: Emits an array of merchant records.
  - `selectedMerchant$`: Emits the currently selected merchant, if any.
  - `merchantFilters$`: Emits current filter settings used for querying merchants.
  - `merchantPagination$`: Emits pagination metadata for the merchant list.
  - `merchantRemoteState$`: Emits the remote API call state (e.g. loading, error, success).
- **Methods:**
  - `createMerchant(request: CreateMerchantRequest): void`  
    Dispatches an action to create a new merchant.
  - `getMerchant(merchantId: string): void`  
    Dispatches an action to fetch details for a specific merchant.
  - `listMerchants(filters?: MerchantFilters, pagination?: Partial<PaginationParams>): void`  
    Dispatches an action to retrieve a paginated list of merchants based on provided filters.
  - `updateMerchant(merchantId: string, update: UpdateMerchantRequest): void`  
    Dispatches an action to update an existing merchant's information.
  - `deleteMerchant(merchantId: string, force?: boolean): void`  
    Dispatches an action to delete a merchant, optionally bypassing validations.
  - `selectMerchant(merchantId: string): void`  
    Updates the state to mark a merchant as selected.
  - `deselectMerchant(): void`  
    Clears the currently selected merchant from the state.
  - `updateMerchantFilters(filters: Partial<MerchantFilters>, triggerFetch?: boolean): void`  
    Merges new filter criteria into the state and optionally triggers a new fetch.
  - `resetMerchantPagination(): void`  
    Resets pagination settings to default values.

#### AssetFacade (if applicable)
- **Observables:**
  - `assets$`: Emits a list of asset items associated with merchants.
- **Methods:**
  - `createAsset(request: CreateAssetRequest): void`  
  - `getAsset(assetId: string): void`  
  - `updateAsset(assetId: string, update: UpdateAssetRequest): void`  
  - `deleteAsset(assetId: string): void`  
  *(Each method dispatches the corresponding action concerning merchant assets.)*

#### BrandFacade, CategoryFacade & LocationFacade
Each of these facades follows similar patterns:
- **Observables:**  
  Emit arrays of corresponding entities (brands, categories, locations) and possible selected item.
- **Methods:**  
  Provide methods such as `createX`, `getX`, `updateX`, `deleteX`, along with helper methods such as `selectX` and `resetFilters` for the respective domain (where X represents Brand, Category, or Location).

#### InvoiceFacade, LoyaltyFacade, OfferFacade, etc.
For additional domains, facades provide a similar API:
- **Observables:**  
  Stream the list of entities and remote state.
- **Methods:**  
  Expose CRUD operations and utility methods (filter updates, pagination reset, etc.) to manage that domain.


---

## API Routes & Configuration

API routes are centralized under `api-routes/` and aggregate endpoints for all relevant domains:
- **Merchant Routes:**  
  Includes endpoints for creating, fetching, updating, and deleting merchant records.
- **Other Routes:**  
  Separate files exist for asset, brand, category, location, loyalty, offer, and web-location routes.
  
Configuration tokens such as `MERCHANT_NET_API_CONFIG` and `MERCHANT_NET_API_BASE_URL` (defined in the `config/` folder) are used to inject environment-specific settings into the API utilities.

---

The library offers a diverse collection of reusable Angular UI components, organized by feature groups. Each component is designed to work with the corresponding facades and services to ensure state synchronization and smooth UI interactions.

### Merchant Components
- **MerchantListComponent:**  
  - **Description:**  
    Displays a paginated table of merchant records. It offers sorting, filtering, and row-click navigation. It leverages pipes to format dates and transform enum values into human-readable labels.
  - **Key Features:**  
    - Dynamic filtering input fields.
    - Integration with `MerchantFacade` to load and update merchant data.
    - Row selection triggers navigation to the detailed view.
  
- **MerchantDetailRouteComponent:**  
  - **Description:**  
    Renders detailed information for a selected merchant. It displays fields such as name, status, categories, and associated metadata.
  - **Key Features:**  
    - Conditional rendering based on fetched merchant data.
    - Supports update operations via integrated forms.
  
- **CreateMerchantWindowComponent:**  
  - **Description:**  
    A modal or window component that provides a form for creating a new merchant.  
  - **Key Features:**  
    - Form validation and submission handling.
    - Closes automatically upon successful creation.
  
### Asset, Brand, Category & Location Components
- **Asset Components:**  
  - May include components such as *AssetListComponent* which displays a paginated list of merchant assets, and *AssetDetailComponent* for viewing asset details.
- **Brand Components:**  
  - Typically include components to list available brands and display brand details.
- **Category Components:**  
  - Offer a table or grid view of merchant categories with options for editing and deletion.
- **Location Components:**  
  - Designed to render a list of merchant locations along with map integrations or location-based filters.
  
### Loyalty & Invoice Components
- **LoyaltyCardSchemePaginatedListComponent:**  
  - **Description:**  
    Displays a paginated list of loyalty card schemes tied to the merchant.  
  - **Key Features:**  
    - Filter and sort loyalty cards.
    - Uses transformation pipes for currency and date formatting.
- **InvoiceListComponent:**  
  - **Description:**  
    Shows a paginated table of invoices with options for filtering by date, amount, and status.
  - **Key Features:**  
    - Integrated with invoice-related facades.
    - Column definitions include "Invoice Date", "Amount", and "Invoice Status".
  
### Offer & Sector Components
- **OfferComponent(s):**  
  - **Description:**  
    Responsible for displaying current offers associated with merchants. Could be used in both list and grid formats.
  - **Key Features:**  
    - Custom cell templates for highlighting offer details.
  
### Internal Component Export (INTERNAL_COMPONENTS)
- **INTERNAL_COMPONENTS Object:**  
  - **Description:**  
    Aggregates all individual components from the various groups for easy registration.  
  - **Usage:**  
    - Enables a simplified import statement in Angular modules to register all UI components at once.
  
Each component is built to be highly configurable. They accept input properties for state, filters, and display options and emit events corresponding to user interactions (e.g., row click, form submission, or filter change), which are then handled by the corresponding facade methods.

---

## Services

The services layer provides the API client functionality:

- **Live API Services:**  
  Implement real HTTP communication with backend endpoints. Examples include `MerchantLiveAPIService` which implements operations such as `createMerchant`, `getMerchant`, `listMerchants`, `updateMerchant`, and `deleteMerchant`.
- **Mock API Services:**  
  Provide simulated responses for development and testing, following the same API contracts as their live counterparts.
- **Abstract API Services & Tokens:**  
  Abstract interfaces are defined under `services/abstract/` and injection tokens (e.g. `MERCHANT_API_SERVICE`) ensure the correct service implementation (live or mock) is provided based on the module configuration.

---

## Building and Usage

1. **Building the Library:**
    ```sh
    nx build rewards-network.merchant-net
    ```
2. **Running Unit Tests:**
    ```sh
    nx test rewards-network.merchant-net
    ```
3. **Usage in an Angular Project:**
    Import the module into your root module:
    ```typescript
    import { RewardsNetworkMerchantNetModule } from '@zwp/rewards-network.merchant-net';

    @NgModule({
      imports: [
        RewardsNetworkMerchantNetModule.forRoot({
          remoteBaseUrl: 'https://api.remote.example.com',
          localBaseUrl: 'http://localhost:3000',
          apiState: 'live' // or 'mock'
        }),
        // other module imports...
      ]
    })
    export class AppModule {}
    ```
4. **State and Component Integration:**
    Utilize provided facades (e.g. MerchantFacade) in your UI components to dispatch actions and subscribe to state updates. Components such as MerchantListComponent and CreateMerchantWindowComponent interact seamlessly with the state and services layers.

---

## Conclusion

The **Rewards Network Merchant Net Library** offers a complete, scalable solution for managing merchant data within the Rewards Network. With robust NgRx state management, centralized API routes, configurable live and mock services, and a rich set of UI components, the library is designed for maintainability and rapid extension. Customize the components, facades, and services as our project requirements evolve.

Feel free to update or expand this documentation as needed.