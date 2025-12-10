import { brandSectorRoutesForBrand, brandSectorRoutesForNestedBrand } from './brand-sector.routes'
import { locationRoutesForBrand, webLocationRoutesForBrand } from './location.routes'
import { loyaltyRoutes } from './loyalty.routes'
import { offerRoutesForBrand } from './offer.routes'
import { sectorRoutesForBrand } from './sector.routes'
import { brandTilloBrandRoutesForBrand, tilloBrandRoutesForBrand } from './tillo-brand.routes'

export const brandRoutes = (path: string) => {
    const segment = 'brands'
    return {
        listBrands: () => `${path}/${segment}`,
        getBrand: (brandId: string) => `${path}/${segment}/${brandId}`,
        updateBrand: (brandId: string) => `${path}/${segment}/${brandId}`,
        deleteBrand: (brandId: string) => `${path}/${segment}/${brandId}`,
        locationRoutesForBrand: (brandId: string) => locationRoutesForBrand(`${path}/${segment}/${brandId}`),
        webLocationRoutesForBrand: (brandId: string) => webLocationRoutesForBrand(`${path}/${segment}/${brandId}`),
        loyaltyCardSchemeRoutesForBrand: (brandId: string) => loyaltyRoutes(`${path}/${segment}/${brandId}`).loyaltyCardSchemeRoutesForBrand(),
        loyaltyCardRoutesForBrand: (brandId: string) => loyaltyRoutes(`${path}/${segment}/${brandId}`).loyaltyCardRoutesForBrand(),
        offerRoutesForBrand: (brandId: string) => offerRoutesForBrand(`${path}/${segment}/${brandId}`),
        sectorRoutesForBrand: (brandId: string) => sectorRoutesForBrand(`${path}/${segment}/${brandId}`),
        brandTilloBrandRoutesForBrand: (brandId: string) => brandTilloBrandRoutesForBrand(`${path}/${segment}/${brandId}`),
        tilloBrandRoutesForBrand: (brandId: string) => tilloBrandRoutesForBrand(`${path}/${segment}/${brandId}`),
    }
}

export const brandRoutesForMerchant = (path: string) => {
    const segment = 'brands'
    return {
        createBrand: () => `${path}/${segment}`,
        listBrands: () => `${path}/${segment}`
    }
}

export const brandRoutesForSector = (path: string) => {
    const segment = 'brands'
    return {
        listBrands: () => `${path}/${segment}`,
        brandSectorRoutesForNestedBrand: (offerId: string) => brandSectorRoutesForNestedBrand(`${path}/${segment}/${offerId}`)
    }
}