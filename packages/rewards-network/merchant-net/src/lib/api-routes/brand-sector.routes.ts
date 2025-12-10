export const brandSectorRoutes = (path: string) => {
    const segment = 'brand-sectors'
    return {
        getBrandSector: (brandSectorId: string) => `${path}/${segment}/${brandSectorId}`,
        listBrandSectors: () => `${path}/${segment}`,
        deleteBrandSector: (brandSectorId: string) => `${path}/${segment}/${brandSectorId}`
    }
}

export const brandSectorRoutesForSector = (path: string) => {
    const segment = 'brand-sectors'
    return {
        listBrandSectors: () => `${path}/${segment}`
    }
}

export const brandSectorRoutesForBrand = (path: string) => {
    const segment = 'brand-sectors'
    return {
        listBrandSectors: () => `${path}/${segment}`
    }
}

export const brandSectorRoutesForNestedSector = (path: string) => {
    return {
        addBrandSector: () => `${path}/add`,
        removeBrandSector: () => `${path}/remove`
    }
}

export const brandSectorRoutesForNestedBrand = (path: string) => {
    return {
        addBrandSector: () => `${path}/add`,
        removeBrandSector: () => `${path}/remove`
    }
}