import { EnvironmentProviders } from '@angular/core'
import { provideEffects } from '@ngrx/effects'
import { GoogleCloudStorageBucketEffects } from './storage-bucket.effects'
import { GoogleCloudStorageObjectEffects } from './storage-object.effects'
import { GoogleCloudFileUploadEffects } from './file-upload.effects'

export const environmentProviders: EnvironmentProviders[] = [
    provideEffects(GoogleCloudFileUploadEffects, GoogleCloudStorageBucketEffects, GoogleCloudStorageObjectEffects),
]