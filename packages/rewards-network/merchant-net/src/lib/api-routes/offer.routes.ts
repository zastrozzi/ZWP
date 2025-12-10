import { categoryRoutesForOffer } from './category.routes'
import { offerCategoryRoutesForNestedOffer, offerCategoryRoutesForOffer } from './offer-category.routes'

const offerLayoutElementRoutes = (path: string) => {
    const segment = 'layout-elements'
    return {
        listOfferLayoutElements: () => `${path}/${segment}`,
        getOfferLayoutElement: (offerLayoutElementId: string) => `${path}/${segment}/${offerLayoutElementId}`,
        updateOfferLayoutElement: (offerLayoutElementId: string) => `${path}/${segment}/${offerLayoutElementId}`,
        deleteOfferLayoutElement: (offerLayoutElementId: string) => `${path}/${segment}/${offerLayoutElementId}`
    }
}

const offerLayoutElementRoutesForLayout = (path: string) => {
    const segment = 'elements'
    return {
        createOfferLayoutElement: () => `${path}/${segment}`,
        listOfferLayoutElements: () => `${path}/${segment}`
    }
}

const offerLayoutRoutes = (path: string) => {
    const segment = 'layouts'
    return {
        listOfferLayouts: () => `${path}/${segment}`,
        getOfferLayout: (offerLayoutId: string) => `${path}/${segment}/${offerLayoutId}`,
        updateOfferLayout: (offerLayoutId: string) => `${path}/${segment}/${offerLayoutId}`,
        deleteOfferLayout: (offerLayoutId: string) => `${path}/${segment}/${offerLayoutId}`,
        offerLayoutElementRoutesForLayout: (offerLayoutId: string) => offerLayoutElementRoutesForLayout(`${path}/${segment}/${offerLayoutId}`)
    }
}

const offerLayoutRoutesForOffer = (path: string) => {
    const segment = 'layouts'
    return {
        createOfferLayout: () => `${path}/${segment}`,
        listOfferLayouts: () => `${path}/${segment}`
    }
}

export const offerRoutes = (path: string) => {
    const segment = 'offers'
    return {
        listOffers: () => `${path}/${segment}`,
        getOffer: (offerId: string) => `${path}/${segment}/${offerId}`,
        updateOffer: (offerId: string) => `${path}/${segment}/${offerId}`,
        deleteOffer: (offerId: string) => `${path}/${segment}/${offerId}`,
        offerLayoutRoutes: () => offerLayoutRoutes(path),
        offerLayoutRoutesForOffer: (offerId: string) => offerLayoutRoutesForOffer(`${path}/${segment}/${offerId}`),
        offerLayoutElementRoutes: () => offerLayoutElementRoutes(path),
        categoryRoutesForOffer: (offerId: string) => categoryRoutesForOffer(`${path}/${segment}/${offerId}`),
        offerCategoryRoutesForOffer: (offerId: string) => offerCategoryRoutesForOffer(`${path}/${segment}/${offerId}`)
    }
}

export const offerRoutesForMerchant = (path: string) => {
    const segment = 'offers'
    return {
        createOffer: () => `${path}/${segment}`,
        listOffers: () => `${path}/${segment}`
    }
}

export const offerRoutesForBrand = (path: string) => {
    const segment = 'offers'
    return {
        createOffer: () => `${path}/${segment}`,
        listOffers: () => `${path}/${segment}`
    }
}

export const offerRoutesForCategory = (path: string) => {
    const segment = 'offers'
    return {
        listOffers: () => `${path}/${segment}`,
        offerCategoryRoutesForNestedOffer: (offerId: string) => offerCategoryRoutesForNestedOffer(`${path}/${segment}/${offerId}`)
    }
}