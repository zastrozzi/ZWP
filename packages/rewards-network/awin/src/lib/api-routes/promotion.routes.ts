export const promotionRoutes = (path: string) => {
    const segment = 'promotions'
    return {
        refreshPromotions: () => `${path}/${segment}`,
        getPromotion:(id:string) => `${path}/${segment}/${id}`,
        listPromotions: () => `${path}/${segment}`,
        deletePromotion: (id: string) => `${path}/${segment}/${id}`,
        promotionRoutesForOfferCategories: (id:string) => promotionRoutesForOfferCategories(`${path}/${segment}/${id}`),
        promotionRoutesforPromotionOfferCategories:(id:string) => promotionRoutesforPromotionOfferCategories(`${path}/${segment}/${id}`)
    }
}

// Subroutes
// OfferCategories
export const promotionRoutesforPromotionOfferCategories = (path: string) => {
    const segment = 'promotions'
    return {
        addOfferCategory: (id:string) => `${path}/${segment}/${id}/add`,
        removeOfferCategory: (id:string) => `${path}/${segment}/${id}/remove`,
        listOfferCategory: () => `${path}/${segment}`,
    }
} 
// Promotion offer

export const promotionRoutesForOfferCategories = (path:string) => {
    const segment = 'offer-categories'
    return {
        listOfferCategories: () => `${path}/${segment}`,
    }
}