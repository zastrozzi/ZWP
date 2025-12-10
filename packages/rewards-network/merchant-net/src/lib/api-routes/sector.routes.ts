import { brandSectorRoutesForSector, brandSectorRoutesForNestedSector } from './brand-sector.routes'
import { brandRoutesForSector } from './brand.routes'

export const sectorRoutes = (path: string) => {
    const segment = 'sectors'
    return {
        createSector: () => `${path}/${segment}`,
        listSectors: () => `${path}/${segment}`,
        getSector: (sectorId: string) => `${path}/${segment}/${sectorId}`,
        updateSector: (sectorId: string) => `${path}/${segment}/${sectorId}`,
        deleteSector: (sectorId: string) => `${path}/${segment}/${sectorId}`,
        subsectorRoutesForSector: (sectorId: string) => subsectorRoutesForSector(`${path}/${segment}/${sectorId}`),
        brandRoutesForSector: (sectorId: string) => brandRoutesForSector(`${path}/${segment}/${sectorId}`),
        brandSectorRoutesForSector: (sectorId: string) => brandSectorRoutesForSector(`${path}/${segment}/${sectorId}`)
    }
}

export const subsectorRoutesForSector = (path: string) => {
    const segment = 'subsectors'
    return {
        createSubsector: () => `${path}/${segment}`,
        listSubsectors: () => `${path}/${segment}`
    }
}

export const sectorRoutesForBrand = (path: string) => {
    const segment = 'sectors'
    return {
        listSectors: () => `${path}/${segment}`,
        brandSectorRoutesForNestedSector: (sectorId: string) => brandSectorRoutesForNestedSector(`${path}/${segment}/${sectorId}`)
    }
}