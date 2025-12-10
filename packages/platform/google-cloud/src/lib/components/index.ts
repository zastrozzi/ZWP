import { EXPORTABLE_FILE_UPLOAD_COMPONENTS } from './file-upload'
import { STORAGE_BUCKET_COMPONENTS } from './storage-bucket'
import { STORAGE_OBJECT_COMPONENTS } from './storage-object'

export * from './file-upload'

export const INTERNAL_COMPONENTS = {
    STORAGE_BUCKET_COMPONENTS,
    STORAGE_OBJECT_COMPONENTS,
    ALL: [
        ...STORAGE_BUCKET_COMPONENTS.ALL,
        ...STORAGE_OBJECT_COMPONENTS.ALL
    ]
}

export const EXPORTABLE_COMPONENTS = {
    EXPORTABLE_FILE_UPLOAD_COMPONENTS,
    ALL: [
        ...EXPORTABLE_FILE_UPLOAD_COMPONENTS.ALL
    ]
}