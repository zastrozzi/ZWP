---
id: fsn.tink
title: Financial Services Network - Tink
sidebar_label: Tink
---
# Zastrozzi FSN‑Tink Library Documentation

This document details the **Zastrozzi FSN‑Tink Library**. The FSN‑Tink library is part of the Zastrozzi Financial Services Network and provides comprehensive functionality for financial services integrations. It includes state management via NgRx, live and mock API service implementations, a rich set of UI components, and extensive configuration options. The library is designed to be modular and scalable across features like account management, credentials, provider consents, merchant data, transactions, users, and webhook endpoints.

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Modules](#modules)
4. [State Management](#state-management)
   - [Identifiers & State Assembly](#identifiers--state-assembly)
   - [Actions](#actions)
   - [Effects](#effects)
   - [Reducers & Selectors](#reducers--selectors)
   - [Facades](#facades)
5. [API Routes & Configuration](#api-routes--configuration)
6. [Components](#components)
7. [Services](#services)
   - [Live API Services](#live-api-services)
   - [Mock API Services](#mock-api-services)
   - [Abstract API Services & Tokens](#abstract-api-services--tokens)
8. [Building and Usage](#building-and-usage)
9. [Conclusion](#conclusion)

---

## Overview

The **FSN‑Tink Library** provides robust functionality for financial institution integrations. Key features include:

- **NgRx State Management:** All feature domains – such as accounts, credentials, providers, merchants, transactions, users, and webhook endpoints – are managed through a centralized NgRx store.
- **API Integration:** Live and mock API services allow seamless integration with backend endpoints, while configuration tokens and API routes enable environment-specific behavior.
- **Reusable Components:** A library of Angular components supports account interfaces, consent management, financial transactions, and user interactions.
- **Modularity and Scalability:** The library is structured into discrete modules (state, services, components, models, etc.) ensuring maintainability and ease of extension.

---

## Directory Structure

A high-level overview of the FSN‑Tink library layout (located in `/packages/fsn/tink`({{ site.repo_root_url }}/packages/fsn/tink)):

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
  index.ts               // Aggregates exports from the library.
  test-setup.ts          // Jest test setup configuration.
  lib/
    fsn.tink.module.ts   // Main Angular module that aggregates state, components, services, and API routes.
    fsn.tink.ts          // Re-exports core library APIs.
    +state/              // NgRx state management files.
      identifiers.ts     // Defines namespaced keys for feature domains (e.g. Account, Credential, Provider, etc.).
      index.ts           // Re-exports state pieces.
      state.ts           // Combines reducers into a central store.
      actions/           // Contains NgRx actions for all FSN‑Tink domains.
      effects/           // Contains NgRx effects for handling asynchronous operations.
      facades/           // Exposes high-level facades for interacting with the store.
      reducers/          // Reducers to process actions immutably.
      selectors/         // Memoized selectors for accessing state slices.
    api-routes/           // Centralized API route definitions for accounts, credentials, consents, providers, transactions, users, webhook endpoints, etc.
    components/           // Reusable Angular UI components.
    config/               // Configuration files and tokens (e.g. TINK_API_CONFIG, TINK_API_BASE_URL).
    model/                // Shared models, enums, filters, requests, and responses.
    routes/               // Angular route definitions for FSN‑Tink feature areas.
    services/             // Contains abstract, live, and mock API service implementations.
```

---

## Modules

### FSNTinkModule
- **Purpose:**  
  The main Angular module for the FSN‑Tink library. It bootstraps the library functionalities by aggregating state management, routing, UI components, API routes, and services.
- **Setup:**  
  Defined in `fsn.tink.module.ts`, this module imports essential Angular modules (such as `CommonModule`, routing modules, and platform-specific modules) and registers the NgRx state as well as service providers.
- **Configuration:**  
  The module exposes a `forRoot()` method that accepts a configuration object (of type `TinkAPIConfig`) to set API endpoints and determine whether to use live or mock services. Configuration tokens such as `TINK_API_CONFIG` and `TINK_API_BASE_URL` control these settings.

---

## State Management

The FSN‑Tink library leverages NgRx to manage state across multiple feature domains.

### Identifiers & State Assembly
- **Identifiers:**  
  Defined in [identifiers.ts]({{ site.repo_root_url }}/packages/fsn/tink/src/lib/+state/identifiers.ts), identifiers include:
  - `FSN_TINK_ACTION_IDENTIFIER`
  - `ACCOUNT_STATE_FEATURE_KEY`
  - `CREDENTIAL_STATE_FEATURE_KEY`
  - `MERCHANT_STATE_FEATURE_KEY`
  - `PROVIDER_STATE_FEATURE_KEY`
  - `PROVIDER_CONSENT_STATE_FEATURE_KEY`
  - `TOKEN_STATE_FEATURE_KEY`
  - `TRANSACTION_STATE_FEATURE_KEY`
  - `USER_STATE_FEATURE_KEY`
  - `WEBHOOK_ENDPOINT_STATE_FEATURE_KEY`
- **State Assembly:**  
  The store state is assembled in [state.ts]({{ site.repo_root_url }}/packages/fsn/tink/src/lib/+state/state.ts) by combining reducers for each domain, and is configured via the `State.environmentProviders` for proper injection.

### Actions
Actions are defined per domain (account, credential, merchant, provider, transaction, user, webhook endpoint) and are used to orchestrate API calls and state changes. They are organized into files under the `actions/` folder.

### Effects
Effects (located under `effects/`) listen for dispatched actions and perform asynchronous operations by calling the API services. Providers such as `TinkAccountEffects`, `TinkCredentialEffects`, etc., are aggregated via `provideEffects`.

### Reducers & Selectors
Reducers (in `reducers/`) handle state transitions based on dispatched actions, while selectors (in `selectors/`) provide memoized state accessors for use in facades and UI components.

### Facades
Facades abstract away direct store access by exposing observable state and dispatch methods. Examples include:
- **TinkAccountFacade:** Manages account-related actions and selectors.
- **TinkCredentialFacade:** For credential operations.
- **TinkMerchantFacade:** For merchant data.
- **TinkProviderFacade:** Manages provider-specific state and actions.
- **TinkTransactionFacade:** For handling transactions.
- **TinkUserFacade:** For user operations.
- **TinkWebhookEndpointFacade:** For webhook endpoint management.

---

## API Routes & Configuration

API routes for the FSN‑Tink library are defined under the `api-routes/` folder. These routes aggregate the backend endpoints for each domain:
- **Account Routes:** Defined in files like `account.routes.ts`.
- **Credential Routes:** Defined in `credential.routes.ts`.
- **Provider & Provider Consent Routes**
- **Merchant, Transaction, User, and Webhook Endpoint Routes**

In addition, configuration files under the `config/` folder provide tokens such as `TINK_API_CONFIG` and `TINK_API_BASE_URL` to manage endpoint settings and integrate with global API locations.

---

## Components

The FSN‑Tink library provides a wide array of reusable UI components grouped by feature domains. Below is a description of every component group and the key components contained within:

- **TinkHomeComponent**  
  - **Description:**  
    Serves as the landing page for the FSN‑Tink module. It provides an overview dashboard with links to major feature areas such as accounts, merchant data, provider consents, transactions, and user management.

- **ACCOUNT_COMPONENTS**  
  - **Description:**  
    A collection of components dedicated to account management. These components display account dashboards, detailed account information, and allow editing of account settings.  
  - **Key Components:**  
    - *AccountDashboardComponent:* Presents key statistics and recent activity.
    - *AccountDetailComponent:* Shows comprehensive details about a financial account.
    - *AccountFormComponent:* A form for creating or updating account information.

- **COMMON_COMPONENTS**  
  - **Description:**  
    Contains generic, reusable components that support multiple domains. These are often used to format data or display common UI elements.  
  - **Key Components:**  
    - *CurrencyDenominatedAmountLabelComponent:* Renders monetary amounts with appropriate currency formatting.
    - *DateDisplayComponent (if available):* Formats and displays dates consistently across the library.

- **MERCHANT_COMPONENTS**  
  - **Description:**  
    Components in this group manage merchant-related displays. They provide paginated views of merchant data along with options for sorting and filtering.  
  - **Key Components:**  
    - *MerchantPaginatedListComponent:* Displays a paginated table of merchants. Columns include "Created At", "Updated At", "Name", "Status", "Category", and "Country". The component uses date pipes for formatting timestamps and enum transform pipes for status and category labels.
    - *MerchantDetailComponent:* Offers a detailed view of a merchant’s profile including integration status and additional meta-data.

- **PROVIDER_COMPONENTS**  
  - **Description:**  
    These components display information about financial providers. They include both summary listings and detailed views with properties such as access type, authentication flow, and capabilities.  
  - **Key Components:**  
    - *ProviderListComponent:* Renders a list of providers with sortable columns.
    - *ProviderDetailRightPanelComponent:* Displays provider details in a sidebar format, using labelled property components to show "Updated At", "Access Type", "Authentication Flow", and more. Transform pipes are used to convert enum values into human-readable labels.

- **PROVIDER_CONSENT_COMPONENTS**  
  - **Description:**  
    Focused on managing provider consents, these components allow users to view, grant, or revoke consent statuses.  
  - **Key Components:**  
    - *ProviderConsentListComponent:* Provides a summary listing of provider consents.
    - *ProviderConsentDetailComponent:* Displays detailed information about a consent, including timestamps and current status.

- **TRANSACTION_COMPONENTS**  
  - **Description:**  
    Components in this group support the display and management of financial transactions. They provide paginated tables with rich filtering, sorting, and custom column rendering.  
  - **Key Components:**  
    - *TransactionPaginatedListComponent:* Displays transactions in a table with columns for "Created At", "Amount", "Status", "Description", "Unstructured Description", "Reference", and "Transaction Type". Custom templates are used for the amount field and enum pipelines are applied to status.
    - *TransactionDetailComponent:* Presents detailed information for individual transactions including fee breakdowns and associated metadata.

- **USER_COMPONENTS**  
  - **Description:**  
    These components facilitate user management within the FSN‑Tink domain, presenting lists and details of users involved in financial transactions.  
  - **Key Components:**  
    - *UserPaginatedListComponent:* Provides a paginated list of users with filter chips, sorting, and data transformation for display purposes.
    - *UserDetailComponent:* Shows comprehensive details about a user along with relevant activity histories and associated transactions.

- **INTERNAL_COMPONENTS ALL Export**  
  - **Description:**  
    For ease of integration, all of the above component groups are aggregated into an `INTERNAL_COMPONENTS` object (defined in `/src/lib/components/index.ts`). This export includes every individual component as well as the grouped arrays for quick registration or import into other modules.

Each component is designed to work cohesively with the FSN‑Tink state management (via facades) and API services, ensuring that data is always current and that UI interactions trigger the correct backend updates. Customize and extend these components as needed to meet specific UI/UX requirements.

---

## Services

The FSN‑Tink library provides multiple layers of API services.

### Live API Services
Live API services implement the integration with actual backend endpoints. Examples include:
- **TinkAccountLiveAPIService:** Performs HTTP operations for account management.
- **TinkCredentialLiveAPIService:** Handles credential operations.
- **TinkMerchantLiveAPIService:** For merchant-related API calls.
- **TinkProviderLiveAPIService:** For provider interactions.
- **TinkProviderConsentLiveAPIService:** For managing provider consents.
- **TinkTransactionLiveAPIService:** For processing transaction-related operations.
- **TinkUserLiveAPIService:** For user management.
- **TinkWebhookEndpointLiveAPIService:** For webhook endpoint management.

### Mock API Services
Mock services simulate backend responses for testing and development purposes. They follow the same API contracts as the live services and include:
- **TinkAccountMockAPIService**
- **TinkCredentialMockAPIService**
- **TinkMerchantMockAPIService**
- **TinkProviderMockAPIService**
- **TinkProviderConsentMockAPIService**
- **TinkTransactionMockAPIService**
- **TinkUserMockAPIService**
- **TinkWebhookEndpointMockAPIService**

### Abstract API Services & Tokens
Abstract API service interfaces are defined in the `services/abstract/` folder, ensuring a consistent contract across live and mock implementations. Injection tokens (e.g. `TINK_ACCOUNT_API_SERVICE`, `TINK_CREDENTIAL_API_SERVICE`, etc.) are used to inject the correct service based on the configuration passed to the module.

---

## Building and Usage

1. **Building the Library:**
    ```sh
    nx build fsn.tink
    ```
2. **Running Unit Tests:**
    ```sh
    nx test fsn.tink
    ```
3. **Usage in an Angular Project:**
    Import the module into your root module:
    ```typescript
    import { FSNTinkModule } from '@zwp/fsn.tink';

    @NgModule({
      imports: [
        FSNTinkModule.forRoot({
          remoteBaseUrl: 'https://api.remote.example.com',
          localBaseUrl: 'http://localhost:3000',
          apiState: 'live' // or 'mock'
        }),
        // other imports...
      ]
    })
    export class AppModule {}
    ```
4. **Integrating with Components and State:**
    Use the provided facades (e.g. TinkAccountFacade, TinkCredentialFacade) in your components to manage state interactions and API calls.

---

## Conclusion

The **Zastrozzi FSN‑Tink Library** provides a scalable and robust solution for financial services network integrations. With a comprehensive NgRx state management framework, configurable live and mock API services, a suite of reusable UI components, and detailed API route management, this library is designed for high efficiency and maintainability. Customize and extend the FSN‑Tink library to meet your evolving project requirements.
