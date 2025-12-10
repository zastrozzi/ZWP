---
id: ukgov.hmrc
title: UK Government - HMRC
sidebar_label: HMRC UK
---
# Zastrozzi UKGov‑HMRC Library Documentation

This document details the **Zastrozzi UKGov‑HMRC Library**. This library is designed to integrate HMRC-related functionality into the Zastrozzi suite. It leverages NgRx state management to manage data for occupations, industries, and other HMRC-specific entities. The library exposes abstracted and live API service implementations, reusable UI components, and centralized API routes to ensure scalable and maintainable integration with HMRC systems.

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

The **UKGov‑HMRC Library** provides a comprehensive framework for managing HMRC data such as occupation and industry details (e.g. EIM32712 occupations). Key features include:

- **NgRx State Management:**  
  Centralizes state for occupation and industry domains with actions, effects, reducers, selectors, and facades.
- **API Integration:**  
  Abstracted API services (both live and mock) handle communication with HMRC endpoints (e.g. for listing, creating, and deleting occupations).
- **Reusable UI Components:**  
  A collection of components (like occupation list and creation windows) to display and manage HMRC data.
- **Flexible Configuration:**  
  Centralized API routes and configuration tokens (e.g. `UKGOV_HMRC_API_CONFIG` and `UKGOV_HMRC_API_BASE_URL`) allow for environment-specific settings.

---

## Directory Structure

A high-level overview of the UKGov‑HMRC library layout:

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
    ukgov-hmrc.module.ts         // Main Angular module that aggregates state, components, and services.
    ukgov-hmrc.ts                // Aggregates exports from state, routes, components, and services.
    +state/
      identifiers.ts           // Defines namespaced keys such as UKGOV_HMRC_ACTION_IDENTIFIER, EIM32712_OCCUPATION_STATE_FEATURE_KEY, etc.
      index.ts                 // Re-exports state pieces.
      state.ts                 // Combines reducers for HMRC domains into a central state.
      actions/                 // Contains NgRx actions for EIM32712 occupation and industry domains.
      effects/                 // Contains NgRx effects to handle asynchronous operations.
      facades/                 // Exposes high-level facades (e.g. EIM32712OccupationFacade) for state access.
      reducers/                // Reducers that process state transitions.
      selectors/               // Memoized selectors for retrieving HMRC state slices.
    api-routes/                 // Centralized API route definitions for HMRC endpoints (e.g. eim-32712.routes.ts).
    components/                 // Reusable Angular components (e.g. occupation list, create occupation window, HMRC home).
    config/                     // Configuration tokens and files (e.g. UKGOV_HMRC_API_CONFIG, UKGOV_HMRC_API_BASE_URL).
    model/                      // Shared models, enums, filters, requests, and responses.
    routes/                     // Angular route definitions for HMRC feature areas.
    services/                   // Contains abstract, live, and mock API service implementations.
