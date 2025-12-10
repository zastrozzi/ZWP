export const providerRoutes = (path: string) => {
    const segment = 'providers'
    return {
        listProviders: () => `${path}/${segment}`,
        getProvider: (id: string) => `${path}/${segment}/${id}`,
        deleteProvider: (id: string) => `${path}/${segment}/${id}`,
        refreshProviders: () => `${path}/${segment}/refresh`
    }
}

export const providerRoutesForTinkUser = (path: string) => {
    const segment = 'providers'
    return {
        listProviders: () => `${path}/${segment}`
    }
}