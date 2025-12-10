import { storageObjectRoutesForStorageBucket } from './storage-object.routes'

export const storageBucketRoutes = (path: string) => {
    const segment = 'storage-buckets'
    return {
        createStorageBucket: () => `${path}/${segment}`,
        listStorageBuckets: () => `${path}/${segment}`,
        getStorageBucket: (id: string) => `${path}/${segment}/${id}`,
        updateStorageBucket: (id: string) => `${path}/${segment}/${id}`,
        refreshStorageBuckets: () => `${path}/${segment}/refresh`,
        deleteStorageBucket: (id: string) => `${path}/${segment}/${id}`,
        storageObjectRoutesForStorageBucket: (id: string) =>
            storageObjectRoutesForStorageBucket(`${path}/${segment}/${id}`)
    }
}