```

---

## Modules

### UKGovHMRCModule
- **Purpose:**  
  The main Angular module that bootstraps HMRC integration. It declares and exports HMRC components, registers NgRx state, and provides API service providers.
- **Setup:**  
  Defined in `ukgov-hmrc.module.ts`, the module imports Angular essentials (e.g. `CommonModule`), as well as platform modules like `ZWPCommonModule`, `ZWPLayoutModule`, and `ZWPAuthModule`. It also integrates analytics via Google Analytics modules.
- **Configuration:**  
  The module exposes a `forRoot()` method that accepts a configuration object (of type `UKGovHMRCAPIConfig`). This enables setting API endpoints (local and remote) and determining whether to use live or mock API service implementations.

---

## State Management

The library leverages NgRx to provide robust state management for HMRC-specific domains.

### Identifiers & Actions
- **Identifiers:**  
  Located in [identifiers.ts](packages/ukgov/hmrc/src/lib/+state/identifiers.ts), identifiers such as `UKGOV_HMRC_ACTION_IDENTIFIER`, `EIM32712_OCCUPATION_STATE_FEATURE_KEY`, and `EIM32712_INDUSTRY_STATE_FEATURE_KEY` namespace HMRC actions.
- **Actions:**  
  Defined in the `+state/actions/` folder (e.g. in `eim-32712.occupation.actions.ts`), actions exist to:
  - Create, retrieve, list, update, and delete occupations.
  - Manage industry-specific operations related to HMRC deducations.

### Effects, Reducers & Selectors
- **Effects:**  
  Effects in `+state/effects/` (e.g. `EIM32712OccupationEffects`) listen to dispatched actions and trigger API calls using live or mock services.
- **Reducers:**  
  Reducers (in `+state/reducers/`) update the HMRC state upon action dispatches.
- **Selectors:**  
  Selectors (in `+state/selectors/`) provide memoized access to HMRC state slices (for example, retrieving occupation lists or current remote API states).

### Facades
Facades abstract direct store access and expose clean APIs for UI components. For example:

#### EIM32712OccupationFacade
- **Observables:**
  - `occupations$`: Emits all retrieved occupation records.
  - `occupationFilters$`: Emits current filter settings.
  - `occupationIndustryFilters$`: Emits industry filter details.
  - `occupationRemotePagination$`: Emits pagination metadata.
  - `occupationRemoteState$`: Emits the state of remote API calls (loading, error, success).
- **Methods:**  
  Facade methods (not all necessarily listed in code snippets) typically include:
  - `createOccupation(...)`
  - `getOccupation(occupationId: string)`
  - `listOccupations(pagination?: Partial<PaginationParams<Model.EIM32712OccupationResponse>>)`
  - `updateOccupation(occupationId: string, update: UpdateEIM32712OccupationRequest)`
  - `deleteOccupation(occupationId: string)`
  - `selectOccupation(occupationId: string)`
  - `deselectOccupation()`
  - `updateOccupationFilters(filters: Partial<OccupationFilters>, triggerRemoteFetch?: boolean)`
  - `resetOccupationPagination()`

Additional facades for other HMRC domains (e.g. industries) are defined similarly.

---

## API Routes & Configuration

API routes for HMRC integration are centralized in the `api-routes/` folder. For example:
- **EIM32712 Routes:**  
  Defined in files such as `eim-32712.routes.ts`, which provide endpoints for occupation and industry-related operations.
- **Configuration:**  
  Configuration tokens (found in the `config/` folder) like `UKGOV_HMRC_API_CONFIG` and `UKGOV_HMRC_API_BASE_URL` manage endpoint settings and enable environment-specific behavior.

---

## Components

The library offers a suite of reusable Angular components designed to manage HMRC data.

- **HMRCHomeComponent:**  
  - **Description:**  
    Serves as the landing page for HMRC functionality. It typically displays an overview heading (e.g. “HMRC”) and links to feature-specific views.
  
- **Occupation Components:**  
  - *OccupationListComponent:*  
    Displays a paginated table of occupations including filtering (using filter chip inputs) and row selection. Integrated with the `EIM32712OccupationFacade` to drive state.
  - *CreateOccupationWindowComponent:*  
    Presents a modal or window allowing users to create a new occupation record.
  
- **Industry Components:**  
  Components for displaying industry-related information (e.g. lists) are exposed via the industries folder and aggregated in the `INTERNAL_COMPONENTS` export.
  
- **Internal Component Export:**  
  The library aggregates components (e.g. HMRCHomeComponent, OccupationListComponent, CreateOccupationWindowComponent, and industry components) into an `INTERNAL_COMPONENTS` object for streamlined registration.

Each component is built to be highly configurable, accepting inputs for data, filtering, and display options, and emitting events to trigger facade methods.

---

## Services

The service layer implements API client functionality for HMRC operations.

### Live API Services
- **EIM32712LiveAPIService:**  
  Implements HTTP operations (GET, POST, DELETE, etc.) for HMRC occupations using real backend endpoints. It constructs request parameters (via helper methods such as `serialiseDateQueryFilter`) and uses the injected configuration tokens.
  
### Mock API Services
- **EIM32712MockAPIService:**  
  Simulates API responses for HMRC operations, enabling easier development and testing.

### Abstract API Services & Tokens
Abstract API interfaces reside in the `services/abstract/` folder. An injection token such as `EIM32712_API_SERVICE` ensures that the correct service (live vs. mock) is provided based on the configuration chosen in the module’s `forRoot()` method.

---

## Building and Usage

1. **Building the Library:**
    ```sh
    nx build ukgov.hmrc
    ```
2. **Running Unit Tests:**
    ```sh
    nx test ukgov.hmrc
    ```
3. **Usage in an Angular Project:**
    Import the module in your Angular root module as follows:
    ```typescript
    import { UKGovHMRCModule } from '@zwp/ukgov.hmrc';

    @NgModule({
      imports: [
        // Other module imports
        UKGovHMRCModule.forRoot({
          remoteBaseUrl: 'https://api.remote.example.com',
          localBaseUrl: 'http://localhost:3000',
          apiState: 'live' // or 'mock'
        })
      ]
    })
    export class AppModule {}
    ```
4. **Component and State Integration:**
    Use the provided facades (e.g. `EIM32712OccupationFacade`) within your components (like `OccupationListComponent`) to dispatch actions and subscribe to HMRC state updates.

---

## Conclusion

The **UKGov‑HMRC Library** provides a scalable and modular solution for integrating HMRC functionalities into the Zastrozzi suite. With robust NgRx state management, centralized API routes and configuration, a comprehensive set of live/mock API services, and flexible UI components, this library is designed for maintainability and rapid extension. Customize the components, facades, and services as your project needs evolve.

Feel free to update or expand this documentation as required.