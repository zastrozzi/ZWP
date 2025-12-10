export const offerCategoryRoutes = (path: string) => {
    const segment = 'offer-categories'
    return {
        createOfferCategory: () => `${path}/${segment}`,
        //create
        getOfferCategory: (id:string) => `${path}/${segment}/${id}`,
        //getID
        listOfferCategories: () => `${path}/${segment}`,
        //getList
        updateOfferCategory: (id:string) => `${path}/${segment}/${id}`,
        //update
        deleteOfferCategory: (id:string) => `${path}/${segment}/${id}`,
        //delete
        createOfferSubcategory: (id: string) => `${path}/${segment}/${id}/subcategories`,
        listOfferSubcategories: (id: string) => `${path}/${segment}/${id}/subcategories`,
        offerCategoryRoutesForPromotion: (id:string) => offerCategoryRoutesForPromotion(`${path}/${segment}/${id}`),
        offerCategoryRoutesForPromotionOfferCategories: (id:string) => offerCategoryRoutesForPromotionOfferCategories(`${path}/${segment}/${id}`)
    }
}

//subroutes:
// promotion + promotionOffer + typeGrouped
export const offerCategoryRoutesForPromotion = (path:string) => {
    const segment = 'promotions'
    return {
        listPromotions:() => `${path}/${segment}`,
        addPromotion:(id:string) => `${path}/${segment}/${id}/add`,
        removePromotion:(id:string) => `${path}/${segment}/${id}/remove`,
    }
}

export const offerCategoryRoutesForPromotionOfferCategories = (path:string) => {
    const segment = 'promotion-offer-categories'
    return {
        listPromotions:() => `${path}/${segment}`,
    }
    
}