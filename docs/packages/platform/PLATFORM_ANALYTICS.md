# Platform Analytics Documentation

This document details the **platform.analytics** library. The module is built using Angular and Nx tooling, and it supports Google Analytics integration along with additional tracking functionalities for your application.

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Modules](#modules)
4. [Directives](#directives)
5. [Services](#services)
6. [Models](#models)
7. [Configuration and Testing](#configuration-and-testing)
8. [Building and Usage](#building-and-usage)
9. [Conclusion](#conclusion)

---

## Overview

The **platform.analytics** package is designed to centralize analytics functionality such as tracking events, page views, and custom metrics using Google Analytics. It is divided into primary and secondary entry points:

- The main [analytics package](packages/platform/analytics/README.md) offers core functionality.
- The Google Analytics secondary entry point ([google](packages/platform/analytics/google/README.md)) provides directives, services, and models specifically for integrating with Google Analytics.

Key features include:
- **Directives:** Enhance DOM elements to report events automatically.
- **Services:** Manage and dispatch tracking events with error handling.
- **Models & Interfaces:** Define settings, tokens, commands, and event enums for type safety.
- **Modules:** Bundle and expose analytics functionality across the application.

---

## Directory Structure

The analytics package is organized as follows:

- **Root Files:**  
  - `.eslintrc.json`, `jest.config.ts`, `ng-package.json`, `package.json`, `project.json`, and various `tsconfig` files.
  - **README.md:** Provides a brief overview of the analytics library.

- **google/**  
  A secondary entry point that focuses on Google Analytics integration.
  - **ng-package.json & README.md** – Package metadata and usage instructions.
  - **src/**  
    - **index.ts:** Aggregates exports from subdirectories.
    - **lib/**  
      - **directives/**  
        - `google-analytics.event.directive.ts`  
          Enhances elements to trigger analytics events.
        - `google-analytics.event-category.directive.ts`  
          Allows definition of event categories.
      - **initialisers/**  
        Contains initialiser functions which attach analytics functionality to Angular’s bootstrapping process (e.g. router-based page view tracking in [`google.analytics.router.initialiser.ts`](packages/platform/analytics/google/src/lib/initialisers/google.analytics.router.initialiser.ts)).
      - **model/**  
        - Defines interfaces and tokens (e.g. tracking settings, routing settings, tokens for GTag, data layer, etc.). See [tokens index](packages/platform/analytics/google/src/lib/model/tokens/index.ts) for export details.
        - Enums for event names (see [`common.google-analytics.4.action.event-name.ts`](packages/platform/analytics/google/src/lib/model/enums/common.google-analytics.4.action.event-name.ts)).
      - **modules/**  
        - `zwp.google-analytics.module.ts`  
          Exposes and configures Google Analytics functionality.
        - `zwp.google-analytics.router.module.ts`  
          Integrates page view tracking with Angular Router.
      - **services/**  
        - `google-analytics.service.ts`  
          Contains functions to send events, page views, exceptions, and more.
- **src/**  
  Provides an alternative export path with core modules and test-setup configurations.
  
---

## Modules

### ZWPGoogleAnalyticsModule
- **Purpose:**  
  Provides the core Google Analytics components including directives and initialisers.
- **Configuration:**  
  Use the static `forRoot()` method to pass in settings ([ZWPGoogleAnalyticsSettings](packages/platform/analytics/google/src/lib/model/interfaces/google-analytics.settings.ts)) and register the initialiser ([ZWP_GOOGLE_ANALYTICS_INITIALISER](packages/platform/analytics/google/src/lib/initialisers/google-analytics.initialiser.ts)).
- **Exports:**  
  Re-exports directives found in [GOOGLE_ANALYTICS_EXPORTABLE_DIRECTIVES](packages/platform/analytics/google/src/lib/directives/index.ts).

### ZWPGoogleAnalyticsRouterModule
- **Purpose:**  
  Connects the Angular Router with analytics events. It listens for navigation events to trigger page view tracking.
- **Configuration:**  
  Use the static `forRoot()` method with optional routing settings ([ZWPGoogleAnalyticsRoutingSettings](packages/platform/analytics/google/src/lib/model/interfaces/google-analytics.routing-settings.ts)).
- **Initialiser:**  
  Registers the router initialiser that subscribes to router events ([google.analytics.router.initialiser.ts](packages/platform/analytics/google/src/lib/initialisers/google.analytics.router.initialiser.ts)).

---

## Directives

### ZWPGoogleAnalyticsEventDirective
- **File:** [google-analytics.event.directive.ts](packages/platform/analytics/google/src/lib/directives/google-analytics.event.directive.ts)
- **Purpose:**  
  Attach to any DOM element to capture user interactions such as clicks.
- **Inputs:**  
  - `zwpGoogleAnalyticsEvent` or `zwpGoogleAnalyticsAction` to specify the event name.
  - `zwpGoogleAnalyticsLabel` and `zwpGoogleAnalyticsValue` for additional metadata.
  - `zwpGoogleAnalyticsNativeEvent` allows customization of the native event (defaults to 'click').
- **Implementation:**  
  Adds event listeners on the host element and triggers tracking via the [ZWPGoogleAnalyticsService](packages/platform/analytics/google/src/lib/services/google-analytics.service.ts).  
  See the code excerpts that perform event binding and teardown during `ngOnDestroy`.

### ZWPGoogleAnalyticsEventCategoryDirective
- **File:** [google-analytics.event-category.directive.ts](packages/platform/analytics/google/src/lib/directives/google-analytics.event-category.directive.ts)
- **Purpose:**  
  Used alongside the event directive to define the event category.
- **Inputs:**  
  - `zwpGoogleAnalyticsEventCategory` to set a string category for analytics events.

Both directives are aggregated and exported in the [directives index](packages/platform/analytics/google/src/lib/directives/index.ts).

---

## Services

### ZWPGoogleAnalyticsService
- **File:** [google-analytics.service.ts](packages/platform/analytics/google/src/lib/services/google-analytics.service.ts)
- **Purpose:**  
  Acts as the main interface to interact with Google Analytics.
- **Key Methods:**  
  - `event(...)`: Dispatches an event with parameters for action name, category, label, and value.  
  - `pageView(path: string, title?: string, location?: string, options?: object)`: Sends a page view event to Google Analytics.
  - `exception(description: string, fatal?: boolean)`: Reports exceptions.
  - `appView(...)`: For app-specific views with additional context like app version.
- **Design:**  
  Uses helper functions like `constructOptionsDict` to build parameter objects. It relies on a GTag builder function ([ZWP_GOOGLE_ANALYTICS_GTAG_BUILDER](packages/platform/analytics/google/src/lib/model/tokens/google-analytics.gtag.token)) for constructing and sending commands.
- **Error Handling:**  
  Wraps tracking calls in try-catch blocks and logs errors if in development or if tracing is enabled.

---

## Models

### Interfaces and Settings
- **Google Analytics Settings:**  
  Defined in [google-analytics.settings.ts](packages/platform/analytics/google/src/lib/model/interfaces/google-analytics.settings.ts). Contains properties such as:
  - `trackingCode`: The Google Analytics tracking code.
  - `initCommands`: Commands to initialize tracking.
  - `initDelay`, `uri`, `enableTracing`, and `nonce`.

- **Routing Settings:**  
  Defined in [google-analytics.routing-settings.ts](packages/platform/analytics/google/src/lib/model/interfaces/google-analytics.routing-settings.ts). Provides `include` and `exclude` rules for capturing router events.

### Enums and Tokens
- **Event Enums:**  
  The package exports enums for event names (e.g. [`ZWPCommonGoogleAnalytics4ActionEventName`](packages/platform/analytics/google/src/lib/model/enums/common.google-analytics.4.action.event-name.ts) and others from the auto, ecommerce, and games categories). These ensure consistent naming across the application.
- **Tokens:**  
  Exported through [tokens index](packages/platform/analytics/google/src/lib/model/tokens/index.ts), these include tokens for the GTag builder, settings, routing settings, and data layer. They facilitate dependency injection of analytics configurations.

---

## Configuration and Testing

- **Linting and Formatting:**  
  Managed using `.eslintrc.json` and Prettier configurations.
- **Unit Testing:**  
  Configured via `jest.config.ts` and `tsconfig.spec.json`. The [test-setup.ts](packages/platform/analytics/test-setup.ts) file initializes necessary mocks and environment configurations.
- **Nx Integration:**  
  The [project.json](packages/platform/analytics/project.json) defines targets for building, testing, and linting. Use the following commands:
  - Build: `nx build platform.analytics`
  - Test: `nx test platform.analytics`
  - Lint: `nx lint platform.analytics`

---

## Building and Usage

1. **Build the Package:**
    ```sh
    nx build platform.analytics
    ```

2. **Run Tests:**
    ```sh
    nx test platform.analytics
    ```

3. **Usage in an Angular Project:**
    Import the module as shown below:
    ```typescript
    import { ZWPGoogleAnalyticsModule } from '@zwp/platform.analytics/google';

    @NgModule({
      imports: [
        ZWPGoogleAnalyticsModule.forRoot({
          trackingCode: 'UA-XXXXXXX-X',
          initCommands: [{ command: 'config', values: ['UA-XXXXXXX-X'] }],
          enableTracing: false
        }),
        // or for routing integration:
        ZWPGoogleAnalyticsRouterModule.forRoot({
          include: [/^\/dashboard/],
          exclude: ['/login']
        })
      ]
    })
    export class AppModule { }
    ```

---

## Conclusion

The **platform.analytics** package offers an extensible approach to integrating analytics within your Angular applications by leveraging Google Analytics. It provides:
- **Directives** to capture user events,
- **Services** for dispatching and managing analytics data, and
- **Models & Interfaces** to ensure consistency and type safety.

---
