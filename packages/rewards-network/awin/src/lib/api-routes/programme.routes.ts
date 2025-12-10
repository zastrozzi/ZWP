import { sectorRoutesForProgramme } from './sector.routes'

export const programmeRoutes = (path: string) => {
    const segment = 'programmes'
    return {
        // Refresh
        refreshProgramme: () => `${path}/${segment}`,
        getProgramme: (id:string) => `${path}/${segment}/${id}`,
        //getID
        listProgramme: () => `${path}/${segment}`,
        //update
        deleteProgramme: (id:string) => `${path}/${segment}/${id}`,
        //delete

        sectorRoutesForProgramme: (id: string) => sectorRoutesForProgramme(`${path}/${segment}/${id}`),
        programmeRoutesForSector: (id: string) => programmeRoutesForSector(`${path}/${segment}/${id}`),
        programmeRoutesForPromotion: (id: string) => programmeRoutesForPromotion(`${path}/${segment}/${id}`),
        programmeRoutesForProgrammeSector: (id: string) => programmeRoutesForProgrammeSector(`${path}/${segment}/${id}`)
        
    }
}

// subroutes:
// Promotion + Membership + Sector + ProgrammeSector

export const  membershipRoutesForProgramme = (path: string) => {
    const segment = 'memberships'
    return {
        listMemberships: () => `${path}/${segment}`
    }
}

export const programmeRoutesForSector = (path: string) => {
    const segment = 'sectors'
    return {
        addSector: (id:string) => `${path}/${segment}/${id}/add`,
        removeSector: (id:string) => `${path}/${segment}/${id}/remove`,
        listSectors: () => `${path}/{segment}`, 
    }
    
}

export const programmeRoutesForProgrammeSector = (path: string) => {
    const segment = 'programme-sectors'
    return {
        listProgrammeSectors: () => `${path}/${segment}`,
    }
    
}

export const programmeRoutesForPromotion = (path:string) => {
    const segment = 'promotions'
    return {
        listPromotions:() => `${path}/${segment}`,
        refreshPromotions:() => `${path}/${segment}/refresh`,
        getPromotions:(id:string) => `${path}/${segment}/${id}`,
        deletePromotions:(id:string) => `${path}/${segment}/${id}`,
    }
}