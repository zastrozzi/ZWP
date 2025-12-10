
import { digitalCodeRoutesforBrand } from './digital-code.routes'
import { storeCardRoutesForBrand } from './store-card.routes';
import { transactionSpreadForBrandRoutes } from './transaction-spread.routes';

export const brandRoutes = (path: string) => {
    const segment = 'brands'
    return {
        listBrands: () => `${path}/${segment}`,
        getBrand: (brandId: string) => `${path}/${segment}/${brandId}`,
        deleteBrand: (brandId: string) => `${path}/${segment}/${brandId}`,
        
        refreshBrands: () => `${path}/${segment}/refresh`,
        restoreBrand: (brandId: string) => `${path}/${segment}/${brandId}/restore`,
        storeCardRoutesForBrand: (brandId: string) => storeCardRoutesForBrand(`${path}/${segment}/${brandId}`),
        transactionSpreadRoutesForBrand: (brandId: string) => transactionSpreadForBrandRoutes(`${path}/${segment}/${brandId}`),
        digitalCodeRoutesforBrand: (brandId: string) => digitalCodeRoutesforBrand(`${path}/${segment}/${brandId}`),

    }

}


export const generateMerchantNetworkRoutes = (path: string) => {
    const segment = 'generate'
    return {
        merchants: () => `${path}/${segment}/merchant`,
        brands: () => `${path}/${segment}/merchant-network-brand`
    }
}

export const assignBrandToMerchantRoutes = (path: string) => {
    const segment = 'assign'
    return {
        merchant: (merchantId: string) => `${path}/${segment}/merchant/${merchantId}`
    }
}

export const brandRoutesForStock = (path: string) => {
    const segment = 'brands'
    return {
        refreshStockForbrand: (id: string) => `${path}/${segment}/${id}/stock`,
        refreshStock: () => `${path}/${segment}/stock`
    }
}

export const floatRouteForBrand = (path: string) => {
    const segment = 'brand'
    return {
        assignFloatToBrand: (id: string) => `${path}/assign/${segment}/${id}`
    }
}

export const transactionSpreadRoutesForBrand = (path: string) => {
    const segment = 'brands'
    return {
        updateEmptyTransactionSpread: () => `${path}/${segment}/transaction-spreads/update-empty`
    }
}



