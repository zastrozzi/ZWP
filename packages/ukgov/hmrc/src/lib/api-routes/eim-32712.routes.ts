const occupationRoutes = (path: string) => {
    const segment = 'occupations'
    return {
        listOccupations: `${path}/${segment}`,
        createOccupation: `${path}/${segment}`,
        getOccupation: (id: string) => `${path}/${segment}/${id}`,
        updateOccupation: (id: string) => `${path}/${segment}/${id}`,
        deleteOccupation: (id: string) => `${path}/${segment}/${id}`
    }
}

export const eim32712Routes = (path: string) => {
    const segment = 'eim32712'
    return {
        occupationRoutes: occupationRoutes(`${path}/${segment}`)
    }
}