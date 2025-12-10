const carVanMileageRoutes = (path: string) => {
    const segment = 'car-van'
    return {
        getCarVanMileage: (mileageId: string) => `${path}/${segment}/${mileageId}`,
        listCarVanMileages: () => `${path}/${segment}`,
        updateCarVanMileage: (mileageId: string) => `${path}/${segment}/${mileageId}`,
        deleteCarVanMileage: (mileageId: string) => `${path}/${segment}/${mileageId}`
    }
}

const carVanMileageRoutesForRebatePeriod = (path: string) => {
    const segment = 'car-van'
    return {
        createCarVanMileage: () => `${path}/${segment}`,
        listCarVanMileages: carVanMileageRoutes(path).listCarVanMileages
    }
}

const carVanMileageRoutesForEmployment = (path: string) => {
    const segment = 'car-van'
    return {
        createCarVanMileage: () => `${path}/${segment}`,
        listCarVanMileages: carVanMileageRoutes(path).listCarVanMileages
    }
}

const cycleMileageRoutes = (path: string) => {
    const segment = 'cycle'
    return {
        getCycleMileage: (mileageId: string) => `${path}/${segment}/${mileageId}`,
        listCycleMileages: () => `${path}/${segment}`,
        updateCycleMileage: (mileageId: string) => `${path}/${segment}/${mileageId}`,
        deleteCycleMileage: (mileageId: string) => `${path}/${segment}/${mileageId}`
    }
}

const cycleMileageRoutesForRebatePeriod = (path: string) => {
    const segment = 'cycle'
    return {
        createCycleMileage: () => `${path}/${segment}`,
        listCycleMileages: cycleMileageRoutes(path).listCycleMileages
    }
}

const cycleMileageRoutesForEmployment = (path: string) => {
    const segment = 'cycle'
    return {
        createCycleMileage: () => `${path}/${segment}`,
        listCycleMileages: cycleMileageRoutes(path).listCycleMileages
    }
}

const motorcycleMileageRoutes = (path: string) => {
    const segment = 'motorcycle'
    return {
        getMotorcycleMileage: (mileageId: string) => `${path}/${segment}/${mileageId}`,
        listMotorcycleMileages: () => `${path}/${segment}`,
        updateMotorcycleMileage: (mileageId: string) => `${path}/${segment}/${mileageId}`,
        deleteMotorcycleMileage: (mileageId: string) => `${path}/${segment}/${mileageId}`
    }
}

const motorcycleMileageRoutesForRebatePeriod = (path: string) => {
    const segment = 'motorcycle'
    return {
        createMotorcycleMileage: () => `${path}/${segment}`,
        listMotorcycleMileages: motorcycleMileageRoutes(path).listMotorcycleMileages
    }
}

const motorcycleMileageRoutesForEmployment = (path: string) => {
    const segment = 'motorcycle'
    return {
        createMotorcycleMileage: () => `${path}/${segment}`,
        listMotorcycleMileages: motorcycleMileageRoutes(path).listMotorcycleMileages
    }
}

export const mileageRoutes = (path: string) => {
    const segment = 'mileage'
    return {
        carVanMileageRoutes: carVanMileageRoutes(`${path}/${segment}`),
        cycleMileageRoutes: cycleMileageRoutes(`${path}/${segment}`),
        motorcycleMileageRoutes: motorcycleMileageRoutes(`${path}/${segment}`),
        carVanMileageRoutesForRebatePeriod: carVanMileageRoutesForRebatePeriod(`${path}/${segment}`),
        cycleMileageRoutesForRebatePeriod: cycleMileageRoutesForRebatePeriod(`${path}/${segment}`),
        motorcycleMileageRoutesForRebatePeriod: motorcycleMileageRoutesForRebatePeriod(`${path}/${segment}`),
        carVanMileageRoutesForEmployment: carVanMileageRoutesForEmployment(`${path}/${segment}`),
        cycleMileageRoutesForEmployment: cycleMileageRoutesForEmployment(`${path}/${segment}`),
        motorcycleMileageRoutesForEmployment: motorcycleMileageRoutesForEmployment(`${path}/${segment}`)
    }
}