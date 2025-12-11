---
id: platform.common
title: Core Platform - Common Utilities
sidebar_label: Common Utilities
---
# Platform Common Documentation

This document describes the **platform.common** library. This package provides shared functionality across the application. It includes state management (actions, reducers, selectors, facades), reusable UI components, utility functions, and common models used by other projects.

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Modules](#modules)
4. [State Management](#state-management)
5. [Models](#models)
6. [Components and Extensions](#components-and-extensions)
7. [Utilities](#utilities)
8. [Configuration and Testing](#configuration-and-testing)
9. [Building and Usage](#building-and-usage)
10. [Conclusion](#conclusion)

---

## Overview

The **platform.common** package is a central repository for shared code and assets. It abstracts common concerns such as:

- **UI Components:** Buttons, dialogs, and other reusable Angular components.
- **State Management:** Ngrx-based state management with support for persistence, router state, and history.
- **Utilities:** Helper functions simplifying HTTP requests, array operations, and more.
- **Models:** Definitions for media types, file extensions, and other data types.
- **Extensions:** Enhancements for built-in functionality (e.g. extending Array prototypes).

The package is built using Angular along with Nx tooling, ensuring scalable integration and consistent development practices.

---

## Directory Structure

A high-level breakdown of the package structure is as follows:

- **Root Files:**  
  - `.eslintrc.json` – Linter configuration.
  - `jest.config.ts` – Jest testing configuration.
  - `ng-package.json` – Package build configuration with ng-packagr.
  - `package.json` – Package dependencies, scripts, and metadata.
  - `project.json` – Nx project configuration (build, test, lint targets).
  - `tsconfig*.json` – TypeScript configuration for different environments.
  - `README.md` – Brief library description (expandable with detailed docs).

- **extensions/array/**  
  Extends native array functionality. The included [README.md]({{ site.repo_root_url }}/packages/platform/common/extensions/array/README.md) explains usage and integration.

- **src/**  
  Contains all source code:
  - **index.ts** – Main entry point re-exporting the library’s modules.
  - **test-setup.ts** – Bootstrap and config for unit tests.
  - **lib/** – Organized source code:
    - **+state/**  
      Handles state management using Ngrx:
      - `actions/`, `effects/`, `facades/`, `reducers/`, `selectors/`  
        Define actions, middleware effects, UI facades, and reducers for managing application state. For example, [`identifiers.ts`]({{ site.repo_root_url }}/packages/platform/common/src/lib/+state/identifiers.ts) generates namespaced action keys.
    - **components/**  
      Contains reusable Angular components such as buttons and dialogs. The [index.ts]({{ site.repo_root_url }}/packages/platform/common/src/lib/components/index.ts) re-exports these components.
    - **decorators/** and **directives/**  
      Provides custom Angular decorators and directives enhancing component functionality.
    - **model/**  
      Defines data models and type definitions. Notably, [`model/media/file-extension.ts`]({{ site.repo_root_url }}/packages/platform/common/src/lib/model/media/file-extension.ts) maps file extensions to HTTP media type information.
    - **modules/**  
      Contains Angular modules that bundle functionality:
      - **zwp.ngrx.module.ts:** Establishes base Ngrx state, including theming, router, application, keyboard, and persistence states.
      - **zwp.ngrx-persistence.module.ts:** Configures persistent state features. Functions like `_providePersistenceFeature` and `_providePersistenceRoot` set up meta-reducers to integrate with Ngrx.
      - **zwp.ngrx-history.module.ts:** Manages history state with registrations for allowed actions and meta-reducers.
      - **zwp.common.module.ts:** Bundles common Angular modules, components, and third-party libraries.
    - **operators/**  
      Contains custom RxJS operators that extend observable functionalities.
    - **pipes/**  
      Provides Angular pipes for reusable transformations.
    - **services/**  
      Contains utility services. For example, the [HTTP utils]({{ site.repo_root_url }}/packages/platform/common/src/lib/utils/http.utils.ts) provide functions to configure HTTP headers and manage API requests. This file also declares enums such as `GlobalAPILocation` and `ModuleAPIState` for API configuration.
    - **utils/**  
      A collection of helper functions:
      - HTTP helpers that set default headers and handle environment-specific content types.
      - Array and string manipulation utilities. All utilities are re-exported from the main [`index.ts`]({{ site.repo_root_url }}/packages/platform/common/src/index.ts) for simplified import.

---

## Modules

The module system is a core part of **platform.common**:

- **ZWPNgrxModule:**  
  - Imports and registers Ngrx state including theming, router, application, keyboard, and history states.
  - Validates required features against the root configuration.  
  - The module registers providers using helper functions like `createNamespacedFeatureKey` (for namespacing state slices) and persists state when enabled.

- **ZWPNgrxPersistenceModule:**  
  - Offers both `forRoot` and `forFeature` methods to register persistent state.
  - Uses a meta-reducer factory (`persistenceMetaReducerFactory`) to integrate persistent storage into Ngrx.
  - The `_setupPersistentState` function registers persistent features with the [ZWPPersistenceService]({{ site.repo_root_url }}/packages/platform/common/src/lib/services).

- **ZWPNgrxHistoryModule:**  
  - Provides similar methods (`forRoot` / `forFeature`) to integrate history tracking.
  - Registers allowed actions and manages state changes for history purposes using meta-reducer factories.

- **ZWPCommonModule:**  
  - Bundles common components, directives, and pipes.
  - Integrates Angular Material, CDK, and third-party modules.
  - Provides global configurations, such as setting the default locale for date processing.

---

## State Management

State management is organized under the **+state** directory with the following responsibilities:

- **Actions & Identifiers:**  
  - Actions are defined with unique, namespaced identifiers (see [`identifiers.ts`]({{ site.repo_root_url }}/packages/platform/common/src/lib/+state/identifiers.ts)).
  - These form the foundation for dispatched events within the application.

- **Reducers & Effects:**  
  - Reducers update state based on dispatched actions.
  - Effects handle complex side effects (like HTTP requests). For example, effects in `zwp.ngrx.module.ts` manage router and theming effects.
  
- **Facades:**  
  - Facades abstract the complexity of Ngrx interactions away from UI components. They expose methods to dispatch actions and select state values.

- **Persistence & History:**  
  - Persistence features are integrated using the ZWPNgrxPersistenceModule and helper functions that attach meta-reducers.
  - History features capture a log of state changes and support undo/redo functionality, managed by ZWPNgrxHistoryModule.

---

## Models

The **model** folder declares and exports types related to:

- **Media and File Extensions:**  
  - Defines mappings between file extensions and their corresponding HTTP media types (see [`model/media/file-extension.ts`]({{ site.repo_root_url }}/packages/platform/common/src/lib/model/media/file-extension.ts)).
  
- **Application-specific models:**  
  - Contains definitions for audit, configuration, and other common entities used throughout the projects.

---

## Components and Extensions

- **Components:**  
  - Angular components (e.g., buttons, dialogs) are designed to be reusable across different modules and projects.
  - Their exports are coordinated via the [components index]({{ site.repo_root_url }}/packages/platform/common/src/lib/components/index.ts).

- **Extensions:**  
  - The `extensions/array` folder provides enhancements to built-in array functionalities.
  - Users can refer to its [README]({{ site.repo_root_url }}/packages/platform/common/extensions/array/README.md) for guidance on usage.

---

## Utilities

The **utils** folder encompasses helper functions that aid in reducing boilerplate and handling common tasks:

- **HTTP Utilities:**  
  - The [http.utils.ts]({{ site.repo_root_url }}/packages/platform/common/src/lib/utils/http.utils.ts) includes helper functions that standardize HTTP header setup. It dynamically sets headers such as `Accept` and `Content-Type` based on provided options.  
  - Enums like `GlobalAPILocation` and `ModuleAPIState` support API configuration.

- **Array and String Utilities:**  
  - These helpers simplify common operations, such as data transformation and error handling.
  
- **Re-export Strategy:**  
  - All utilities are re-exported in the main entry file (`index.ts`) for simplified access throughout our projects.

---

## Configuration and Testing

- **Linting and Formatting:**  
  - Configured using `.eslintrc.json` and `.prettierrc` to ensure code quality and consistency.

- **Testing:**  
  - The Jest framework is configured via `jest.config.ts` and `tsconfig.spec.json`.
  - The `test-setup.ts` file initializes any required test configurations and global mocks.

- **Nx Integration:**  
  - The `project.json` file defines targets for building, testing, and linting.
  - You can run:
    - Build with: `nx build platform.common`
    - Test with: `nx test platform.common`
    - Lint with: `nx lint platform.common`

---

## Building and Usage

To build and use the package:

1. **Build the Package:**
    ```sh
    nx build platform.common
    ```

2. **Run Tests:**
    ```sh
    nx test platform.common
    ```

3. **Importing Modules:**
    - The package is re-exported from [`src/index.ts`]({{ site.repo_root_url }}/packages/platform/common/src/index.ts), so you can consume modules like:
    ```ts
    import { ExampleModule } from '@zwp/platform.common';
    ```

---

## Conclusion

The **platform.common** package is a core library designed to centralize and standardize shared functionalities across our projects. Key features include:

- **State Management:** A robust Ngrx-based implementation offering persistence, router state, history, and theming.
- **Extensible Models and Components:** Well-organized definitions and reusable Angular components that ensure consistent UI and behavior.
- **Utility Functions:** Helper methods that streamline common operations such as HTTP calls, data transformations, and error handling.
- **Nx Integration:** Comprehensive setup for build, test, and lint targets ensuring smooth development workflows.

This enriched documentation should serve as a detailed guide for developers to understand, extend, and maintain the functionalities provided by **platform.common**.
