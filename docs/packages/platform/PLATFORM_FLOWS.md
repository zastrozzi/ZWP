# Platform Flows Documentation

This document details the **platform.flows** library. This package manages and executes complex workflow logic within your application. It provides a complete set of tools including state management, API services, model definitions, and (when needed) UI components to capture and operate on flows, flow nodes, flow prompts, and flow containers.

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Modules](#modules)
4. [State Management](#state-management)
   - [Identifiers & State Assembly](#identifiers--state-assembly)
   - [Actions](#actions)
     - [Detailed Flow Node Actions](#detailed-flow-node-actions)
     - [Detailed Flow Container Actions](#detailed-flow-container-actions)
   - [Effects](#effects)
   - [Reducers](#reducers)
   - [Selectors](#selectors)
   - [Facades](#facades)
     - [Detailed Facades and Their Methods](#detailed-facades-and-their-methods)
5. [Models](#models)
6. [Services](#services)
   - [Flow Node Services](#flow-node-services)
     - [Detailed Flow Node Service Methods](#detailed-flow-node-service-methods)
   - [Flow Container Services](#flow-container-services)
     - [Detailed Flow Container Service Methods](#detailed-flow-container-service-methods)
7. [Building and Usage](#building-and-usage)
8. [Conclusion](#conclusion)

---

## Overview

The **platform.flows** package provides a framework for managing complex flows within your application. It supports:
- **Flow Containers:** Logical groupings that encapsulate multiple flow nodes and define entry points.
- **Flow Nodes:** Individual steps or tasks that form the building blocks of a flow, including branching logic via continuations.
- **Flow Prompts:** Mechanisms to capture and process user input within a flow.
- **State Management:** Utilizes NgRx to maintain predictable and testable flow state.
- **API Services:** Both Live and Mock API services support CRUD operations on flows, flow nodes, and containers.

This package is designed to be integrated with your Angular application, supporting both development (with mock APIs) and production (with live APIs) environments.

---

## Directory Structure

A high-level overview of the flows package layout:

- **Root Files:**  
  - Configuration: `.eslintrc.json`, `jest.config.ts`, `ng-package.json`, `package.json`, `project.json`
  - TypeScript configurations: `tsconfig.json`, `tsconfig.lib.json`, `tsconfig.lib.prod.json`, `tsconfig.spec.json`
  - [README.md](packages/platform/flows/README.md)

- **src/**  
  - `index.ts` – Main entry point re-exporting the module.
  - `test-setup.ts` – Jest test configuration.
  - **lib/**  
    - **zwp.flows.module.ts:**  
      Main Angular module that registers state slices and effects.
    - **+state/**  
      - **identifiers.ts:**  
        Provides namespaced keys (e.g. `FLOW_NODE_STATE_FEATURE_KEY`, `FLOW_CONTAINER_STATE_FEATURE_KEY`).
      - **actions/**  
        Contains action definitions for flow nodes, containers, and prompts.
      - **effects/**  
        Manages side effects (e.g. [flow-node.effects.ts](packages/platform/flows/src/lib/+state/effects/flow-node.effects.ts)).
      - **reducers/**  
        Contains reducers that update state immutably (e.g. [flow-container.reducer.ts](packages/platform/flows/src/lib/+state/reducers/flow-container.reducer.ts)).
      - **selectors/**  
        Provides selectors to derive and access slices of the flow state.
      - **facades/**  
        Provides simplified APIs for components to interact with flows state.
    - **model/**  
      Aggregates model definitions including requests, responses, filters, and relationships. For example, [flow-continuation.responses.ts](packages/platform/flows/src/lib/model/responses/flow-continuation.responses.ts) defines continuation models.
    - **services/**  
      Contains API service implementations for flows:
      - **Flow Node API Services:** Live and Mock implementations for flow nodes.
      - **Flow Container API Services:** Live and Mock implementations for flow containers.
    - (Optional) **components/**  
      – UI components, if present, are declared here.

---

## Modules

### ZWPFlowsModule
- **Purpose:**  
  The primary Angular module for the flows package. It wires up state slices and effects using NgRx.
- **Setup:**  
  In [zwp.flows.module.ts](packages/platform/flows/src/lib/zwp.flows.module.ts), state is provided by helper functions such as `createNamespacedFeatureKey`. For example, the flow container state is registered as:
  ```ts
  provideState(
      createNamespacedFeatureKey(
          Identifiers.FLOWS_ACTION_IDENTIFIER,
          Identifiers.FLOW_CONTAINER_STATE_FEATURE_KEY
      ), flowContainerReducer
  )
  ```
- **Configuration:**  
  The module exposes static methods (e.g., `live()` and `mock()`) for setting up API providers based on the current environment.

---

## State Management

The flows package uses NgRx to manage state changes and side effects in a predictable manner.

### Identifiers & State Assembly
- **Identifiers:**  
  [identifiers.ts](packages/platform/flows/src/lib/+state/identifiers.ts) defines keys such as `FLOWS_ACTION_IDENTIFIER`, `FLOW_NODE_STATE_FEATURE_KEY`, and `FLOW_CONTAINER_STATE_FEATURE_KEY` to ensure consistency.
- **State Assembly:**  
  State for flow nodes and containers is composed in individual reducer files and aggregated in an index for easy consumption.

### Actions

Actions trigger state changes. Here we detail the main action groups:

#### Detailed Flow Node Actions
- **createFlowNode:**  
  Initiates the creation of a new flow node.  
  *Payload:* Node details (e.g. title, content, continuation options).  
  *File:* [flow-node.actions.ts](packages/platform/flows/src/lib/+state/actions/flow-node.actions.ts)

- **updateFlowNode:**  
  Triggers an update to an existing flow node.  
  *Payload:* Node ID and updated fields.  
  *File:* [flow-node.actions.ts](packages/platform/flows/src/lib/+state/actions/flow-node.actions.ts)

- **deleteFlowNode:**  
  Initiates removal of a specified flow node.  
  *Payload:* Node ID.  
  *File:* [flow-node.actions.ts](packages/platform/flows/src/lib/+state/actions/flow-node.actions.ts)

- **loadFlowNode:**  
  Requests to load detailed information for a given flow node (used to refresh node data).  
  *File:* [flow-node.actions.ts](packages/platform/flows/src/lib/+state/actions/flow-node.actions.ts)

#### Detailed Flow Container Actions
- **createFlowContainer:**  
  Dispatches an action to create a new flow container.  
  *Payload:* Container details such as name and configuration options.  
  *File:* [flow-container.actions.ts](packages/platform/flows/src/lib/+state/actions/flow-container.actions.ts)

- **updateFlowContainer:**  
  Updates an existing container’s details.  
  *Payload:* Container ID and updates.  
  *File:* [flow-container.actions.ts](packages/platform/flows/src/lib/+state/actions/flow-container.actions.ts)

- **deleteFlowContainer:**  
  Removes a flow container by ID.  
  *File:* [flow-container.actions.ts](packages/platform/flows/src/lib/+state/actions/flow-container.actions.ts)

- **getFlowContainer:**  
  Triggers retrieval of a specific container’s details.  
  *File:* [flow-container.actions.ts](packages/platform/flows/src/lib/+state/actions/flow-container.actions.ts)

- **listFlowContainers:**  
  Requests a listing/pagination of available flow containers.  
  *File:* [flow-container.actions.ts](packages/platform/flows/src/lib/+state/actions/flow-container.actions.ts)

### Effects
- **Purpose:**  
  Effects process asynchronous operations—such as API calls—in response to dispatched actions.
- **Examples:**  
  - In [flow-node.effects.ts](packages/platform/flows/src/lib/+state/effects/flow-node.effects.ts), the effect listens to `createFlowNode` and calls the appropriate API service.  
  - In [flow-container.effects.ts](packages/platform/flows/src/lib/+state/effects/flow-container.effects.ts), similar patterns are used to manage container operations.
- **Implementation:**  
  Effects use RxJS operators like `switchMap`, `catchError`, and `debounceTime` to manage side effects and dispatch subsequent actions.

### Reducers
- **Purpose:**  
  Reducers update the state immutably when actions are dispatched.
- **Examples:**  
  - [flow-container.reducer.ts](packages/platform/flows/src/lib/+state/reducers/flow-container.reducer.ts) handles state updates when container actions occur.
  - [flow-node.reducer.ts](packages/platform/flows/src/lib/+state/reducers/flow-node.reducer.ts) does likewise for flow nodes.
- **Implementation:**  
  Built using `createReducer` and `on` functions from NgRx.

### Selectors
- **Purpose:**  
  Selectors derive and expose slices of the flow state, e.g. list of containers, selected node details, or pagination info.
- **Examples:**  
  - Selector files under [selectors/](packages/platform/flows/src/lib/+state/selectors/) allow UI components to subscribe to desired state parts via Observables.

### Facades

Facades provide an abstraction layer over NgRx so components can interact with the flows state easily.

#### Detailed Facades and Their Methods
- **FlowNodeFacade:**  
  *Methods include:*  
  - `createNode(payload: FlowNodePayload): void` – Dispatches the `createFlowNode` action.  
  - `updateNode(nodeId: string, updates: Partial<FlowNodePayload>): void` – Dispatches `updateFlowNode`.  
  - `deleteNode(nodeId: string): void` – Dispatches `deleteFlowNode`.  
  - `loadNode(nodeId: string): Observable<FlowNode>` – Returns an Observable for the node details using selectors.

- **FlowContainerFacade:**  
  *Methods include:*  
  - `createContainer(payload: FlowContainerPayload): void` – Dispatches `createFlowContainer`.  
  - `updateContainer(id: string, updates: Partial<FlowContainerPayload>): void` – Dispatches `updateFlowContainer`.  
  - `deleteContainer(id: string): void` – Dispatches `deleteFlowContainer`.  
  - `getContainer(id: string): Observable<FlowContainer>` – Returns the container details via an appropriate selector.  
  - `listContainers(): Observable<FlowContainer[]>` – Subscribes to state slices containing the container list.

*Note:* These facades subscribe to relevant selectors (e.g. for loading status, data, and error messages) and dispatch corresponding actions, thereby simplifying component code.

---

## Models

Models in the flows package define the data structures across the package:
- **Flow Node Models:**  
  Represent individual nodes with attributes like header, headline, content, and continuation arrays (e.g. defined in [flow-node.responses.ts](packages/platform/flows/src/lib/model/responses/flow-node.responses.ts)).
- **Flow Container Models:**  
  Represent containers grouping flow nodes (e.g. [flow-container.responses.ts](packages/platform/flows/src/lib/model/responses/flow-container.responses.ts)).
- **Flow Prompt Models:**  
  Define models for user prompts within flows.
- **Filters and Requests:**  
  Detailed structures for query filters and API requests exist under `model/filters` and `model/requests`.
- **Aggregation:**  
  [model/index.ts](packages/platform/flows/src/lib/model/index.ts) re-exports all flow models.

---

## Services

The flows package provides API services for backend interactions.

### Flow Node Services

#### Detailed Flow Node Service Methods
- **Live API Service – FlowNodeLiveAPIService:**  
  *Methods include:*  
  - `addNode(payload: FlowNodePayload): Observable<FlowNodeResponse>`  
    – Calls the live endpoint to create a new flow node.
  - `getNodeById(nodeId: string): Observable<FlowNodeResponse>`  
    – Fetches details for the specified flow node.
  - `updateNode(nodeId: string, updates: Partial<FlowNodePayload>): Observable<FlowNodeResponse>`  
    – Updates node data on the backend.
  - `removeNode(nodeId: string): Observable<void>`  
    – Deletes the specified flow node.
  
- **Mock API Service – FlowNodeMockAPIService:**  
  Provides a simulation of the above methods returning static or delayed responses for testing.

### Flow Container Services

#### Detailed Flow Container Service Methods
- **Live API Service – FlowContainerLiveAPIService:**  
  *Methods include:*  
  - `createContainer(payload: FlowContainerPayload): Observable<FlowContainerResponse>`  
    – Invokes the live backend to create a container.
  - `getContainerById(id: string): Observable<FlowContainerResponse>`  
    – Fetches container details for a given ID.
  - `updateContainer(id: string, updates: Partial<FlowContainerPayload>): Observable<FlowContainerResponse>`  
    – Updates container data on the live endpoint.
  - `listContainers(params?: ContainerQueryParams): Observable<FlowContainerResponse[]>`  
    – Retrieves a list of containers (with pagination or filters if provided).
  - `deleteContainer(id: string): Observable<void>`  
    – Calls the API to delete the container.
  
- **Mock API Service – FlowContainerMockAPIService:**  
  Simulates API calls as above, providing stubbed responses for development and testing.

*Configuration:*  
Both live and mock API services are wired through the module’s provider configuration in [zwp.flows.module.ts](packages/platform/flows/src/lib/zwp.flows.module.ts) using static methods `live()` or `mock()`.

---

## Building and Usage

1. **Build the Package:**
    ```sh
    nx build platform.flows
    ```
2. **Run Tests:**
    ```sh
    nx test platform.flows
    ```
3. **Usage in an Angular Project:**
    Import the module and configure the appropriate API providers:
    ```typescript
    import { ZWPFlowsModule } from '@zwp/platform.flows';

    @NgModule({
      imports: [
        // For production:
        ZWPFlowsModule.live(),
        // For development/testing:
        // ZWPFlowsModule.mock()
      ]
    })
    export class AppModule {}
    ```
4. **Interacting with State:**
    Use facades (e.g. FlowContainerFacade) in your components:
    ```typescript
    constructor(private flowContainerFacade: FlowContainerFacade) {}

    createNewContainer() {
      this.flowContainerFacade.createContainer({ name: 'New Container' });
    }
    ```

---

## Conclusion

The **platform.flows** package delivers a powerful foundation for managing workflow logic in your application. With detailed NgRx state management (including comprehensive actions, selectors, and facades), clearly defined models, and robust API services for both live and mock environments, this package provides a scalable and maintainable solution for implementing complex flows.
