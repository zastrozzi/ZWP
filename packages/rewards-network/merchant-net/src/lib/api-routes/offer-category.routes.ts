export const offerCategoryRoutes = (path: string) => {
    const segment = 'offer-categories'
    return {
        getOfferCategory: (offerCategoryId: string) => `${path}/${segment}/${offerCategoryId}`,
        listOfferCategories: () => `${path}/${segment}`,
        deleteOfferCategory: (offerCategoryId: string) => `${path}/${segment}/${offerCategoryId}`
    }
}

export const offerCategoryRoutesForCategory = (path: string) => {
    const segment = 'offer-categories'
    return {
        listOfferCategories: () => `${path}/${segment}`
    }
}

export const offerCategoryRoutesForOffer = (path: string) => {
    const segment = 'offer-categories'
    return {
        listOfferCategories: () => `${path}/${segment}`
    }
}

export const offerCategoryRoutesForNestedCategory = (path: string) => {
    return {
        addOfferCategory: () => `${path}/add`,
        removeOfferCategory: () => `${path}/remove`
    }
}

export const offerCategoryRoutesForNestedOffer = (path: string) => {
    return {
        addOfferCategory: () => `${path}/add`,
        removeOfferCategory: () => `${path}/remove`
    }
}