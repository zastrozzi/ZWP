export const transactionSpreadRoutes = (path: string) => {
    const segment = 'transaction-spreads'
    return {
        getTransactionSpread: ( transactionSpreadId:string ) => `${path}/${segment}/${transactionSpreadId}`,
        updateTransactionSpread: ( transactionSpreadId: string ) => `${path}/${segment}/${transactionSpreadId}`,
        deleteTransactionSpread: ( transactionSpreadId: string ) => `${path}/${segment}/${transactionSpreadId}`,
        listTransactionSpreads: () => `${path}/${segment}`
    }
}

export const transactionSpreadForBrandRoutes = (path: string) => {
    const segment = 'transaction-spreads'
    return {
        createTransactionSpreadForBrand: () => `${path}/${segment}` ,
        listTransactionSpreadsForBrand: () => `${path}/${segment}`,
        setActiveTransactionSpreadForBrand: (transactionSpreadId: string) => `${path}/${segment}/${transactionSpreadId}/set-active`
    }
}