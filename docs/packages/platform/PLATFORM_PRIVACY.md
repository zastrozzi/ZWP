# Platform Privacy Documentation

This document details the **platform.privacy** library. This package provides tools to help manage user privacy and consent within your Angular application. It leverages NgRx for state management (with actions, effects, reducers, selectors, and facades), defines API routes and configuration tokens, and offers reusable UI components and services for handling cookie consent, IP location tracking, and related privacy tasks.

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Modules](#modules)
4. [State Management](#state-management)
   - [Identifiers & State Assembly](#identifiers--state-assembly)
   - [Actions](#actions)
     - [Cookie Consent Actions](#cookie-consent-actions)
     - [IP Location Actions](#ip-location-actions)
   - [Effects](#effects)
   - [Reducers](#reducers)
   - [Selectors](#selectors)
   - [Facades](#facades)
     - [Detailed Facades and Their Methods](#detailed-facades-and-their-methods)
5. [Models & Configuration](#models--configuration)
6. [Services](#services)
   - [IP Location Service Methods](#ip-location-service-methods)
   - [Cookie Service Methods](#cookie-service-methods)
7. [Components](#components)
8. [Building and Usage](#building-and-usage)
9. [Conclusion](#conclusion)

---

## Overview

The **platform.privacy** package assists with managing user privacy preferences by providing:
- **Cookie Consent:** Modules, state, and UI components (e.g. a cookie banner) to capture and update consent for different cookie categories.
- **IP Location:** Services and state management to detect user location via various providers.
- **State Management:** Uses NgRx to manage privacy-related state (cookie consent and IP location) via actions, effects, reducers, selectors, and facades.
- **Services:** Includes live implementations (e.g. for IP location using the IPInfo API or MaxMind) and utility methods for managing cookies.
- **UI Components:** Reusable components such as the Cookie Banner component to display consent UI.

---

## Directory Structure

A high-level overview of the privacy library layout (located in `/packages/platform/privacy`):

- **Root Files:**  
  - `.eslintrc.json`, `jest.config.ts`, `ng-package.json`, `package.json`, `project.json`
  - TypeScript configs: `tsconfig.json`, `tsconfig.lib.json`, `tsconfig.lib.prod.json`, `tsconfig.spec.json`
  - [README.md](packages/platform/privacy/README.md)

- **src/**  
  - `index.ts` – Main entry point re-exporting the module and public APIs.
  - `test-setup.ts` – Jest test configuration.
  - **lib/**  
    - **+state/**  
      - `identifiers.ts` – Defines namespaced keys (e.g. `PLATFORM_PRIVACY_ACTION_IDENTIFIER`, `IP_LOCATION_STATE_FEATURE_KEY`, `COOKIE_CONSENT_STATE_FEATURE_KEY`).
      - **actions/** – Contains actions for cookie consent and IP location (e.g. `cookie-consent.actions.ts`, `ip-location.actions.ts`).
      - **effects/** – Implements side effects such as rehydration and triggering IP location calls (e.g. `cookie-consent.effects.ts`, `ip-location.effects.ts`).
      - **reducers/** – Reducers update state for cookie consent and IP location.
      - **selectors/** – Selectors to derive slices of privacy state.
      - **facades/** – Exposes a high-level API (e.g. `ZWPPrivacyFacade`) for interacting with privacy-related state.
    - **components/**  
      - Contains UI components such as `cookie-banner.component.ts` and an index file exporting them.
    - **directives/**  
      - (May include any custom directives for privacy UIs)
    - **model/**  
      - Contains models and configuration tokens (e.g. `tokens.ts`, `config/` folder, and IP location models).
    - **modules/**  
      - Contains the core module definition (e.g. `zwp.privacy.module.ts`).
    - **services/**  
      - Contains service implementations:
        - `zwp.ip-location.service.ts` for IP location queries.
        - `zwp.cookie.service.ts` for cookie management.
    - **utils/**  
      - Utility functions (e.g. for handling cookie strings).

---

## Modules

### ZWPPrivacyModule
- **Purpose:**  
  The primary Angular module for privacy management. It sets up state slices (via NgRx) for cookie consent and IP location, registers effects and facades, and declares exportable components such as the cookie banner.
- **Setup:**  
  Defined in [zwp.privacy.module.ts](packages/platform/privacy/src/lib/modules/zwp.privacy.module.ts), it imports common modules and provides configuration using the `ZWP_PRIVACY_MODULE_ROOT_CONFIG` injection token.
- **Configuration:**  
  The module’s `forRoot()` method accepts a configuration object of type `ZWPPrivacyModuleRootConfig` to enable or disable IP location tracking and configure cookie banner options.

---

## State Management

### Identifiers & State Assembly
- **Identifiers:**  
  Defined in [identifiers.ts](packages/platform/privacy/src/lib/+state/identifiers.ts), keys include:
  - `PLATFORM_PRIVACY_ACTION_IDENTIFIER`
  - `IP_LOCATION_STATE_FEATURE_KEY`
  - `COOKIE_CONSENT_STATE_FEATURE_KEY`
- **State Assembly:**  
  Privacy state is assembled from reducers (e.g. `ipLocationReducer` and `cookieConsentReducer`) and re-exported via a central state index.

### Actions

Actions are grouped into two main domains:

#### Cookie Consent Actions
- **registerCookie:**  
  Registers a cookie for consent tracking.  
  *Payload:* Name, category, and description.  
  *Defined in:* `cookie-consent.actions.ts`
- **setCookieStatus:**  
  Sets the consent status (ALLOW/DENY) for a specific cookie.  
- **setMultipleCookieStatus:**  
  Updates the consent status for multiple cookies at once.
- **setCategoryStatus:**  
  Updates the consent status for a whole category (e.g. ANALYTICS, FUNCTIONAL).  
- **resetPreferences:**  
  Clears all cookie consent preferences.
- **confirmPreferences:**  
  Confirms the current cookie preferences.
- **showBanner / hideBanner:**  
  Actions to show or hide the cookie consent banner.

#### IP Location Actions
- **locateUserRequest:**  
  Initiates a request to determine the user’s location based on their IP address.
- **locateUserSuccess:**  
  Dispatched upon successful retrieval of IP location data.  
- **locateUserFailure:**  
  Dispatched when an error occurs during IP location service calls.

### Effects
- **Purpose:**  
  Effects listen for privacy actions and perform asynchronous tasks:
  - In `cookie-consent.effects.ts`: Trigger callbacks when cookie status changes or delay preference resets.
  - In `ip-location.effects.ts`: Call the IP location service (using different providers such as IPInfo, MaxMind, or browser Intl) and dispatch success/failure actions.
- **Implementation:**  
  Effects use RxJS operators (`switchMap`, `map`, `catchError`, `delay`, `withLatestFrom`) to coordinate API calls and state rehydration.

### Reducers
- **Purpose:**  
  Reducers update the privacy state immutably:
  - The cookie consent reducer manages consent statuses for each cookie and category.
  - The IP location reducer stores user location details such as IP, city, region, country, and timezone.
- **Implementation:**  
  Built using NgRx’s `createReducer` and `on` functions.

### Selectors
- **Purpose:**  
  Selectors derive useful data from the privacy state:
  - **IPLocationSelectors:** Retrieve fields like `ip`, `city`, `country`, `timezone`, etc.
  - **CookieConsentSelectors:** Provide data on consent statuses, last updated timestamp, and categorization of cookies.
- **Implementation:**  
  Utilize NgRx’s `createSelector` to produce memoized slices.

### Facades

Facades provide a simplified API for components to interact with privacy state. The primary facade is `ZWPPrivacyFacade`.

#### Detailed Facades and Their Methods

- **ZWPPrivacyFacade:**  
  *Observables:*
  - `ipLocationLastUpdated$`: Emits the last updated timestamp for IP location.
  - `ipLocationIP$`, `ipLocationHostname$`, `ipLocationCity$`, `ipLocationRegion$`, `ipLocationCountry$`, `ipLocationLatitude$`, `ipLocationLongitude$`, `ipLocationOrg$`, `ipLocationPostCode$`, `ipLocationTimezone$`: Streams of IP location data.
  - `cookieConsentItems$`: Emits all cookie consent items.
  - `cookieConsentItemsByCategory$`: Groups cookie consent items by category.
  - `cookieConsentEssentialStatus$`, `cookieConsentAnalyticsStatus$`, `cookieConsentPersonalisationStatus$`, `cookieConsentMarketingStatus$`, `cookieConsentPerformanceStatus$`, `cookieConsentFunctionalStatus$`, `cookieConsentUncategorisedStatus$`: Streams for individual category statuses.
  - `cookieConsentHasUnset$`: Emits a boolean indicating if any cookies have an unset status.
  
  *Methods:*
  - `locateUser(): void`  
    Dispatches an action to initiate IP location detection.
  - `getCookies(): ZWPCookie[]`  
    Returns the list of cookies from the cookie service.
  - `registerCookie(name: string, category: ZWPCookieCategory, description: string, allowCallback: () => void, denyCallback: () => void): void`  
    Dispatches a registerCookie action and registers consent callbacks via the cookie service.
  - `deleteCookie(name: string): void`  
    Deletes a cookie by name using the underlying cookie service.
  - `setCookieStatus(name: string, consentStatus: ZWPCookieStatus): void`  
    Dispatches an action to update the status of a specific cookie.
  - `setMultipleCookieStatus(names: string[], consentStatus: ZWPCookieStatus): void`  
    Dispatches an action to update statuses for several cookies.
  - `setCategoryStatus(category: ZWPCookieCategory, consentStatus: ZWPCookieStatus): void`  
    Dispatches an action to update the status for all cookies within a category.
  - `resetCookieConsent(): void`  
    Dispatches an action to reset all cookie consent preferences.
  - `confirmCookiePreferences(): void`  
    Dispatches an action to confirm the current cookie settings.
  - `showCookieConsentBanner(): void`  
    Calls the cookie service to open the consent banner overlay.
  - `hideCookieConsentBanner(): void`  
    Calls the cookie service to close the consent banner overlay.
  - `triggerCookieConsentCallback(name: string, consentStatus: ZWPCookieStatus): void`  
    Invokes the registered callback for a given cookie based on the status.

---

## Models & Configuration

- **Models:**  
  Defined in the `model/` folder, these include data structures for:
  - Cookie properties, cookie categories (e.g. PERSONALISATION, ANALYTICS, MARKETING, PERFORMANCE, FUNCTIONAL, UNCATEGORISED).
  - IP location responses (including variants like `IPInfoStandardResponse`, `IPInfoFreeResponse`).
- **Configuration Tokens:**  
  The configuration for the privacy module is defined via `ZWPPrivacyModuleRootConfig` (see [privacy-module.root.config.ts](packages/platform/privacy/src/lib/model/config/privacy-module.root.config.ts)). It configures options like:
  - Whether IP location tracking is enabled.
  - Which IP location API provider to use.
  - API keys for providers (e.g. IPInfo).
  - Cookie banner configuration (colors, texts, etc).

---

## Services

The privacy package provides two primary services:

### IP Location Service Methods

- **ZWPIPLocationService:**  
  *Methods:*
  - `getIPInfoLocationFromIPInfo(): Observable<IPInfoResponse>`  
    Uses the IPInfo API with the configured API key to retrieve location data.
  - `getIPInfoLocationFromIPInfoDB(): Observable<IPInfoResponse>`  
    Retrieves location data using an alternative IPInfo endpoint (if applicable).
  - `getIPInfoLocationFromMaxMind(): Observable<IPInfoResponse>`  
    Retrieves location information via the MaxMind API.
  - `getIPInfoLocationFromBrowserIntlTimezone(): Observable<ZWPIANATimezone>`  
    Uses the browser’s Intl API to deduce the user’s timezone.
  - `makeIPInfoHeaders(accessToken: string): HttpHeaders`  
    Generates HTTP headers (with JSON content type and authorization) for API calls.

### Cookie Service Methods

- **ZWPCookieService:**  
  *Methods:*
  - `getCookie(init?: string | ZWPCookieStoreGetOptions): ZWPCookie | undefined`  
    Returns a single cookie matching the given name or options.
  - `getCookies(init?: string | ZWPCookieStoreGetOptions): ZWPCookie[]`  
    Retrieves an array of cookies filtered by name or options.
  - `setCookie(init: Partial<ZWPCookieListItem> | string, possibleValue?: string): void`  
    Sets a cookie using provided parameters; handles attributes like SameSite (using the `ZWPCookieSameSite` enum).
  - `deleteCookie(init: string | ZWPCookieStoreDeleteOptions): void`  
    Deletes a cookie by setting its expiration to 0 and updating its status.
  - `registerCookieConsentCallbacks(name: string, allowCallback: () => void, denyCallback: () => void): void`  
    Registers callbacks for a cookie when consent is provided or denied.
  - `triggerCookieConsentCallback(name: string, status: ZWPCookieStatus): void`  
    Invokes the corresponding callback for a cookie based on its consent status.
  - `openBanner(): void`  
    Opens the cookie consent banner overlay using Angular CDK Overlay.
  - `closeBanner(): void`  
    Closes and disposes of the banner overlay.

---

## Components

The privacy package currently provides the following reusable component:

- **ZWPCookieBannerComponent:**  
  A responsive cookie consent banner that:
  - Displays consent options (allow, deny, and customise).
  - Uses Angular Material buttons and animations to show/hide detailed cookie category controls.
  - Invokes methods on the privacy facade (e.g. `confirmCookiePreferences()`, `hideCookieConsentBanner()`, `toggleCategoriesShown()`) based on user interaction.
  - Accepts configuration from `ZWPPrivacyModuleRootConfig` for styling and texts.

Additional components may be added in the future as needed.

---

## Building and Usage

1. **Building the Package:**
    ```sh
    nx build platform.privacy
    ```
2. **Running Tests:**
    ```sh
    nx test platform.privacy
    ```
3. **Usage in an Angular Project:**
    Import the module and provide configuration:
    ```typescript
    import { ZWPPrivacyModule } from '@zwp/platform.privacy';

    @NgModule({
      imports: [
        ZWPPrivacyModule.forRoot({
          ipLocationEnabled: true,
          ipLocationAPIProvider: /* e.g. ZWPPrivacyModuleIPLocationAPIProvider.IP_INFO */,
          ipInfoApiKey: 'your-ipinfo-api-key',
          ipInfoDBApiKey: 'your-alt-ipinfo-key',
          cookieBanner: {
            rejectButtonText: 'Reject All',
            saveButtonText: 'Customise',
            // other banner configuration options...
          }
        })
      ]
    })
    export class AppModule {}
    ```
4. **Interacting with State:**
    Inject the privacy facade into your components:
    ```typescript
    import { Component } from '@angular/core';
    import { ZWPPrivacyFacade } from '@zwp/platform.privacy';

    @Component({
      selector: 'app-cookie-demo',
      template: `<button (click)="acceptAll()">Accept All Cookies</button>`
    })
    export class CookieDemoComponent {
      constructor(private privacyFacade: ZWPPrivacyFacade) {}

      acceptAll() {
        // Example: set all cookie categories to ALLOW and confirm preferences
        this.privacyFacade.setCategoryStatus('ANALYTICS', 'ALLOW');
        this.privacyFacade.setCategoryStatus('FUNCTIONAL', 'ALLOW');
        this.privacyFacade.confirmCookiePreferences();
        this.privacyFacade.hideCookieConsentBanner();
      }
    }
    ```

---

## Conclusion

The **platform.privacy** package provides a comprehensive solution for managing user privacy and consent in your Angular application. With robust NgRx-powered state management (actions, effects, reducers, selectors, and facades), well-defined models and configuration, versatile services for IP location and cookie handling, and a responsive cookie banner UI component, this package offers a scalable and maintainable architecture for privacy compliance.
