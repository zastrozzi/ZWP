const accountConsentRoutes = (path: string) => {
    const segment = 'accounts'
    return {
        listAccountConsents: () => `${path}/${segment}`,
        getAccountConsent: (id: string) => `${path}/${segment}/${id}`,
        deleteAccountConsent: (id: string) => `${path}/${segment}/${id}`
    }
}

const accountConsentRoutesForTinkUser = (path: string) => {
    const segment = 'accounts'
    return {
        listAccountConsents: () => `${path}/${segment}`
    }
}

const providerConsentRoutes = (path: string) => {
    const segment = 'providers'
    return {
        listProviderConsents: () => `${path}/${segment}`,
        getProviderConsent: (id: string) => `${path}/${segment}/${id}`,
        deleteProviderConsent: (id: string) => `${path}/${segment}/${id}`,
        refreshProviderConsent: (id: string) => `${path}/${segment}/${id}/refresh`,
        extendProviderConsent: (id: string) => `${path}/${segment}/${id}/extend`
    }
}

const providerConsentRoutesForTinkUser = (path: string) => {
    const segment = 'providers'
    return {
        listProviderConsents: () => `${path}/${segment}`,
        refreshProviderConsents: () => `${path}/${segment}/refresh`,
    }
}

export const consentRoutes = (path: string) => {
    const segment = 'consents'
    return {
        accountConsentRoutes: () => accountConsentRoutes(`${path}/${segment}`),
        providerConsentRoutes: () => providerConsentRoutes(`${path}/${segment}`)
    }
}

export const consentRoutesForTinkUser = (path: string) => {
    const segment = 'consents'
    return {
        accountConsentRoutes: () => accountConsentRoutesForTinkUser(`${path}/${segment}`),
        providerConsentRoutes: () => providerConsentRoutesForTinkUser(`${path}/${segment}`)
    }
}