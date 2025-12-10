# Zastrozzi Rewards Network Tillo Library Documentation

This document details the **Zastrozzi Rewards Network Tillo Library**. This library is part of the Rewards Network module and provides functionality to manage digital codes, floats, brands, and related financial operations. It leverages NgRx state management, live and mock API service implementations, a comprehensive set of UI components, and centralized API routes, ensuring modularity and scalability in digital code and float management.

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Modules](#modules)
4. [State Management](#state-management)
   - [Identifiers & Actions](#identifiers--actions)
   - [Effects, Reducers & Facades](#effects-reducers--facades)
5. [API Routes & Configuration](#api-routes--configuration)
6. [Components](#components)
7. [Services](#services)
8. [Building and Usage](#building-and-usage)
9. [Conclusion](#conclusion)

---

## Overview

The **Rewards Network Tillo Library** provides a robust solution for managing digital gift codes, float resources, and brand integrations within the Rewards Network suite. Key features include:

- **NgRx State Management:** Centralizes state for digital codes, floats, brands, and other related domains.
- **API Integration:** Provides both live and mock API service implementations for digital code issuance, fulfilment, float retrieval, and brand operations.
- **Reusable UI Components:** Offers a rich set of Angular components for dashboards, paginated lists, detail views, and interactive forms.
- **Flexible Configuration:** Uses configuration tokens (e.g. `TILLO_API_CONFIG` and `TILLO_API_BASE_URL`) to support environment-specific settings.

---

## Directory Structure

A high-level overview of the Tillo library layout (located in `/packages/rewards-network/tillo`):

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
    rewards-network.tillo.module.ts        // Main Angular module aggregating state, components, services, and API routes.
    rewards-network.tillo.ts               // Aggregates exports from state, services, components, and routes.
    +state/
      identifiers.ts                     // Defines namespaced keys and action identifiers (e.g. for digital codes, floats, brands).
      index.ts                           // Re-exports state pieces.
      state.ts                           // Combines reducers into a central state.
      actions/                           // Contains NgRx actions for digital code and float domains.
      effects/                           // Contains NgRx effects to handle asynchronous operations.
      facades/                           // Exposes high-level facades for state access (e.g. TilloDigitalGiftCodeFacade, TilloFloatFacade, TilloBrandFacade).
      reducers/                          // Reducers for processing actions.
      selectors/                         // Memoized selectors for accessing state slices.
    api-routes/                           // Centralized API route definitions for digital code, float, and brand operations.
    components/                           // Reusable Angular components (e.g. TilloHomeComponent, DigitalCodePaginatedListComponent, FloatPaginatedListComponent, BrandPaginatedListComponent).
    config/                               // Configuration tokens and files (e.g. TILLO_API_CONFIG, TILLO_API_BASE_URL).
    model/                                // Shared models, enums, filters, requests, and responses.
    routes/                               // Angular route definitions specific to Tillo features.
    services/                             // Contains abstract, live, and mock API service implementations.
```

---

## Modules

### RewardsNetworkTilloModule
- **Purpose:**  
  The Tillo module bootstraps digital code and float management. It aggregates NgRx state, routing, UI components, and API services to provide a cohesive solution for managing digital gift codes, floats, and brand integrations.
- **Setup:**  
  Defined in `rewards-network.tillo.module.ts`, it imports essential Angular modules (e.g. `CommonModule`, platform-specific modules such as `ZWPCommonModule`, `ZWPAuthModule`, and analytics modules), registers state via NgRx, and declares its UI components.
- **Configuration:**  
  The module exposes a `forRoot()` method that accepts a configuration object (of type `TilloAPIConfig`) to set API endpoints (local and remote) and to determine whether live or mock services should be used.

---

## State Management

The library leverages NgRx to manage state for digital gift codes, floats, and brands.

### Identifiers & Actions
- **Identifiers:**  
  Defined in `+state/identifiers.ts`, identifiers such as `TILLO_ACTION_IDENTIFIER`, `DIGITAL_CODE_STATE_FEATURE_KEY`, `FLOAT_STATE_FEATURE_KEY`, and `BRAND_STATE_FEATURE_KEY` are used to namespace actions.
- **Actions:**  
  Actions are organized by domain and include:
  - **Digital Code Actions:**  
    Actions like `getDigitalCodes`, `listDigitalCodes`, `issueDigitalCode`, `issueDigitalCodeWithPersonalisation`, and `issueDigitalCodeTilloFulfilment`.
  - **Float Actions:**  
    Actions including `getFloat`, `listFloats`, `deleteFloat`, and `assignFloatToBrand`.
  - **Brand Actions:**  
    Actions such as `listBrands`, `getBrand`, `refreshBrands`, `deleteBrand`, `restoreBrand`, and assignment operations.

### Effects, Reducers & Facades
- **Effects:**  
  Effects (in `+state/effects/`) listen for dispatched actions and trigger API calls. For example, `TilloDigitalGiftCodeEffects` handles remote calls for issuing and managing digital codes, while `TilloFloatEffects` manages float retrieval and deletion.
- **Reducers & Selectors:**  
  Reducers (located in `+state/reducers/`) update state in response to actions. Selectors (in `+state/selectors/`) offer memoized access to slices of state like a list of digital codes or current float data.
- **Facades:**  
  Facades abstract store interaction and expose observables and methods for each domain:
  - **TilloDigitalGiftCodeFacade:**  
    Provides streams such as `digitalCodes$`, `selectedDigitalCode$`, and methods like `issueDigitalCode(request)`, `listDigitalCodes(digitalCodeId, pagination)`, `deleteDigitalCode(digitalCodeId)`, etc.
  - **TilloFloatFacade:**  
    Exposes observables such as `floats$`, `selectedFloat$`, and methods like `getFloat(floatId)`, `listFloats(floatId, pagination)`, `deleteFloat(floatId)`, `updateFloatFilters(filters, triggerRemoteFetch)`, and `resetPagination()`.
  - **TilloBrandFacade:**  
    Manages brand-related state; provides methods to list, get, refresh, and administer brand assignments.

---

## API Routes & Configuration

API routes for the Tillo library are defined under the `api-routes/` folder. These routes aggregate endpoints for:
- **Digital Code Operations:**  
  Routes to fetch, list, issue, and manage digital gift codes.
- **Float Operations:**  
  Routes to retrieve, delete, and assign floats.
- **Brand Operations:**  
  Routes to list, get, refresh, delete, and manage brand assignments.

Configuration tokens defined in `config/` (such as `TILLO_API_CONFIG` and `TILLO_API_BASE_URL`) manage environment-specific endpoints and settings.

---

## Components

The Tillo library provides a variety of reusable Angular components grouped by feature domain:

- **TilloHomeComponent:**  
  - **Description:**  
    Serves as the landing page for Tillo features, offering an overview and navigation to digital code, float, and brand management.
  - **Key Features:**  
    - Integrated with tabbed navigation panels.
    - Displays key metrics and links to detailed views.

- **Digital Code Components:**  
  - *DigitalCodePaginatedListComponent:*  
    Displays a paginated table of digital gift codes with sorting, filtering, and status indicators.
  - *DigitalCodeDetailComponent:*  
    Provides a detailed view of a selected digital gift code, including issuance details and fulfilment status.
  
- **Float Components:**  
  - *FloatPaginatedListComponent:*  
    Renders a table of floats with pagination, filtering, and dynamic operations (e.g., deletion, assignment).
  - *FloatDetailComponent:*  
    Shows detailed information for a selected float, including timestamps and associated brand data.
  
- **Brand Components:**  
  - *BrandPaginatedListComponent:*  
    Lists brands with options to sort, filter, and manage brand metadata.
  - *BrandDetailComponent:*  
    Offers a detailed view of brand information along with associated digital codes or floats.
  
- **Internal Components Export:**  
  - An `INTERNAL_COMPONENTS` object aggregates all individual components (as defined in `components/index.ts`) to enable a streamlined import into Angular modules.

Each component is designed to work seamlessly with the corresponding facades and services to ensure real-time state synchronization and data integrity.

---

## Services

The services layer implements API communication for Tillo operations.

### Live API Services
- **TilloDigitalCodeLiveAPIService:**  
  Implements real HTTP requests for digital code operations (get, list, issue, fulfil, top-up, etc.) by constructing appropriate endpoints via the API routes.
- **TilloFloatLiveAPIService:**  
  Implements live API calls for float management, including retrieval, deletion, and brand assignment.
- **TilloBrandLiveAPIService:**  
  Provides live APIs for brand operations such as listing and refreshing brands.

### Mock API Services
Mock services simulate backend responses for development and testing. They adhere to the same interface contracts as the live services.

### Abstract API Services & Tokens
Abstract service definitions reside in the `services/abstract/` folder, ensuring a consistent API contract. Injection tokens (e.g. `DIGITAL_CODE_API_SERVICE`, `FLOAT_API_SERVICE`, `BRAND_API_SERVICE`) determine whether to use live or mock implementations based on the configuration provided.

---

## Building and Usage

1. **Building the Library:**
    ```sh
    nx build rewards-network.tillo
    ```
2. **Running Unit Tests:**
    ```sh
    nx test rewards-network.tillo
    ```
3. **Usage in an Angular Project:**
    Import the module into your root module:
    ```typescript
    import { RewardsNetworkTilloModule } from '@zwp/rewards-network.tillo';

    @NgModule({
      imports: [
        RewardsNetworkTilloModule.forRoot({
          remoteBaseUrl: 'https://api.remote.example.com',
          localBaseUrl: 'http://localhost:3000',
          apiState: 'live' // or 'mock'
        }),
        // other modules...
      ]
    })
    export class AppModule {}
    ```
4. **State and Component Integration:**
    Use the provided facades (such as TilloDigitalGiftCodeFacade, TilloFloatFacade, and TilloBrandFacade) in your components to dispatch actions and subscribe to state changes for dynamic UI updates.

---

## Conclusion

The **Rewards Network Tillo Library** offers a comprehensive and scalable solution for managing digital gift codes, floats, and brand data within the Rewards Network. With robust NgRx state management, flexible API integrations, a rich set of UI components, and environment-specific configuration, this library is well-suited to meet the evolving needs of modern financial services applications. Customize and extend the components, facades, and services as our project requirements evolve.