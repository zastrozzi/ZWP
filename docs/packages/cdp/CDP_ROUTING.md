---
id: cdp.routing
title: Customer Data Platform - Routing
sidebar_label: Routing
---
# Zastrozzi CDP Routing Library Documentation

This document details the **Zastrozzi CDP Routing Library**. This library provides the routing configuration and navigation framework for the Zastrozzi CDP suite. It integrates tightly with Angular Router to manage authenticated layouts, navigation panels, guards, and interceptors. It also aggregates route definitions for various features including home, customers, partner network, HMRC, and more.

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Modules](#modules)
4. [Components](#components)
5. [Guards](#guards)
6. [Interceptors](#interceptors)
7. [Routes](#routes)
8. [Building and Usage](#building-and-usage)
9. [Conclusion](#conclusion)

---

## Overview

The **CDP Routing Library** is designed to provide a flexible and maintainable routing framework for the CDP suite. It includes:
- **Authed Routing:** Routes are guarded by authentication checks so that only authorized users can access protected areas.
- **Navigation Components:** A set of reusable components such as the authed container, utility dock, clipboard utility panels, and notification panels.
- **Route Aggregation:** Combines routes from multiple domains (e.g. partner‑net, enduser, HMRC, reporting) into a cohesive navigation experience.
- **Angular Guards & Interceptors:** Implements route guards (such as the AdminUserAuthGuard) and HTTP interceptors (e.g. for logging) to secure and monitor navigation.

---

## Directory Structure

A high-level overview of the CDP Routing library layout (located in [`/packages/cdp/routing`]({{ site.repo_root_url }}/packages/cdp/routing)):

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
    cdp-routing.module.ts         // Main routing module that imports and configures the routes.
    components/                   // Reusable UI components for layout and navigation.
      authed.container.component.ts
      clipboard.utility-panel.component.ts
      home.component.ts
      notifications.utility-panel.component.ts
      utility-dock.component.ts
      index.ts                    // Re-exports components.
    guards/                       // Route guards to protect routes.
      admin-user-auth.guard.ts
      index.ts                    // Re-exports guards.
    interceptors/                 // Optional HTTP interceptors (e.g. logging).
      // ... interceptor files.
    routes/                       // Folder containing route definitions.
      cdp.routes.ts              // Aggregated routes for CDP features.
      enduser.routes.ts          // Routes specific to enduser features.
      // ... other route files.
```

---

## Modules

### CDPRoutingModule
- **Purpose:**  
  The primary Angular module for the CDP Routing library. It imports all necessary routing configurations and components.
- **Setup:**  
  Defined in `cdp-routing.module.ts`, it imports common modules (e.g. `CommonModule`, Angular Router modules), along with CDP and platform libraries (such as `ZWPCommonModule`, `ZWPLayoutModule`, `ZWPAuthModule`, etc.). It declares all internal routing components and provides additional providers such as logging interceptors when enabled.
- **Configuration:**  
  The module exposes a static `forRoot(enableLogging: boolean)` method which conditionally registers providers (like an HTTP LoggingInterceptor) based on the passed flag.

---

## Components

The routing library offers several reusable UI components that integrate with the navigation framework:

- **AuthedContainerComponent:**  
  Serves as the primary container for all authenticated routes. It handles layout features like side navigation and header display.
- **ClipboardUtilityPanelComponent:**  
  Provides a panel for clipboard functions (e.g. copying route links or data).
- **HomeComponent:**  
  A landing component used in several routing configurations for dashboard or home page views.
- **NotificationsUtilityPanelComponent:**  
  Displays notifications and alerts; can be used as an overlay panel.
- **UtilityDockComponent:**  
  A specialized container that aggregates multiple utility panels for a consistent overlay experience.

These components are re-exported via the internal components index for streamlined imports.

---

## Guards

Routing guards secure the navigation flow. In this library, the primary guard is:

### AdminUserAuthGuard
- **Purpose:**  
  Protects routes by ensuring that only authenticated admin users can access them.
- **Usage:**  
  Applied in routing definitions via `canActivate` and `canActivateChild`.
- **Implementation:**  
  Defined in `admin-user-auth.guard.ts` and re-exported through the `guards/index.ts` file.

---

## Interceptors

Though not the primary focus of routing, HTTP interceptors can be configured to log or modify HTTP requests initiated during route navigation.

- **LoggingInterceptor:**  
  An HTTP interceptor that logs outgoing requests (when enabled via the CDPRoutingModule configuration).

Interceptors are registered in the module via the `HTTP_INTERCEPTORS` provider token.

---

## Routes

The routing library centralizes route definitions in the `/src/lib/routes` folder:

- **cdp.routes.ts:**  
  Aggregates routes for the overall CDP application.  
  Example segments include:
  - The home route (`path: ''`) which displays the `AuthedContainerComponent`.
  - Feature routes such as 'partner-net', 'hmrc', and 'tink'.  
    These routes further spread into child routes defined by feature libraries.
- **enduser.routes.ts:**  
  Defines routes specific to enduser features, including paths like 'employment', 'expenses', 'rebates', etc.
- **Other Route Files:**  
  Additional route definitions are provided for assets, merchant-net, reporting, and CMS features. All routes are protected by guards like `AdminUserAuthGuard` to secure access.

Route data properties are used to configure navigation metadata such as `navTitle`, `navIcon`, and visibility toggles (e.g. `leftNavPanelShown`).

---

## Building and Usage

1. **Building the Library:**
    ```sh
    nx build cdp.routing
    ```
2. **Running Unit Tests:**
    ```sh
    nx test cdp.routing
    ```
3. **Usage in an Angular Project:**
    Import the module into your root module:
    ```ts
    import { CDPRoutingModule } from '@zwp/cdp.routing';

    @NgModule({
      imports: [
        // Other module imports
        CDPRoutingModule.forRoot(true)  // Pass true to enable HTTP logging interceptors if needed.
      ]
    })
    export class AppModule {}
    ```
4. **Integrating Routes:**
    The CDP routing configuration is used within a larger application to manage authenticated routes and dynamic navigation. For example, routes for partner-net or enduser features are imported and integrated into the global routing configuration.

---

## Conclusion

The **CDP Routing Library** provides a robust framework for managing complex routing scenarios within the Zastrozzi CDP suite. By combining secure route guards, reusable navigation components, organized route definitions, and optional HTTP interceptors, this library ensures a consistent and maintainable navigation experience. Customize the routes and components as our project evolves to meet new requirements.

Feel free to update or expand this documentation as our project needs change.