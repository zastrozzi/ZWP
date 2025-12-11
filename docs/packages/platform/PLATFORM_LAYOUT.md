---
id: platform.layout
title: Core Platform - Layout
sidebar_label: Layout
---
# Core Platform - Layout

[**View on Github**]({{ site.repo_root_url }}/packages/platform/layout)

This document details the **platform.layout** library. This package provides the foundational layout framework for your application. It includes a rich set of tools for arranging panels, menus, windows, tables, and more. The package leverages NgRx for state management (via actions, effects, reducers, selectors, and facades), reusable UI components, decorators, directives, and services to manage overlays, notifications, and more.

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Modules](#modules)
4. [State Management](#state-management)
   - [Identifiers & State Assembly](#identifiers--state-assembly)
   - [Actions](#actions)
     - [Window Layout Actions](#window-layout-actions)
     - [Panel Layout Actions](#panel-layout-actions)
     - [Utility Layout Actions](#utility-layout-actions)
   - [Effects](#effects)
   - [Reducers](#reducers)
   - [Selectors](#selectors)
   - [Facades](#facades)
     - [Detailed Facades and Their Methods](#detailed-facades-and-their-methods)
5. [Components](#components)
6. [Services](#services)
   - [Window/Overlay Services](#windowoverlay-services)
   - [Menu Overlay & Snackbar Services](#menu-overlay--snackbar-services)
7. [Building and Usage](#building-and-usage)
8. [Conclusion](#conclusion)

---

## Overview

The **platform.layout** package offers a modular architecture for configuring and rendering application layouts. It supports:
- **Windows:** Floating or docked window components with dynamic positioning, resizing, and z-index management.
- **Panels:** Resizable panels with embedded detail and action areas.
- **Menus:** Configurable menus that support overlay functionality.
- **Tables:** Pre-styled, responsive tabular components for data display.
- **State Management:** Uses NgRx to track window positions, panel configurations, menu states, and utility panels.
- **Services:** Provides overlay management, notifications (snackbars), and layout persistence.
- **Decorators, Directives & Components:** Facilitate custom layout configuration and responsive behavior.

---

## Directory Structure

A high-level overview of the package layout:

- **Root Files:**  
  - Configuration: `.eslintrc.json`, `jest.config.ts`, `ng-package.json`, `package.json`, `project.json`
  - TypeScript configs: `tsconfig.json`, `tsconfig.lib.json`, `tsconfig.lib.prod.json`, `tsconfig.spec.json`
  - [README.md]({{ site.repo_root_url }}/packages/platform/layout/README.md)

- **src/**  
  - `index.ts` – Re-exports the module, components, state facades, and services.
  - `test-setup.ts` – Jest test configuration.
  - **lib/**  
    - **+state/**  
      - **identifiers.ts:**  
        Defines namespaced keys such as:
          - `PLATFORM_LAYOUT_ACTION_IDENTIFIER`
          - `PANEL_LAYOUT_STATE_FEATURE_KEY`
          - `WINDOW_LAYOUT_STATE_FEATURE_KEY`
          - `UTILITY_LAYOUT_STATE_FEATURE_KEY`
      - **actions/**  
        Contains action definitions for:
          - **Window Layout Actions**
          - **Panel Layout Actions**
          - **Utility Layout Actions**
      - **effects/**  
        Handles side effects for layout state (e.g. `panel-layout.effects.ts` and `window-layout.effects.ts`).
      - **reducers/**  
        Reducers update state slices for panels, windows, tables, etc.
      - **selectors/**  
        Provides selectors to extract window lists, panel sizes, z-index values, and other layout details.
      - **facades/**  
        Exposes high-level interfaces:
          - `ZWPWindowLayoutFacade`
          - `ZWPPanelLayoutFacade`
          - `ZWPMenuLayoutFacade`
          - `ZWPMainPanelFacade`
          - `ZWPPopupLayoutFacade`
    - **components/**  
        Contains reusable UI components:
          - **Panels:** e.g. `ActionedDetailPanelComponent`, `ResizableActionedDetailPanelComponent`, `DetailPanelComponent`, `PanelLayoutComponent`, `PanelLayoutControlsComponent`
          - **Menus:** Found under the menus folder (exported via an index file)
          - **Windows:** e.g. `WindowComponent`, `ExampleWindowComponent`, `WindowLayoutDockComponent`, `WindowDockButtonComponent`
          - **Tables:** (exported via the tables folder)
          - An index file re-exporting all exportable components.
    - **decorators/**  
        Custom decorators (e.g. `menu-component.decorator.ts`) for marking components.
    - **directives/**  
        Directives (e.g. for resizing, dragging).
    - **model/**  
        Data models for windows, panels, menus, and overall layout configurations.
    - **modules/**  
        Contains the core module [zwp.layout.module.ts]({{ site.repo_root_url }}/packages/platform/layout/src/lib/modules/zwp.layout.module.ts).
    - **pipes/**  
        Custom pipes for layout theming and formatting.
    - **services/**  
        Provides API and utility services:
          - `ZWPWindowOverlayService`
          - `ZWPMenuOverlayService`
          - `ZWPSnackbarService`

---

## Modules

### ZWPLayoutModule
- **Purpose:**  
  The main Angular module for layout configuration. It registers state slices, effects, and provides layout services.
- **Setup:**  
  Defined in [zwp.layout.module.ts]({{ site.repo_root_url }}/packages/platform/layout/src/lib/modules/zwp.layout.module.ts), it imports common modules (e.g. `ZWPCommonModule`, `RouterModule`) and aggregates exportable components, directives, and pipes.
- **Configuration:**  
  The module supports panel, window, menu, and table layouts as well as optional persistence features.

---

## State Management

### Identifiers & State Assembly
- **Identifiers:**  
  See [identifiers.ts]({{ site.repo_root_url }}/packages/platform/layout/src/lib/+state/identifiers.ts) for keys such as `PLATFORM_LAYOUT_ACTION_IDENTIFIER`, `PANEL_LAYOUT_STATE_FEATURE_KEY`, `WINDOW_LAYOUT_STATE_FEATURE_KEY`, etc.
- **State Assembly:**  
  Each domain (windows, panels, utilities) is built via its reducer file and aggregated with helper functions.

### Actions

Actions are organized into three main groups:

#### Window Layout Actions
- **createRequest**  
  Initiates the creation of a window.  
  *Payload:* `windowEntity` (object with id, label, icon, color, themeColor, componentName, position, etc.).  
  *File:* [window-layout.actions.ts]({{ site.repo_root_url }}/packages/platform/layout/src/lib/+state/actions/window-layout.actions.ts)
- **updatePositionRequest / updatePositionSuccess / updatePositionFailure**  
  Dispatches actions to update a window’s position.  
  *Payload:* window id and new `WindowPosition`.
- **expand**  
  Expands a window.  
  *Payload:* window id.
- **minimise**  
  Minimises a window.  
  *Payload:* window id.
- **remove**  
  Removes a window.  
  *Payload:* window id.
- **removeAll**  
  Removes all windows.
- **restoreAll**  
  Restores all windows from a persisted state.  
  *Payload:* array of windowEntities.

#### Panel Layout Actions
- **collapseLeftPanel**  
  Collapses the left panel.
- **expandLeftPanel**  
  Expands the left panel.
- **closeLeftPanel**  
  Closes the left panel.
- *(Additional actions may exist for detail panels or right panels.)*  
  *File:* [panel-layout.actions.ts]({{ site.repo_root_url }}/packages/platform/layout/src/lib/+state/actions/panel-layout.actions.ts)

#### Utility Layout Actions
- **openUtilityPanel**  
  Opens a utility panel.  
  *Payload:* `utilityPanelId`.
- **closeUtilityPanel**  
  Closes a utility panel.  
  *Payload:* `utilityPanelId`.  
  *File:* [utility-layout.actions.ts]({{ site.repo_root_url }}/packages/platform/layout/src/lib/+state/actions/utility-layout.actions.ts)

### Effects
- **Purpose:**  
  Effects intercept layout actions to perform asynchronous work such as:
  - Calling the `ZWPWindowOverlayService` to add overlays on window creation.
  - Persisting layout changes.
- **Implementation:**  
  Effects (e.g. in [window-layout.effects.ts]({{ site.repo_root_url }}/packages/platform/layout/src/lib/+state/effects/window-layout.effects.ts)) use RxJS operators like `switchMap`, `map`, `catchError`, and `concatLatestFrom` to dispatch success or failure actions.

### Reducers
- **Purpose:**  
  Reducers update state in response to layout actions in an immutable manner.
- **Examples:**  
  - The window layout reducer handles window creation, position updates, and removal.
  - The panel layout reducer maintains panel sizes and open/close states.
- **Implementation:**  
  Built with NgRx’s `createReducer` and `on` functions.

### Selectors
- **Purpose:**  
  Selectors provide selectable slices of the layout state – for example:
  - Lists of all windows.
  - The currently focused window.
  - Panel sizes and drag-handle statuses.
- **Implementation:**  
  Use NgRx `createSelector` for memoization.

### Facades

Facades encapsulate all NgRx interactions so components can use a clean API.

#### Detailed Facades and Their Methods

- **ZWPWindowLayoutFacade:**
  - *Observables:*  
    - `allWindows$`: Emits an array of all window entities.
    - `getWindowById$(id: string)`: Returns an observable stream of a single window by id.
  - *Methods:*
    - `addWindow(newWindow: Partial<WindowEntity>): void`  
      Validates input, normalizes position via `ZWPWindowOverlayService`, and dispatches a createRequest action.
    - `removeWindow(id: string): void`  
      Dispatches an action to remove the window.
    - `removeAllWindows(): void`  
      Dispatches an action to remove all windows.
    - `renameWindow(id: string, label: string): void`  
      Dispatches an action to update the window’s label.
    - `updatePositionFromDragDistance(windowId: string, distance: GeometryPoint): void`  
      Dispatches an updatePosition action based on a drag event.
    - `updatePositionFromResizeEdges(windowId: string, edges: GeometryEdges): void`  
      Dispatches an update action for window resizing.
    - `registerWindowTypes(windowTypes: ComponentType<any>[]): void`  
      Registers available window component types for dynamic instantiation.
    - `addRandomWindow(): void`  
      Generates a random window configuration and dispatches createRequest.
    - `expandWindow(windowId: string): void`  
      Dispatches an expand action.
    - `minimiseWindow(windowId: string): void`  
      Dispatches a minimise action.
    - `focusWindow(windowId: string): void`  
      Dispatches an action to focus a window.
    - `getWindowZIndex(windowEntity: WindowEntity): number`  
      Utility method to calculate a window’s z-index.
    - `getHigherWindowZIndexClass(windowId: string): string`  
      Returns a CSS class for a higher z-index window.
  
- **ZWPPanelLayoutFacade:**
  - *Observables:*
    - `mainPanelMarginBottom$`: Emits the bottom margin value for the main panel.
    - `mainPanelClickDismissals$`: Emits dismiss events.
    - `detailPanelSize$`: Emits current detail panel dimensions.
    - `detailPanelDragHandleFocused$`: Emits focus state of drag handles.
    - `allRightPanels$`: Emits an array of right panels.
    - `selectedRightPanelId$` and `selectedRightPanel$`: Provide the currently selected right panel ID and panel data.
  - *Methods:*
    - Methods to toggle panel states (e.g., collapse/expand).
    - Methods to update panel sizes via dispatching panel-layout actions.
    - Methods to manage drag handle focus (setting and clearing focus).

- **ZWPMenuLayoutFacade:**
  - *Methods:*
    - `registerMenuComponentType(menuComponentType: ComponentType<any>): void`  
      Registers a menu component for overlays or navigation.
    - Helper methods to update menu positions and state based on user interactions.

- **ZWPMainPanelFacade:**
  - *Observables & Methods:*  
    Exposes the state of the main panel (e.g., tab configuration, active content). Methods include updating main panel layout and dispatching actions for panel changes.
  
- **ZWPPopupLayoutFacade:**
  - *Observables & Methods:*  
    Manages popup layout state (overlays or transient panels) and provides methods to open, close, and reposition popups.

*Note:* Facade implementations subscribe to selectors and dispatch actions, hiding NgRx complexity from components.

---

## Components

The package includes a rich set of reusable UI components.

- **Panels:**
  - `ActionedDetailPanelComponent`  
    Displays detailed content with quick-action buttons.
  - `ResizableActionedDetailPanelComponent`  
    A resizable version of the detail panel with built-in action support.
  - `DetailPanelComponent`  
    A basic panel for displaying details.
  - `PanelLayoutComponent`  
    The container for arranging multiple panels.
  - `PanelLayoutControlsComponent`  
    Provides UI controls (e.g. buttons and sliders) for adjusting panel sizes and layouts.
  - `TabbedNavPanelComponent`  
    A navigation panel with tabbed interfaces.
  - `LeftNavPanelComponent`  
    Specialized for left-side navigation.
  - `MainPanelTabBarComponent`  
    Renders a tab bar in the main panel.
  - `RightPanelTabBarComponent`  
    A tab bar for right panels.
  - `TabbedRightPanelComponent`  
    Provides a tabbed interface for right-side panels.

- **Menus:**
  - Components in the menus folder (exported via [LAYOUT_MENUS_EXPORTABLE_COMPONENTS]) render navigation menus or contextual overlays.

- **Windows:**
  - `WindowComponent`  
    The base window component; supports drag, resize, minimise, focus, and removal functionalities.
  - `ExampleWindowComponent`  
    A sample implementation demonstrating window functionality.
  - `WindowLayoutDockComponent`  
    Renders a dock that holds minimized or background windows.
  - `WindowDockButtonComponent`  
    A button within the dock to restore or interact with a window.
  - *(Optional)* Additional window components can be added as needed.

- **Tables:**
  - Components under the tables folder provide pre-styled tables for rendering data.
  
All components are designed using responsive layouts and connect to state via the above facades.

---

## Services

Services manage overlays, notifications, and layout persistence.

### Window/Overlay Services
- **ZWPWindowOverlayService:**  
  *Methods:*
  - `addWindowOverlay(windowEntity: WindowEntity): boolean`  
    Adds an overlay for the given window entity; returns true if added successfully.
  - Additional helper methods to normalise window positions and manage CSS overlays.

### Menu Overlay & Snackbar Services
- **ZWPMenuOverlayService:**  
  *Methods:*
  - `registerMenuComponent(menuComponent: ComponentType<any>): void`  
    Registers a menu component type.
  - Methods to open, position, and close menu overlays.
- **ZWPSnackbarService:**  
  *Methods:*
  - `showSnackbar(message: string, duration?: number): void`  
    Displays a transient notification (snackbar) with the provided message and duration.

Services are injected via factory providers in the module configuration.

---

## Building and Usage

1. **Building the Package:**
    ```sh
    nx build platform.layout
    ```
2. **Running Tests:**
    ```sh
    nx test platform.layout
    ```
3. **Usage in an Angular Project:**
    Import the module in your Angular module:
    ```typescript
    import { ZWPLayoutModule } from '@zwp/platform.layout';

    @NgModule({
      imports: [
        ZWPLayoutModule.forRoot({
          requirePanelLayout: true,
          requireWindowLayout: true,
          requireMenuLayout: true,
          // Additional configuration options...
        })
      ]
    })
    export class AppModule {}
    ```
4. **Interacting with State:**
    Example for using the window facade:
    ```typescript
    import { Component } from '@angular/core';
    import { ZWPWindowLayoutFacade } from '@zwp/platform.layout';

    @Component({
      selector: 'app-window-demo',
      template: `<button (click)="createNewWindow()">Create New Window</button>`
    })
    export class WindowDemoComponent {
      constructor(private windowLayoutFacade: ZWPWindowLayoutFacade) {}

      createNewWindow() {
        const newWindow = {
          label: 'New Window',
          componentName: 'ExampleWindowComponent',
          position: { top: '25vh', left: '25vw', width: '50vw', height: '50vh' }
        };
        this.windowLayoutFacade.addWindow(newWindow);
      }
    }
    ```

---

## Conclusion

The **platform.layout** package delivers a comprehensive solution for managing consistent, responsive, and dynamic layouts in your Angular application. With complete NgRx state management (detailed actions, effects, reducers, selectors, and facades), an extensive set of UI components, and supporting services for overlays and notifications, this package provides a scalable foundation for modern application layouts.
