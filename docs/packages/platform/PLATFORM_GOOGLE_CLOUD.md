---
id: platform.google-cloud
title: Core Platform - Google Cloud
sidebar_label: Google Cloud
---
# Core Platform - Google Cloud

[**View on Github**]({{ site.repo_root_url }}/packages/platform/google-cloud)

This document details the **platform.google-cloud** library. This package provides tools to integrate with Google Cloud services – such as Cloud Storage for file uploads, storage buckets, and storage objects – in your Angular application. It includes state management via NgRx (with actions, effects, reducers, selectors, and facades), API route definitions, service implementations (both live and mock), and reusable UI components for cloud interactions.

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Modules](#modules)
4. [State Management](#state-management)
   - [Identifiers & State Assembly](#identifiers--state-assembly)
   - [Actions](#actions)
     - [File Upload Actions](#file-upload-actions)
     - [Storage Bucket Actions](#storage-bucket-actions)
     - [Storage Object Actions](#storage-object-actions)
   - [Effects](#effects)
   - [Reducers](#reducers)
   - [Selectors](#selectors)
   - [Facades](#facades)
     - [Detailed Facades and Their Methods](#detailed-facades-and-their-methods)
5. [Models](#models)
6. [API Routes & Configurations](#api-routes--configurations)
7. [Services](#services)
   - [Live API Services](#live-api-services)
     - [Detailed Storage Bucket Service Methods](#detailed-storage-bucket-service-methods)
     - [Detailed Storage Object Service Methods](#detailed-storage-object-service-methods)
   - [Mock API Services](#mock-api-services)
8. [Components](#components)
9. [Building and Usage](#building-and-usage)
10. [Conclusion](#conclusion)

---

## Overview

The **platform.google-cloud** package offers a robust integration layer with Google Cloud services. Key features include:

- **File Upload:** Manage file uploads to Google Cloud, keeping track of progress and statuses.
- **Storage Buckets:** Create, update, delete, and list storage buckets.
- **Storage Objects:** Upload, retrieve, list, and delete storage objects within buckets.
- **State Management:** Uses NgRx to maintain a predictable application state. The state is divided into slices for file uploads, storage buckets, and storage objects.
- **API Services:** Provides live implementations that communicate with actual backend endpoints and mock implementations for development or testing.
- **UI Components:** Reusable components help render cloud data (for example, paginated bucket lists or file upload panels).

---

## Directory Structure

A high-level overview of the package layout:

- **Root Files:**  
  - Configuration files: `.eslintrc.json`, `jest.config.ts`, `ng-package.json`, `package.json`, `project.json`
  - TypeScript configuration: `tsconfig.json`, `tsconfig.lib.json`, `tsconfig.lib.prod.json`, `tsconfig.spec.json`
  - [README.md]({{ site.repo_root_url }}/packages/platform/google-cloud/README.md)

- **src/**  
  - `index.ts` – Main entry point re-exporting module features.
  - `test-setup.ts` – Jest test configuration.
  - **lib/**  
    - **platform.google-cloud.module.ts:**  
      The main Angular module that imports common modules (ZWPCommonModule, ZWPAuthModule, etc.) and declares/exports UI components.
    - **platform-google-cloud.ts:**  
      Aggregates exports for ease of consumption.
    - **+state/**  
      - **identifiers.ts:**  
        Defines namespaced keys (e.g. `PLATFORM_GOOGLE_CLOUD_ACTION_IDENTIFIER`, `FILE_UPLOAD_STATE_FEATURE_KEY`, `STORAGE_BUCKET_STATE_FEATURE_KEY`, and `STORAGE_OBJECT_STATE_FEATURE_KEY`).
      - **actions/**  
        Contains actions for file uploads, storage buckets, and storage objects.
      - **effects/**  
        Implements side effects for remote API calls (e.g. file-upload, storage-bucket, and storage-object effects).
      - **reducers/**  
        Reducers for updating state immutably based on actions.
      - **selectors/**  
        Selectors for extracting slices of state (e.g. file upload lists, selected bucket, etc.).
      - **facades/**  
        Provides simplified APIs for components to interact with state; for example, the `GoogleCloudFileUploadFacade` and `GoogleCloudStorageBucketFacade`.
    - **api-routes/**  
      Defines API routes used by the service layer (for example, storage bucket routes and storage object routes).
    - **components/**  
      Contains reusable UI components such as file upload panels and paginated storage bucket lists.
    - **config/**  
      Configuration files and injection tokens (see [google-cloud.api-config.ts]({{ site.repo_root_url }}/packages/platform/google-cloud/src/lib/config/google-cloud.api-config.ts)).
    - **model/**  
      Aggregates models, enums, filters, requests, and responses related to Google Cloud (e.g. file-upload models, storage bucket responses, etc.).
    - **routes/**  
      Additional route definitions for navigation (if applicable).
    - **services/**  
      Contains API service implementations (in both live and mock variants).

---

## Modules

### PlatformGoogleCloudModule
- **Purpose:**  
  The central Angular module for Google Cloud integration. It ties together state management, service providers, and UI components.
- **Setup:**  
  In [platform.google-cloud.module.ts]({{ site.repo_root_url }}/packages/platform/google-cloud/src/lib/platform.google-cloud.module.ts), common modules are imported and state features are provided using helper methods (e.g. `createNamespacedFeatureKey`).
- **Configuration:**  
  Static methods such as `forRoot(apiConfig: GoogleCloudAPIConfig)` configure providers. The module sets up API configuration tokens using [google-cloud.api-config.ts]({{ site.repo_root_url }}/packages/platform/google-cloud/src/lib/config/google-cloud.api-config.ts).

---

## State Management

The package leverages NgRx for predictable state handling across its domains.

### Identifiers & State Assembly
- **Identifiers:**  
  Defined in [identifiers.ts]({{ site.repo_root_url }}/packages/platform/google-cloud/src/lib/+state/identifiers.ts), these keys ensure consistency across actions and reducers (e.g. `FILE_UPLOAD_STATE_FEATURE_KEY`, `STORAGE_BUCKET_STATE_FEATURE_KEY`, and `STORAGE_OBJECT_STATE_FEATURE_KEY`).
- **State Assembly:**  
  The state is composed in individual reducer files (e.g. [storage-bucket.reducer.ts]({{ site.repo_root_url }}/packages/platform/google-cloud/src/lib/+state/reducers/storage-bucket.reducer.ts)) and aggregated via an index for easy consumption.

### Actions

Actions in Google Cloud are grouped according to functionality:

#### File Upload Actions
- **createFileUpload:**  
  Dispatches an action to initiate a file upload.  
  *Payload:* A file upload model (see [file-upload.actions.ts]({{ site.repo_root_url }}/packages/platform/google-cloud/src/lib/+state/actions/file-upload.actions.ts)).
- **updateFileUpload:**  
  Updates the status or progress of an ongoing file upload.
- **deleteFileUpload:**  
  Removes a file upload record.
- **Noop Action:**  
  A placeholder action (used to maintain effect pipelines).

#### Storage Bucket Actions
- **createStorageBucket:**  
  Initiates creation of a new storage bucket.
- **getStorageBucket:**  
  Retrieves details of a specific bucket.
- **listStorageBuckets:**  
  Fetches a paginated list of storage buckets.
- **updateStorageBucket:**  
  Updates existing bucket properties.
- **refreshStorageBuckets:**  
  Triggers a refresh of storage bucket state.
- **deleteStorageBucket:**  
  Removes a storage bucket.

#### Storage Object Actions
- **uploadStorageObject:**  
  Dispatches an action to upload an object to a specific bucket.
- **getStorageObject:**  
  Retrieves an object's details.
- **listStorageObjects:**  
  Lists objects from a bucket using pagination and filters.
- **deleteStorageObject:**  
  Removes a storage object by its ID.

### Effects
- **Purpose:**  
  Effects listen for dispatched actions to perform asynchronous API operations.  
- **Examples:**  
  - [GoogleCloudStorageBucketEffects]({{ site.repo_root_url }}/packages/platform/google-cloud/src/lib/+state/effects/storage-bucket.effects.ts) manages remote calls for listing, updating, and deleting buckets.
  - [GoogleCloudFileUploadEffects]({{ site.repo_root_url }}/packages/platform/google-cloud/src/lib/+state/effects/file-upload.effects.ts) handles file upload events (e.g. triggering UI panels).
  - [GoogleCloudStorageObjectEffects]({{ site.repo_root_url }}/packages/platform/google-cloud/src/lib/+state/effects/storage-object.effects.ts) coordinates uploads and status updates for storage objects.
- **Implementation:**  
  Effects use RxJS operators (e.g. `switchMap`, `map`, `catchError`) and the helper `createRemoteEffect` to integrate with API services.

### Reducers
- **Purpose:**  
  Reducers immutably update state based on actions.  
- **Examples:**  
  - The storage bucket reducer updates bucket lists and pagination info upon successful API calls.
  - The file upload reducer processes actions to create, update, or remove file upload entries.

### Selectors
- **Purpose:**  
  Selectors provide convenient access to slices of the cloud state (e.g. list of buckets, file upload status, selected storage object).  
- **Implementation:**  
  Files under [selectors/]({{ site.repo_root_url }}/packages/platform/google-cloud/src/lib/+state/selectors/) compose state slices and expose computed data to the UI.

### Facades

Facades abstract direct NgRx interactions. They provide clear methods for components.
  
#### Detailed Facades and Their Methods
- **GoogleCloudFileUploadFacade:**  
  *Methods include:*  
  - `fileUploads$`: Observable stream of all file upload records.
  - `createFileUpload(fileUpload: Model.Common.FileUpload)`: Dispatches an action to create a new file upload.
  - `removeFileUpload(fileUploadId: string)`: Dispatches an action to delete a file upload.
  
- **GoogleCloudStorageBucketFacade:**  
  *Methods include:*  
  - `updateStorageBucketFilters(filters: Partial<Model.Filters.StorageBucketFilters>, triggerRemoteFetch?: boolean)`: Dispatches an action to update bucket filters.
  - `resetStorageBucketFilters(triggerRemoteFetch?: boolean)`: Resets filters and optionally triggers a remote fetch.
  - `resetPagination()`: Dispatches an action to reset pagination data.
  - Additional methods for selecting/deselecting buckets.
  
- **GoogleCloudStorageObjectFacade:**  
  *Methods include:*  
  - Methods to retrieve object details, list objects, and manage selected storage object state via selectors.
  
These facades simplify component logic by encapsulating both action dispatches and selector subscriptions.

---

## Models

Models encompass the data definitions used in Google Cloud operations:
- **Common Models:**  
  Found under `model/common`, these models include definitions for file uploads, bucket access controls, encryption configurations, and more.
- **Requests & Responses:**  
  Defined under `model/requests` and `model/responses` (for example, storage-bucket.requests.ts and storage-bucket.responses.ts), they structure API communication.
- **Enums & Filters:**  
  Provide type safety for statuses (e.g. file upload status) and enable filtering operations.

---

## API Routes & Configurations

- **API Routes:**  
  Located in the `api-routes/` folder, route definitions such as [storage-bucket.routes.ts]({{ site.repo_root_url }}/packages/platform/google-cloud/src/lib/api-routes/storage-bucket.routes.ts) and storage-object.routes.ts centralize endpoint addresses.
- **Configurations:**  
  The file [google-cloud.api-config.ts]({{ site.repo_root_url }}/packages/platform/google-cloud/src/lib/config/google-cloud.api-config.ts) defines the `GoogleCloudAPIConfig` interface and instantiates injection tokens:
  - `GOOGLE_CLOUD_API_CONFIG`
  - `GOOGLE_CLOUD_API_BASE_URL`
  
These tokens are configured in the module’s `forRoot()` method so that live and local endpoints can be selected.

---

## Services

Services implement the API interactions for each domain:

### Live API Services
They call real endpoints using Angular’s HttpClient.

#### Detailed Storage Bucket Service Methods
- **StorageBucketLiveAPIService:**  
  *Methods include:*  
  - `createBucket(request: Model.Requests.CreateStorageBucketRequest): Observable<Model.Responses.StorageBucketResponse>`  
    Creates a new storage bucket.
  - `getBucket(bucketId: string): Observable<Model.Responses.StorageBucketResponse>`  
    Retrieves details of a bucket.
  - `listBuckets(pagination: Nullable<Partial<PaginatedQueryParams<Model.Responses.StorageBucketResponse>>>, filters: Nullable<Partial<Model.Filters.StorageBucketFilters>>): Observable<PaginatedResponse<Model.Responses.StorageBucketResponse>>`  
    Lists buckets with support for pagination and filters.
  - `updateBucket(bucketId: string, update: Model.Requests.UpdateStorageBucketRequest): Observable<Model.Responses.StorageBucketResponse>`  
    Updates bucket information.
  - `deleteBucket(bucketId: string): Observable<{ bucketId: string }>`  
    Deletes the specified bucket.

#### Detailed Storage Object Service Methods
- **StorageObjectLiveAPIService:**  
  *Methods include:*  
  - `uploadObject(bucketId: string, request: Model.Requests.UploadStorageObjectRequest): Observable<HttpEvent<Model.Responses.StorageObjectResponse>>`  
    Uploads an object to a bucket while tracking progress.
  - `getObject(objectId: string): Observable<Model.Responses.StorageObjectResponse>`  
    Retrieves details of a storage object.
  - `listObjects(bucketId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.Responses.StorageObjectResponse>>>, filters: Nullable<Partial<Model.Filters.StorageObjectFilters>>): Observable<PaginatedResponse<Model.Responses.StorageObjectResponse>>`  
    Fetches a paginated list of objects.
  - `deleteObject(objectId: string): Observable<void>`  
    Deletes an object.

### Mock API Services
They simulate responses for testing and development:
- **StorageBucketMockAPIService:**  
  Implements the same methods as the live counterpart but returns stubbed responses.
- **StorageObjectMockAPIService:**  
  Simulates object uploads and queries with preset delays and static data.

Services are wired through the module using factory providers defined in [services/services.ts]({{ site.repo_root_url }}/packages/platform/google-cloud/src/lib/services/services.ts).

---

## Components

The package includes UI components to assist with cloud interactions:
- **File Upload Components:**  
  Such as [FileUploadUtilityPanelComponent]({{ site.repo_root_url }}/packages/platform/google-cloud/src/lib/components/file-upload/file-upload.utility-panel.component.ts) to display upload progress and status.
- **Storage Bucket Components:**  
  Components (e.g. paginated list or detail views) allow users to interact with bucket data.
- **Storage Object Components:**  
  Enable viewing, filtering, and managing objects within a bucket.
  
These components are exported via the [components index]({{ site.repo_root_url }}/packages/platform/google-cloud/src/lib/components/index.ts).

---

## Building and Usage

1. **Building the Package:**
    ```sh
    nx build platform.google-cloud
    ```
2. **Running Tests:**
    ```sh
    nx test platform.google-cloud
    ```
3. **Usage in an Angular Project:**
    Import the module and configure API providers:
    ```typescript
    import { PlatformGoogleCloudModule } from '@zwp/platform.google-cloud';

    @NgModule({
      imports: [
        PlatformGoogleCloudModule.forRoot({
          remoteBaseUrl: 'https://api.remote.example.com',
          localBaseUrl: 'http://localhost:3000',
          apiState: ModuleAPIState.LIVE  // or ModuleAPIState.MOCK for testing
        })
      ]
    })
    export class AppModule {}
    ```
4. **Interacting with State:**
    Inject facades into your components:
    ```typescript
    constructor(private storageBucketFacade: GoogleCloudStorageBucketFacade) {}

    deleteBucket(bucketId: string) {
      this.storageBucketFacade.deselectStorageBucket();
      // Additional logic to delete the bucket...
    }
    ```

---

## Conclusion

The **platform.google-cloud** package provides a comprehensive solution for integrating Google Cloud services into your Angular application. With its robust NgRx-powered state management (including detailed actions, effects, reducers, selectors, and facades), strong model definitions, centralized API routes, and flexible service implementations (supporting both live and mock modes), the package offers a scalable, maintainable, and testable architecture for cloud interactions.

This documentation is intended as a guide for understanding, configuring, and extending the functionality of platform.google-cloud. Feel free to update or expand it as our project requirements evolve.