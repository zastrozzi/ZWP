export const storageObjectRoutes = (path: string) => {
    const segment = 'storage-objects'
    return {
        listStorageObjects: () => `${path}/${segment}`,
        getStorageObject: (id: string) => `${path}/${segment}/${id}`,
        updateStorageObject: (id: string) => `${path}/${segment}/${id}`,
        deleteStorageObject: (id: string) => `${path}/${segment}/${id}`,
        deleteManyStorageObjects: () => `${path}/${segment}`,
    }
}

export const storageObjectRoutesForStorageBucket = (path: string) => {
    const segment = 'storage-objects'
    return {
        uploadStorageObject: () => `${path}/${segment}`,
        listStorageObjects: () => `${path}/${segment}`,
        refreshStorageObjects: () => `${path}/${segment}/refresh`
    }
}