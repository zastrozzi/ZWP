---
id: platform.animations
title: Platform - Animations
sidebar_label: Animations
---
# Platform Animations Documentation

This document details the **platform.animations** library. The module provides a collection of reusable animation definitions (actions, entrances, and exits), directives to manage animation triggers, components to wrap animated content, and services to control animation behavior programmatically.

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Modules](#modules)
4. [Directives](#directives)
5. [Components](#components)
6. [Animations](#animations)
    - [Action Animations](#action-animations)
    - [Entrance Animations](#entrance-animations)
    - [Exit Animations](#exit-animations)
7. [Services](#services)
8. [Configuration and Testing](#configuration-and-testing)
9. [Building and Usage](#building-and-usage)
10. [Conclusion](#conclusion)

---

## Overview

The **platform.animations** package is designed to add dynamic, reusable animations in your Angular projects. It defines a comprehensive set of animation definitions—including actions such as _flip_, _bounce_, _tada_; entrances (e.g. _fadeIn_, _rollIn_) and exits (e.g. _fadeOut_, _zoomOut_)—and provides directives and components to easily integrate these animations in your templates. The module leverages Angular’s animations API along with configuration from the common package to ensure consistency and simplicity.

---

## Directory Structure

A high-level overview of the project structure:

- **Root Files:**  
  - Configuration files such as `.eslintrc.json`, `jest.config.ts`, `ng-package.json`, `package.json`, `project.json`, and TypeScript configuration files.
  - [README.md](packages/platform/animations/README.md) — Brief summary of the library.

- **src/**  
  - **index.ts:** Re-exports the module’s features.
  - **lib/**  
    - **zwp.animations.module.ts:** Main Angular module that bundles the animations components and directives.
    - **animations/**  
      - Contains subfolders for animation definitions:
        - **actions/** (e.g. [bounce.ts](packages/platform/animations/src/lib/animations/actions/bounce.ts), [flip.ts](packages/platform/animations/src/lib/animations/actions/flip.ts), [tada.ts](packages/platform/animations/src/lib/animations/actions/tada.ts))
        - **entrances/** (e.g. [bounce-in.ts](packages/platform/animations/src/lib/animations/entrances/bounce-in.ts), [fade-in.ts](packages/platform/animations/src/lib/animations/entrances/fade-in.ts))
        - **exits/** (e.g. [fade-out.ts](packages/platform/animations/src/lib/animations/exits/fade-out.ts), [zoom-out.ts](packages/platform/animations/src/lib/animations/exits/zoom-out.ts))
    - **components/**  
      - [animation.component.ts](packages/platform/animations/src/lib/components/animation.component.ts) — Wraps content to apply animations.
    - **directives/**  
      - [animation.container.directive.ts](packages/platform/animations/src/lib/directives/animation.container.directive.ts) — Sets up elements as animation containers.
      - [animation.item.directive.ts](packages/platform/animations/src/lib/directives/animation.item.directive.ts) — Manages individual animated items.
    - **model/**  
      - Contains type definitions and configuration interfaces (e.g. [zwp.animations-module.config.ts](packages/platform/animations/src/lib/model/zwp.animations-module.config.ts)) and animation speeds ([zwp.animation.speed.ts](packages/platform/animations/src/lib/model/zwp.animation.speed.ts)).
    - **services/**  
      - [zwp.animation.service.ts](packages/platform/animations/src/lib/services/zwp.animation.service.ts) — Provides methods for triggering animations, handling view changes, and integrating scroll/intersection events.
    - **utils/**  
      - Helper functions and factories such as `zwp.animation.trigger-mode.factory`.

---

## Modules

### ZWPAnimationsModule
- **Purpose:**  
  Bundles all animation-related components, directives, and (re)usable animation definitions.
- **Setup:**  
  Import this module into your Angular application. It includes a static `init()` method to configure the trigger mode (e.g. using Intersection Observer or scrolling-based triggers).  
  See [zwp.animations.module.ts](packages/platform/animations/src/lib/zwp.animations.module.ts) for details.

---

## Directives

### ZWPAnimationContainerDirective
- **File:** [animation.container.directive.ts](packages/platform/animations/src/lib/directives/animation.container.directive.ts)
- **Purpose:**  
  Marks an element as an animation container. This directive sets up the view rectangle and passes configuration options (such as offsets) to the animation service.
- **Usage Notes:**  
  It monitors changes (using `ngOnChanges`) and cleans up on destroy by deregistering options with the animation service.

### ZWPAnimationItemDirective
- **File:** [animation.item.directive.ts](packages/platform/animations/src/lib/directives/animation.item.directive.ts)
- **Purpose:**  
  Controls individual animated items.  
  - Listens to input changes (e.g. animation progress).
  - Utilizes lifecycle hooks (ngOnInit, ngOnChanges, ngOnDestroy) to initialize and reset the animation player.
- **Usage Notes:**  
  Designed to be used with container directives to trigger animations based on scrolling or intersection events.

---

## Components

### ZWPAnimationComponent
- **File:** [animation.component.ts](packages/platform/animations/src/lib/components/animation.component.ts)
- **Purpose:**  
  A wrapper component that applies animations to its content.  
  - Accepts inputs controlling timing, delay, pause, replay, and animation type.
  - Emits events when an animation starts and completes.
- **Key Features:**  
  - Uses HostBindings to connect with Angular’s animation trigger.
  - Relies on ZWPAnimationService to determine animation “idle” and “play” states.
  - Optimized with OnPush change detection to enhance performance.

---

## Animations

The animations library is composed of pre-defined animation definitions. These are grouped into three main categories:

### Action Animations
- **What It Is:**  
  Animations triggered by user or programmatic actions (e.g. clicks).
- **Examples:**
  - **Bounce:** [bounce.ts](packages/platform/animations/src/lib/animations/actions/bounce.ts) defines keyframes that create a bouncing effect.
  - **Flip:** [flip.ts](packages/platform/animations/src/lib/animations/actions/flip.ts) includes multiple variations such as `flipXVisible`, `flipYFromHidden`, etc.
  - **Tada:** [tada.ts](packages/platform/animations/src/lib/animations/actions/tada.ts) applies a lively scale and rotation effect.

### Entrance Animations
- **What It Is:**  
  Animations used to animate elements as they enter the view.
- **Examples:**
  - **Fade In:** [fade-in.ts](packages/platform/animations/src/lib/animations/entrances/fade-in.ts) smoothly transitions elements from transparent to visible.
  - **Bounce In:** [bounce-in.ts](packages/platform/animations/src/lib/animations/entrances/bounce-in.ts) gives a bouncing entrance effect.
  - **Roll In / Flip In:** Other entrance variations like `rollIn` and `flipInX`/`flipInY` provide dynamic reveals.

### Exit Animations
- **What It Is:**  
  Animations for gracefully removing elements from view.
- **Examples:**
  - **Fade Out:** [fade-out.ts](packages/platform/animations/src/lib/animations/exits/fade-out.ts) transitions elements to invisibility.
  - **Zoom Out:** [zoom-out.ts](packages/platform/animations/src/lib/animations/exits/zoom-out.ts) scales elements down while fading out.
  - **Bounce Out:** [bounce-out.ts](packages/platform/animations/src/lib/animations/exits/bounce-out.ts) creates a dramatic exit with a bounce effect.

All animation definitions are consolidated and re-exported via [animations/index.ts](packages/platform/animations/src/lib/animations/index.ts).

---

## Services

### ZWPAnimationService
- **File:** [zwp.animation.service.ts](packages/platform/animations/src/lib/services/zwp.animation.service.ts)
- **Purpose:**  
  Centralizes animation control across the module.
- **Key Responsibilities:**
  - Configures animation options and initializes view rectangle parameters.
  - Provides trigger functions that decide when an element should animate based on scroll or intersection.
  - Manages animation players, resets, and cleans up on destroy.
- **How It Works:**  
  Uses Angular CDK’s ScrollDispatcher and ViewportRuler to observe scroll events. It also supports using an Intersection Observer when configured via the module’s trigger mode.

---

## Configuration and Testing

- **Linting and Formatting:**  
  Managed using `.eslintrc.json` and Prettier files.
- **Unit Testing:**  
  Jest is configured via `jest.config.ts` and `tsconfig.spec.json`. A dedicated [test-setup.ts](packages/platform/animations/src/test-setup.ts) is used to initialize test environments.
- **Nx Targets:**  
  The [project.json](packages/platform/animations/project.json) file defines build, test, and lint targets:
  - Build: `nx build platform.animations`
  - Test: `nx test platform.animations`
  - Lint: `nx lint platform.animations`

---

## Building and Usage

1. **Build the Package:**
    ```sh
    nx build platform.animations
    ```

2. **Run Tests:**
    ```sh
    nx test platform.animations
    ```

3. **Usage in an Angular Project:**
    Import the module and configure it in your application module:
    ```typescript
    import { ZWPAnimationsModule } from '@zwp/platform.animations';

    @NgModule({
      imports: [
        ZWPAnimationsModule.init('intersectionObserver'),
        // other imports...
      ]
    })
    export class AppModule {}
    ```

---

## Conclusion

The **platform.animations** package provides a rich set of tools to add dynamic visual effects to your application. It combines pre-defined animations with customizable directives, components, and services to seamlessly integrate animated behavior—whether for simple entrance effects or complex action-driven sequences. This documentation aims to serve as a comprehensive guide to understanding, using, and extending the animations functionality in our projects.