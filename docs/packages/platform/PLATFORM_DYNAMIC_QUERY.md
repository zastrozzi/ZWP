---
id: platform.dynamic-query
title: Core Platform - Dynamic Query
sidebar_label: Dynamic Query
---
# Core Platform - Dynamic Query

[**View on Github**]({{ site.repo_root_url }}/packages/platform/dynamic-query)

This document details the **platform.dynamic-query** library. This package provides tools for building dynamic queries against structured data. It combines state management, API route definitions, configurable services, and a set of reusable components for rendering query results and query configuration UIs.

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Modules](#modules)
4. [State Management](#state-management)
   - [Actions](#actions)
   - [Effects](#effects)
   - [Reducers](#reducers)
   - [Selectors](#selectors)
   - [Facades](#facades)
5. [API Routes & Configurations](#api-routes--configurations)
6. [Components](#components)
7. [Services](#services)
   - [Live API Services](#live-api-services)
   - [Mock API Services](#mock-api-services)
8. [Building and Usage](#building-and-usage)
9. [Conclusion](#conclusion)

---

## Overview

The **platform.dynamic-query** package is designed to support dynamic query generation and execution. It handles both the client-side query state (including filters, sorting, pagination) using NgRx and provides integration with remote APIs through configurable API routes. This library facilitates queries on structured data including schema tables, columns, relationships, and dynamic filters.

Key features:
- **State Management:** Manages query state with dedicated actions, effects, reducers, facades, and selectors.
- **API Routes:** Centralizes route definitions for various queryable schema endpoints.
- **Components:** Offers UI components such as paginated table views and filter chip inputs to interact with dynamic queries.
- **Services & Configuration:** Provides Live and Mock API services for executing queries, along with configuration tokens (see [dynamic-query.api-config.ts]({{ site.repo_root_url }}/packages/platform/dynamic-query/src/lib/config/dynamic-query.api-config.ts)) that control base URLs for local and remote endpoints.

---

## Directory Structure

A high-level overview of the package layout:

- **Root Files:**  
  - `.eslintrc.json`, `jest.config.ts`, `ng-package.json`, `package.json`, `project.json`
  - Multiple TypeScript configuration files (`tsconfig.json`, `tsconfig.lib.json`, etc.)
  - [README.md]({{ site.repo_root_url }}/packages/platform/dynamic-query/README.md) – Brief summary

- **src/**  
  - `index.ts` – Main entry point that re-exports features from the library.
  - `test-setup.ts` – Initialization for unit tests.
  - **lib/**  
    - `platform.dynamic-query.module.ts` – Main Angular module registration.
    - `platform.dynamic-query.ts` – Aggregates exports for ease of consumption.
    - **+state/** – Contains NgRx state management:
      - `identifiers.ts` – Namespacing for state identifiers.
      - `state.ts` – Combines and provides state slices.
      - Folders for `actions/`, `effects/`, `reducers/`, `selectors/`, `facades/`
    - **api-routes/** – Defines API endpoints and related routes (e.g. `api-routes.ts`, `boolean-filter.routes.ts`, etc.)
    - **components/** – UI components including structured-query and queryable-schema components.
    - **config/** – Configuration files and injection tokens, such as the API configuration ([dynamic-query.api-config.ts]({{ site.repo_root_url }}/packages/platform/dynamic-query/src/lib/config/dynamic-query.api-config.ts)).
    - **model/** – Type definitions and interfaces for queries, filters, schema definitions, etc.
    - **routes/** – Additional route definitions for dynamic query processing.
    - **services/** – Contains service classes for API communication.

---

## Modules

### PlatformDynamicQueryModule
- **Purpose:**  
  Serves as the Angular module for dynamic-query functionality.
- **Setup:**  
  - Imports common modules such as `CommonModule`, `ZWPCommonModule`, `ZWPLayoutModule`, and `ZWPAuthModule`.
  - Declares internal components (e.g. structured-query list, queryable-schema tables).
  - Provides state facades from the +state folder.
- **Configuration:**  
  Exposes a `forRoot(apiConfig: DynamicQueryAPIConfig)` static method to configure the API endpoints and providers:
  ```ts
  import { PlatformDynamicQueryModule } from '@zwp/platform.dynamic-query';
  @NgModule({
    imports: [
      PlatformDynamicQueryModule.forRoot({
        remoteBaseUrl: 'https://api.remote.example.com',
        localBaseUrl: 'http://localhost:3000'
      })
    ]
  })
  export class AppModule {}
  ```

---

## State Management

The package leverages NgRx to manage dynamic query state.

### Actions
- **Location:** [actions/]({{ site.repo_root_url }}/packages/platform/dynamic-query/src/lib/+state/actions/)
- **Purpose:**  
  Define actions for initiating query requests, handling remote fetches (e.g. create, update, delete, list), and managing local state changes (e.g. filter updates, sort changes).
- **Examples:**  
  - `createStructuredQuery`, `getStructuredQuery`, `listStructuredQueries` in [structured-query.actions.ts]({{ site.repo_root_url }}/packages/platform/dynamic-query/src/lib/+state/actions/structured-query.actions.ts)
  - Actions for queryable schema columns and relationships.

### Effects
- **Location:** [effects/]({{ site.repo_root_url }}/packages/platform/dynamic-query/src/lib/+state/effects/)
- **Purpose:**  
  Listen to dispatched actions and perform remote API calls. Effects also handle side effects such as updating remote state.
- **Examples:**  
  - [StructuredQueryEffects]({{ site.repo_root_url }}/packages/platform/dynamic-query/src/lib/+state/effects/structured-query.effects.ts) listens for create, get, list, update, and delete actions.
  - [QueryableSchemaTableEffects]({{ site.repo_root_url }}/packages/platform/dynamic-query/src/lib/+state/effects/queryable-schema.table.effects.ts) for handling table-related remote calls.
  - Effects use helper functions such as `createRemoteEffect`, `remoteStateUpdateRequest`, etc.

### Reducers
- **Location:** [reducers/]({{ site.repo_root_url }}/packages/platform/dynamic-query/src/lib/+state/reducers/)
- **Purpose:**  
  Update state based on actions. Reducers handle query state slices such as structured queries, table data, column data, and filters.
- **Examples:**  
  - The structured query reducer updates stored queries and selected query IDs.
  - Reducers for queryable schema tables update pagination and result sets.

### Selectors
- **Location:** [selectors/]({{ site.repo_root_url }}/packages/platform/dynamic-query/src/lib/+state/selectors/)
- **Purpose:**  
  Provide selectors to get specific parts of the query state (e.g., selected query, remote pagination info, filter state).
- **Examples:**  
  - [StructuredQuerySelectors]({{ site.repo_root_url }}/packages/platform/dynamic-query/src/lib/+state/selectors/structured-query.selectors.ts)
  - Selectors for queryable schema columns and tables.

### Facades
- **Location:** [facades/]({{ site.repo_root_url }}/packages/platform/dynamic-query/src/lib/+state/facades/)
- **Purpose:**  
  Abstract NgRx interactions. They provide convenient methods to dispatch actions and select state data.
- **Examples:**  
  - [StructuredQueryFacade]({{ site.repo_root_url }}/packages/platform/dynamic-query/src/lib/+state/facades/structured-query.facade.ts) for handling structured queries.
  - [QueryableSchemaTableFacade]({{ site.repo_root_url }}/packages/platform/dynamic-query/src/lib/+state/facades/queryable-schema.table.facade.ts) for table operations.
  - Additional facades exist for columns and relationships.

---

## API Routes & Configurations

- **API Routes:**  
  Centralized in the `api-routes/` folder (e.g. [api-routes.ts]({{ site.repo_root_url }}/packages/platform/dynamic-query/src/lib/api-routes/api-routes.ts)) where endpoints for filters, tables, relationships, and query operations are defined.

- **Configuration:**  
  The API configuration is defined in the `config/` folder, notably in [dynamic-query.api-config.ts]({{ site.repo_root_url }}/packages/platform/dynamic-query/src/lib/config/dynamic-query.api-config.ts).  
  It exposes:
  - `DYNAMIC_QUERY_API_CONFIG` – An injection token for passing in API configuration.
  - `DYNAMIC_QUERY_API_BASE_URL` – Determines the active base URL based on environment (local vs remote).

---

## Components

The library includes UI components for dynamic query interaction.

- **Structured Query Components:**  
  - [StructuredQueryListComponent]({{ site.repo_root_url }}/packages/platform/dynamic-query/src/lib/components/structured-query/structured-query.list.component.ts) displays a paginated list of queries.
  - Components use common UI elements such as filter chip inputs (`zwp-filter-chip-input`), paginated tables (`zwp-paginated-table`), and material buttons.

- **Queryable Schema Components:**  
  - Components to display schema tables and details (e.g. table paginated list, table-details panels).
  - They interact with facades to dispatch user events such as row clicks and filter changes.

---

## Services

### Live API Services
- **Location:** In the `services/live/` folder.
- **Purpose:**  
  Provide integration with real API endpoints using authenticated HTTP calls.
- **Examples:**  
  - [StructuredQueryLiveAPIService]({{ site.repo_root_url }}/packages/platform/dynamic-query/src/lib/services/live/structured-query.live.api.service.ts) for creating, reading, updating, and deleting structured queries.
  - [QueryableSchemaLiveAPIService]({{ site.repo_root_url }}/packages/platform/dynamic-query/src/lib/services/live/queryable-schema.live.api.service.ts) which extends the Auth service and implements methods such as `getTable`, `listTables`, `listColumns`, and `getRelationship`.

### Mock API Services
- **Location:** In the `services/mock/` folder.
- **Purpose:**  
  Provide faked responses for development and testing.
- **Examples:**  
  - [QueryableSchemaMockAPIService]({{ site.repo_root_url }}/packages/platform/dynamic-query/src/lib/services/mock/queryable-schema.mock.api.service.ts) for schema endpoints that throw “not implemented” errors or simulate delays.
  
Both live and mock API services are wired up via the module’s `forRoot` method, based on the configuration provided.

---

## Building and Usage

1. **Build the Package:**
   ```sh
   nx build platform.dynamic-query
   ```

2. **Run Tests:**
   ```sh
   nx test platform.dynamic-query
   ```

3. **Usage in an Angular Project:**
   Import the module into your application:
   ```typescript
   import { PlatformDynamicQueryModule } from '@zwp/platform.dynamic-query';

   @NgModule({
     imports: [
       PlatformDynamicQueryModule.forRoot({
         remoteBaseUrl: 'https://api.remote.example.com',
         localBaseUrl: 'http://localhost:3000'
       })
     ]
   })
   export class AppModule {}
   ```

4. **Interacting with the State:**
   Inject one of the facades (e.g. StructuredQueryFacade) to execute queries and handle query state:
   ```typescript
   constructor(private structuredQueryFacade: StructuredQueryFacade) {}

   createQuery() {
     this.structuredQueryFacade.createStructuredQuery({ /* request payload */ });
   }
   ```

---

## Conclusion

The **platform.dynamic-query** package centralizes dynamic query state management and API integration. It provides:
- A robust state management system (with actions, effects, reducers, selectors, and facades)
- Configurable API routes and services for both live and mock data.
- A suite of reusable UI components to display and interact with query data.

---
