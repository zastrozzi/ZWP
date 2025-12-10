import { GoogleCloudFileUploadFacade } from './file-upload.facade'
import { GoogleCloudStorageBucketFacade } from './storage-bucket.facade'
import { GoogleCloudStorageObjectFacade } from './storage-object.facade'

export * from './file-upload.facade'
export * from './storage-bucket.facade'
export * from './storage-object.facade'

export const ALL = [
  GoogleCloudFileUploadFacade,
  GoogleCloudStorageBucketFacade,
  GoogleCloudStorageObjectFacade
]