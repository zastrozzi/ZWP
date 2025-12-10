export const transactionRoutes = (path: string) => {
    const segment = 'transactions'
    return {
        listTransactions: () => `${path}/${segment}`,
        getTransaction: (id: string) => `${path}/${segment}/${id}`,
        deleteTransaction: (id: string) => `${path}/${segment}/${id}`
    }
}

export const transactionRoutesForAccount = (path: string) => {
    const segment = 'transactions'
    return {
        listTransactions: () => `${path}/${segment}`,
        refreshTransactions: () => `${path}/${segment}/refresh`
    }
}