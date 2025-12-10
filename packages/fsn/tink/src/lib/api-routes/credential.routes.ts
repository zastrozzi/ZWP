export const credentialRoutes = (path: string) => {
    const segment = 'credentials'
    return {
        listCredentials: () => `${path}/${segment}`,
        getCredential: (id: string) => `${path}/${segment}/${id}`,
        deleteCredential: (id: string) => `${path}/${segment}/${id}`,
        refreshCredential: (id: string) => `${path}/${segment}/${id}/refresh`,
        forceRefreshCredential: (id: string) => `${path}/${segment}/${id}/force-refresh`
    }
}

export const credentialRoutesForTinkUser = (path: string) => {
    const segment = 'credentials'
    return {
        listCredentials: () => `${path}/${segment}`,
        refreshCredentials: () => `${path}/${segment}/refresh`
    }
}