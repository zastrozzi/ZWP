// Not implemented yet on server
const loyaltyCardRoutesForEnduser = (path: string) => {
    const segment = 'cards'
    return {
        createLoyaltyCard: () => `${path}/${segment}`,
        listLoyaltyCards: () => `${path}/${segment}`,
    }
}

const loyaltyCardRoutesForCardScheme = (path: string) => {
    const segment = 'cards'
    return {
        listLoyaltyCards: () => `${path}/${segment}`,
    }
}

const loyaltyCardRoutesForBrand = (path: string) => {
    const segment = 'cards'
    return {
        listLoyaltyCards: () => `${path}/${segment}`,
    }
}

const loyaltyCardRoutesForMerchant = (path: string) => {
    const segment = 'cards'
    return {
        listLoyaltyCards: () => `${path}/${segment}`,
    }
}

const loyaltyCardRoutes = (path: string) => {
    const segment = 'cards'
    return {
        listLoyaltyCards: () => `${path}/${segment}`,
        getLoyaltyCard: (loyaltyCardId: string) => `${path}/${segment}/${loyaltyCardId}`,
        updateLoyaltyCard: (loyaltyCardId: string) => `${path}/${segment}/${loyaltyCardId}`,
        deleteLoyaltyCard: (loyaltyCardId: string) => `${path}/${segment}/${loyaltyCardId}`,
    }
}

const loyaltyCardSchemeBrandRoutesForCardScheme = (path: string) => {
    const segment = 'card-scheme-brands'
    return {
        addBrandToLoyaltyCardScheme: (brandId: string) => `${path}/${segment}/${brandId}/add`,
        listLoyaltyCardSchemeBrands: () => `${path}/${segment}`,
        removeBrandFromLoyaltyCardScheme: (brandId: string) => `${path}/${segment}/${brandId}/remove`
    }
}

const loyaltyCardSchemeRoutes = (path: string) => {
    const segment = 'card-schemes'
    return {
        listLoyaltyCardSchemes: () => `${path}/${segment}`,
        getLoyaltyCardScheme: (loyaltyCardSchemeId: string) => `${path}/${segment}/${loyaltyCardSchemeId}`,
        updateLoyaltyCardScheme: (loyaltyCardSchemeId: string) => `${path}/${segment}/${loyaltyCardSchemeId}`,
        deleteLoyaltyCardScheme: (loyaltyCardSchemeId: string) => `${path}/${segment}/${loyaltyCardSchemeId}`,
        loyaltyCardRoutesForCardScheme: (loyaltyCardSchemeId: string) =>
            loyaltyCardRoutesForCardScheme(`${path}/${segment}/${loyaltyCardSchemeId}`),
        loyaltyCardSchemeBrandRoutesForCardScheme: (loyaltyCardSchemeId: string) =>
            loyaltyCardSchemeBrandRoutesForCardScheme(`${path}/${segment}/${loyaltyCardSchemeId}`),
    }
}

const loyaltyCardSchemeBrandRoutes = (path: string) => {
    const segment = 'card-scheme-brands'
    return {
        listLoyaltyCardSchemeBrands: () => `${path}/${segment}`,
        getLoyaltyCardSchemeBrand: (loyaltyCardSchemeBrandId: string) =>
            `${path}/${segment}/${loyaltyCardSchemeBrandId}`,
    }
}

const loyaltyCardSchemeRoutesForMerchant = (path: string) => {
    const segment = 'card-schemes'
    return {
        createLoyaltyCardScheme: () => `${path}/${segment}`,
        listLoyaltyCardSchemes: () => `${path}/${segment}`,
    }
}

const loyaltyCardSchemeRoutesForBrand = (path: string) => {
    const segment = 'card-schemes'
    const subsegment = 'card-scheme-brands'
    return {
        listLoyaltyCardSchemes: () => `${path}/${segment}`,
        addLoyaltyCardSchemeToBrand: (loyaltyCardSchemeId: string) => `${path}/${segment}/${loyaltyCardSchemeId}`,
        listLoyaltyCardSchemeBrands: () => `${path}/${segment}/${subsegment}`,
        removeLoyaltyCardSchemeFromBrand: (loyaltyCardSchemeId: string) => `${path}/${segment}/${loyaltyCardSchemeId}`,
    }
}

export const loyaltyRoutes = (path: string) => {
    const segment = 'loyalty'
    return {
        loyaltyCardRoutes: () => loyaltyCardRoutes(`${path}/${segment}`),
        loyaltyCardSchemeRoutes: () => loyaltyCardSchemeRoutes(`${path}/${segment}`),
        loyaltyCardSchemeBrandRoutes: () => loyaltyCardSchemeBrandRoutes(`${path}/${segment}`),
        loyaltyCardSchemeRoutesForMerchant: () => loyaltyCardSchemeRoutesForMerchant(`${path}/${segment}`),
        loyaltyCardSchemeRoutesForBrand: () => loyaltyCardSchemeRoutesForBrand(`${path}/${segment}`),
        loyaltyCardRoutesForEnduser: (enduserId: string) =>
            loyaltyCardRoutesForEnduser(`${path}/endusers/${enduserId}/${segment}`),
        loyaltyCardRoutesForBrand: () => loyaltyCardRoutesForBrand(`${path}/${segment}`),
        loyaltyCardRoutesForMerchant: () => loyaltyCardRoutesForMerchant(`${path}/${segment}`)
    }
}
