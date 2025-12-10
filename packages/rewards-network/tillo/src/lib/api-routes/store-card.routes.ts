import { digitalCodeRoutesForStoreCard } from './digital-code.routes'

export const storeCardRoutes = (path: string) => {
    const segment = 'store-cards'
    return {
        listStoreCards: () => `${path}/${segment}` ,
        getStoreCard: (storeCardId: string) => `${path}/${segment}/${storeCardId}`,
        updateStoreCard: (storeCardId: string) => `${path}/${segment}/${storeCardId}`,
        deleteStoreCard: (storeCardId: string) => `${path}/${segment}/${storeCardId}`,
        digitalCodeRoutesForStoreCard: (storeCardId: string) => digitalCodeRoutesForStoreCard(`${path}/${segment}/${storeCardId}`)

    }
}

export const storeCardRoutesForBrand = (path: string) => {
    const segment = 'store-cards'
    return {
        listStoreCardsForBrand: () => `${path}/${segment}`
    }
}

export const endUserRoutesForStoreCard = (path: string) => {
    const segment = 'endusers'
    return {
        routesForEnduser: (enduserId: string) => storeCardRoutesForEnduser(`${path}/${segment}/${enduserId}`)
    }
}

export const storeCardRoutesForEnduser = (path: string) => {
    const segment = 'store-cards'
    return {
        listStoreCardsForEnduser: () => `${path}/${segment}`,
        createStoreCardForEnduser: () => `${path}/${segment}`
    }
}