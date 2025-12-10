import { transactionRoutesForAccount } from './transaction.routes'

export const accountRoutes = (path: string) => {
    const segment = 'accounts'
    return {
        listAccounts: () => `${path}/${segment}`,
        getAccount: (id: string) => `${path}/${segment}/${id}`,
        deleteAccount: (id: string) => `${path}/${segment}/${id}`,
        refreshAccount: (id: string) => `${path}/${segment}/${id}/refresh`,
        refreshAccountBalance: (id: string) => `${path}/${segment}/${id}/refresh-balance`,
        transactionRoutesForAccount: (id: string) => transactionRoutesForAccount(`${path}/${segment}/${id}`),
    }
}

export const accountRoutesForTinkUser = (path: string) => {
    const segment = 'accounts'
    return {
        listAccounts: () => `${path}/${segment}`,
        refreshAccounts: () => `${path}/${segment}/refresh`
    }
}