export const brandTilloBrandRoutes = (path: string) => {
    const segment = 'brand-tillo-brands'
    return {
        listBrandTilloBrands: () => `${path}/${segment}`,
        getBrandTilloBrand: (brandTilloBrandId: string) => `${path}/${segment}/${brandTilloBrandId}`,
        deleteBrandTilloBrand: (brandTilloBrandId: string) => `${path}/${segment}/${brandTilloBrandId}`,
        listTilloBrandsForBrandTilloBrand: (brandTilloBrandId: string) => `${path}/${segment}/${brandTilloBrandId}/tillo-brands`
    }
}

export const brandTilloBrandRoutesForMerchant = (path: string) => {
    const segment = 'brand-tillo-brands'
    return {
        listBrandTilloBrandsForMerchant: () => `${path}/${segment}`
    }
}

export const brandTilloBrandRoutesForBrand = (path: string) => {
    const segment = 'brand-tillo-brands'
    return {
        listBrandTilloBrandsForBrand: () => `${path}/${segment}`
    }
}

export const brandTilloBrandRoutesForTilloBrand = (path: string) => {
    const segment = 'brand-tillo-brands'
    return {
        listBrandTilloBrandsForTilloBrand: () => `${path}/${segment}`
    }
}

export const tilloBrandRoutes = (path: string) => {
    const segment = 'tillo-brands'
    return {
        onboardTilloBrand: (tilloBrandId: string) => `${path}/${segment}/${tilloBrandId}/onboard`,
        brandTilloBrandRoutesForTilloBrand: (tilloBrandId: string) => brandTilloBrandRoutesForTilloBrand(`${path}/${segment}/${tilloBrandId}`)
    }
}

export const tilloBrandRoutesForMerchant = (path: string) => {
    const segment = 'tillo-brands'
    return {
        listTilloBrandsForMerchant: () => `${path}/${segment}`,
        onboardTilloBrandForMerchant: (tilloBrandId: string) => `${path}/${segment}/${tilloBrandId}/onboard`
    }
}

export const tilloBrandRoutesForBrand = (path: string) => {
    const segment = 'tillo-brands'
    return {
        listTilloBrandsForBrand: () => `${path}/${segment}`,
        onboardTilloBrandForBrand: (tilloBrandId: string) => `${path}/${segment}/${tilloBrandId}/onboard`
    }
}