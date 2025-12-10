---
id: cdp.common
title: Customer Data Platform - Common Utilities
sidebar_label: Common Utilities
---
# Customer Data Platform - Common Utilities

This document details the **Zastrozzi CDP Common Library**. This library provides shared functionality and state management features used throughout our project. It leverages NgRx for managing common state (via actions, effects, reducers, selectors, and facades), exposes shared models and enums, and includes utility features such as the Utility Dock for presenting overlay panels.

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
     - [Detailed Facade and Its Methods](#detailed-facade-and-its-methods)
5. [Models & Enums](#models--enums)
6. [Building and Usage](#building-and-usage)
7. [Conclusion](#conclusion)

---

## Overview

The **Zastrozzi CDP Common Library** provides core building blocks that are shared across the application. These include:
- **NgRx State Management:** Centralized actions, reducers, effects, selectors, and facades (such as those for managing the Utility Dock).
- **Utility Dock:** A specialized overlay dock that can display different panels based on the application’s needs.
- **Shared Models & Enums:** Common data structures and enumerations (e.g. for utility dock panel types) that standardize application-wide behavior.

This library is intended for integration with other modules in our project, ensuring a consistent foundation for shared functionality.

---

## Directory Structure

A high-level overview of the CDP Common library layout (located in `/packages/cdp/common`):

- **Root Files:**  
  - `.eslintrc.json`, `jest.config.ts`, `ng-package.json`, `package.json`, `project.json`
  - TypeScript configurations: `tsconfig.json`, `tsconfig.lib.json`, `tsconfig.lib.prod.json`, `tsconfig.spec.json`
  - [README.md](../../../packages/cdp/common/README.md)

- **src/**  
  - `index.ts` – Re-exports the module and public APIs.
  - `test-setup.ts` – Jest test configuration.
  - **lib/**  
    - **cdp-common.module.ts:**  
      The main Angular module that imports common functionality and registers state facades.
    - **cdp-common.ts:**  
      Aggregates exports (e.g. models, state, utilities) for convenient consumption.
    - **+state/**  
      - `identifiers.ts` – Defines namespaced keys such as `CDPCommon` and `UTILITY_DOCK_STATE_FEATURE_KEY`.
      - **actions/** – Contains action definitions for shared state. For example, [utility-dock.actions.ts](../../../packages/cdp/common/src/lib/+state/actions/utility-dock.actions.ts) defines actions to open, close, and toggle utility dock panels.
      - **effects/** – Implements side effects (e.g. [utility-dock.effects.ts](../../../packages/cdp/common/src/lib/+state/effects/utility-dock.effects.ts)).
      - **reducers/** – Reducers update state slices (e.g. for the utility dock).
      - **selectors/** – Provides selectors to extract utility dock panel data.
      - **facades/** – Exposes high-level interfaces such as the `CDPCommonUtilityDockFacade`.
      - `state.ts` and `index.ts` – Aggregate and re-export the state pieces.
    - **model/**  
      - Contains shared models and common data structures.
      - **common/** – Specific shared models (e.g. for utility dock panels).
      - **enums/** – Enumerations such as `utility-dock.panel-type` which define available panel types.

---

## Modules

### CDPCommonModule
- **Purpose:**  
  The primary Angular module for the CDP Common library. It combines shared functionality from various state slices, registers utility facades, and imports dependencies such as the Platform Common and Layout modules.
- **Setup:**  
  Defined in [cdp-common.module.ts](../../../packages/cdp/common/src/lib/cdp-common.module.ts), it also provides state environment providers via its `forRoot()` method.

---

## State Management

### Identifiers & State Assembly
- **Identifiers:**  
  The file [identifiers.ts](../../../packages/cdp/common/src/lib/+state/identifiers.ts) defines:
  - `CDP_COMMON_ACTION_IDENTIFIER` – A prefix for CDP Common actions.
  - `UTILITY_DOCK_STATE_FEATURE_KEY` – The state key used for the Utility Dock.
- **State Assembly:**  
  The shared state is constructed by combining reducers (exported in [state.ts](../../../packages/cdp/common/src/lib/+state/state.ts)) and is re-exported for ease of use.

### Actions

The CDP Common library includes actions for managing the Utility Dock, found in [utility-dock.actions.ts](../../../packages/cdp/common/src/lib/+state/actions/utility-dock.actions.ts):

- **openUtilityDockPanel**  
  Dispatches an action to open a specific utility dock panel.
  - *Payload:* `{ panelType: Model.UtilityDockPanelType }`
- **closeUtilityDockPanel**  
  Dispatches an action to close a specific utility dock panel.
  - *Payload:* `{ panelType: Model.UtilityDockPanelType }`
- **toggleUtilityDockPanel**  
  Toggles the open/close state of the specified utility dock panel.
  - *Payload:* `{ panelType: Model.UtilityDockPanelType }`

### Effects
- **Purpose:**  
  Effects in [utility-dock.effects.ts](../../../packages/cdp/common/src/lib/+state/effects/utility-dock.effects.ts) listen for utility dock actions and perform asynchronous tasks such as updating overlay displays.
- **Implementation:**  
  Effects use RxJS operators (`switchMap`, `map`, `catchError`) to process actions and dispatch further updates based on side effects.

### Reducers
- **Purpose:**  
  Reducers manage state transitions in response to Utility Dock actions.
- **Implementation:**  
  The utility dock reducer (exported via [reducers.ts](../../../packages/cdp/common/src/lib/+state/reducers/reducers.ts)) uses NgRx’s `createReducer` and `on` to update state immutably.

### Selectors
- **Purpose:**  
  Selectors extract slices of the CDP Common state for the Utility Dock.
- **Implementation:**  
  Utility Dock selectors (exported in [selectors/index.ts](../../../packages/cdp/common/src/lib/+state/selectors/selectors.ts)) provide:
  - The full list of utility dock panels.
  - The expansion status of a specific dock panel.
  - Other computed values relevant to the Utility Dock.

### Facades

Facades encapsulate NgRx interactions and expose a clean API. The main facade in this library is the `CDPCommonUtilityDockFacade`.

#### Detailed Facade and Its Methods

- **CDPCommonUtilityDockFacade**
  - *Observables:*
    - `utilityDockPanels$`: Emits all utility dock panels from state.
    - `anyUtilityDockPanelIsExpanded$`: Indicates if any dock panel is currently expanded.
    - `utilityDockPanelById$(id: string)`: Returns an observable for a specific dock panel by id.
    - `utilityDockPanel$(panelType: Model.UtilityDockPanelType)`: Streams the state of a specific dock panel based on its type.
    - `utilityDockPanelIsExpanded$(panelType: Model.UtilityDockPanelType)`: Emits the expansion state for a given panel type.
  - *Methods:*
    - `openUtilityDockPanel(panelType: Model.UtilityDockPanelType): void`  
      Dispatches the `openUtilityDockPanel` action to open the dock panel.
    - `closeUtilityDockPanel(panelType: Model.UtilityDockPanelType): void`  
      Dispatches the `closeUtilityDockPanel` action to close the dock panel.
    - `toggleUtilityDockPanel(panelType: Model.UtilityDockPanelType): void`  
      Dispatches the `toggleUtilityDockPanel` action to toggle the state.
    - *(Private Methods)*  
      - `addUtilityDockPanelOverlay(panelType: Model.UtilityDockPanelType): boolean`  
        Creates and returns a new overlay reference for the given dock panel.
      - `removeUtilityDockPanelOverlay(panelType: Model.UtilityDockPanelType): void`  
        Removes the overlay associated with the dock panel.
      - `getUtilityDockPanelOverlay(panelType: Model.UtilityDockPanelType): Nullable<Model.UtilityDockPanelOverlayRef<any>>`  
        Retrieves the current overlay reference for a specified dock panel.

*Note:* The facade uses Angular’s dependency injection to access the `Store` and `Overlay` services, enabling it to dispatch actions and manage UI overlays.

---

## Models & Enums

- **Models:**  
  Defined in the `model/` folder, these include:
  - Shared models (in [model/common](../../../packages/cdp/common/src/lib/model/common/index.ts)) such as the structure for utility dock panels.
- **Enums:**  
  Located in the `model/enums` folder (e.g. [utility-dock.panel-type.ts](packages/cdp/common/src/lib/model/enums/utility-dock.panel-type.ts)), which define available panel types for the Utility Dock.

---

## Building and Usage

1. **Building the Library:**
    ```sh
    nx build cdp.common
    ```
2. **Running Tests:**
    ```sh
    nx test cdp.common
    ```
3. **Usage in an Angular Project:**
    Import the module:
    ```typescript
    import { CDPCommonModule } from '@zwp/cdp.common';

    @NgModule({
      imports: [CDPCommonModule.forRoot()]
    })
    export class AppModule {}
    ```
4. **Interacting with the Utility Dock:**
    Inject the facade into your component:
    ```typescript
    import { Component } from '@angular/core';
    import { CDPCommonUtilityDockFacade } from '@zwp/cdp.common';

    @Component({
      selector: 'app-utility-dock-demo',
      template: `
        <button (click)="openDock()">Open Utility Dock</button>
      `
    })
    export class UtilityDockDemoComponent {
      constructor(private utilityDockFacade: CDPCommonUtilityDockFacade) {}

      openDock() {
        this.utilityDockFacade.openUtilityDockPanel('SomePanelType' as any);
      }
    }
    ```

---

## Conclusion

The **Zastrozzi CDP Common Library** provides a robust, shared foundation for common functionality across our project. With comprehensive NgRx state management for features like the Utility Dock, well-organized models and enums, and a high-level facade to simplify UI integrations, this library creates a consistent, maintainable architecture for shared application features.
