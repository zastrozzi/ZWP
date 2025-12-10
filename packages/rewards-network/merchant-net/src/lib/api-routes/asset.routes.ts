export const assetRoutes = (path: string) => {
    const segment = 'assets'
    return {
        listAssets: () => `${path}/${segment}`,
        getAsset: (id: string) => `${path}/${segment}/${id}`,
        updateAsset: (id: string) => `${path}/${segment}/${id}`,
        deleteAsset: (id: string) => `${path}/${segment}/${id}`
    }
}

export const assetRoutesForMerchant = (path: string) => {
    const segment = 'assets'
    return {
        createAsset: () => `${path}/${segment}`,
        listAssets: () => `${path}/${segment}`
    }
}