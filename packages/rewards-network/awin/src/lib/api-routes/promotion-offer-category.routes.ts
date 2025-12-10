export const promotionOfferCategoryRoutes = (path: string) => {
    const segment = 'promotion-offer-categories'
    return {
        getPromotionOfferCategory:(id:string) => `${path}/${segment}/${id}`,
        listPromotionsOfferCategories: () => `${path}/${segment}/offer-categories`,
        deletePromotionOfferCategory: (id: string) => `${path}/${segment}/${id}`,
        promotionOfferCategoryRoutesForPromotions: (id:string) => promotionOfferCategoryRoutesForPromotions(`${path}/${segment}/${id}`)
    }
}

// SubRoutes  maybe
export const promotionOfferCategoryRoutesForPromotions = (path: string) => {
    const segment = 'promotions'
    return {
        listPromotions: () => `${path}/${segment}`,
        addPromotions: (id:string) => `${path}/${segment}/${id}/add`,
        removePromotions: (id:string) => `${path}/${segment}/${id}/remove`,
    }
    
}