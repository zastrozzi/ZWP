import { assetRoutesForMerchant } from './asset.routes'
import { brandRoutesForMerchant } from './brand.routes'
import { invoiceRoutesForMerchant } from './invoice.routes'
import { locationRoutesForMerchant, webLocationRoutesForMerchant } from './location.routes'
import { loyaltyRoutes } from './loyalty.routes'
import { offerRoutesForMerchant } from './offer.routes'
import { brandTilloBrandRoutesForMerchant, tilloBrandRoutesForMerchant } from './tillo-brand.routes'

export const merchantRoutes = (path: string) => {
    const segment = 'merchants'
    return {
        listMerchants: () => `${path}/${segment}`,
        createMerchant: () => `${path}/${segment}`,
        getMerchant: (merchantId: string) => `${path}/${segment}/${merchantId}`,
        updateMerchant: (merchantId: string) => `${path}/${segment}/${merchantId}`,
        deleteMerchant: (merchantId: string) => `${path}/${segment}/${merchantId}`,
        assetRoutesForMerchant: (merchantId: string) => assetRoutesForMerchant(`${path}/${segment}/${merchantId}`),
        brandRoutesForMerchant: (merchantId: string) => brandRoutesForMerchant(`${path}/${segment}/${merchantId}`),
        invoiceRoutesForMerchant: (merchantId: string) => invoiceRoutesForMerchant(`${path}/${segment}/${merchantId}`),
        locationRoutesForMerchant: (merchantId: string) =>
            locationRoutesForMerchant(`${path}/${segment}/${merchantId}`),
        webLocationRoutesForMerchant: (merchantId: string) =>
            webLocationRoutesForMerchant(`${path}/${segment}/${merchantId}`),
        loyaltyCardRoutesForMerchant: (merchantId: string) =>
            loyaltyRoutes(`${path}/${segment}/${merchantId}`).loyaltyCardRoutesForMerchant(),
        loyaltyCardSchemeRoutesForMerchant: (merchantId: string) =>
            loyaltyRoutes(`${path}/${segment}/${merchantId}`).loyaltyCardSchemeRoutesForMerchant(),
        offerRoutesForMerchant: (merchantId: string) => offerRoutesForMerchant(`${path}/${segment}/${merchantId}`),
        brandTilloBrandRoutesForMerchant: (merchantId: string) =>
            brandTilloBrandRoutesForMerchant(`${path}/${segment}/${merchantId}`),
        tilloBrandRoutesForMerchant: (merchantId: string) =>
            tilloBrandRoutesForMerchant(`${path}/${segment}/${merchantId}`),
    }
}
