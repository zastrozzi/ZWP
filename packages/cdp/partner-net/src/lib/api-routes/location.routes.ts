export const locationRoutes = (path: string) => {
    const segment = 'locations'
    return {
        listLocations: () => `${path}/${segment}`,
        getLocation: (id: string) => `${path}/${segment}/${id}`,
        updateLocation: (id: string) => `${path}/${segment}/${id}`,
        deleteLocation: (id: string) => `${path}/${segment}/${id}`
    }
}

export const locationRoutesForPartner = (path: string) => {
    const segment = 'locations'
    return {
        createLocation: () => `${path}/${segment}`,
        listLocations: () => `${path}/${segment}`
    }
}

export const locationRoutesForSubgroup = (path: string) => {
    const segment = 'locations'
    return {
        createLocation: () => `${path}/${segment}`,
        listLocations: () => `${path}/${segment}`
    }
}