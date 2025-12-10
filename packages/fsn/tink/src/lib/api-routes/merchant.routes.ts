export const merchantRoutes = (path: string) => {
    const segment = 'merchants'
    return {
        createMerchant: () => `${path}/${segment}`,
        listMerchants: () => `${path}/${segment}`,
        getMerchant: (id: string) => `${path}/${segment}/${id}`,
        deleteMerchant: (id: string) => `${path}/${segment}/${id}`,
        refreshMerchants: () => `${path}/${segment}/refresh`,
    }
}