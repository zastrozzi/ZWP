export const locationRoutes = (path: string) => {
    const segment = 'locations'
    return {
        listLocations: () => `${path}/${segment}`,
        getLocation: (locationId: string) => `${path}/${segment}/${locationId}`,
        updateLocation: (locationId: string) => `${path}/${segment}/${locationId}`,
        deleteLocation: (locationId: string) => `${path}/${segment}/${locationId}`
    }
}

export const locationRoutesForMerchant = (path: string) => {
    const segment = 'locations'
    return {
        createLocation: () => `${path}/${segment}`,
        listLocations: () => `${path}/${segment}`
    }
}

export const locationRoutesForBrand = (path: string) => {
    const segment = 'locations'
    return {
        createLocation: () => `${path}/${segment}`,
        listLocations: () => `${path}/${segment}`
    }
}

export const webLocationRoutes = (path: string) => {
    const segment = 'web-locations'
    return {
        listWebLocations: () => `${path}/${segment}`,
        getWebLocation: (webLocationId: string) => `${path}/${segment}/${webLocationId}`,
        updateWebLocation: (webLocationId: string) => `${path}/${segment}/${webLocationId}`,
        deleteWebLocation: (webLocationId: string) => `${path}/${segment}/${webLocationId}`
    }
}

export const webLocationRoutesForMerchant = (path: string) => {
    const segment = 'web-locations'
    return {
        createWebLocation: () => `${path}/${segment}`,
        listWebLocations: () => `${path}/${segment}`
    }
}

export const webLocationRoutesForBrand = (path: string) => {
    const segment = 'web-locations'
    return {
        createWebLocation: () => `${path}/${segment}`,
        listWebLocations: () => `${path}/${segment}`
    }
}