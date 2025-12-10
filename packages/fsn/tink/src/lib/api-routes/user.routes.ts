import { accountRoutesForTinkUser } from './account.routes'
import { consentRoutesForTinkUser } from './consent.routes'
import { credentialRoutesForTinkUser } from './credential.routes'
import { providerRoutesForTinkUser } from './provider.routes'

export const tinkUserRoutes = (path: string) => {
    const segment = 'users'
    return {
        listTinkUsers: () => `${path}/${segment}`,
        getTinkUser: (id: string) => `${path}/${segment}/${id}`,
        deleteTinkUser: (id: string) => `${path}/${segment}/${id}`,
        refreshTinkUser: (id: string) => `${path}/${segment}/${id}/refresh`,
        accountRoutesForTinkUser: (id: string) => accountRoutesForTinkUser(`${path}/${segment}/${id}`),
        consentRoutesForTinkUser: (id: string) => consentRoutesForTinkUser(`${path}/${segment}/${id}`),
        credentialRoutesForTinkUser: (id: string) => credentialRoutesForTinkUser(`${path}/${segment}/${id}`),
        providerRoutesForTinkUser: (id: string) => providerRoutesForTinkUser(`${path}/${segment}/${id}`),
    }
}

const tinkUserRoutesForEnduser = (path: string) => {
    const segment = 'users'
    return {
        listTinkUsers: () => `${path}/${segment}`,
        createTinkUser: () => `${path}/${segment}`,
        relinkTinkUser: () => `${path}/${segment}/relink`,
    }
}

export const enduserRoutes = (path: string) => {
    const segment = 'endusers'
    return {
        tinkUserRoutesForEnduser: (id: string) => tinkUserRoutesForEnduser(`${path}/${segment}/${id}`),
    }
}