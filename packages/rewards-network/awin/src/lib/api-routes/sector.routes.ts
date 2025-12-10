export const sectorRoutes = (path: string) => {
    const segment = 'sectors'
    return {
        createSector: () => `${path}/${segment}`,
        getSector: (id: string) => `${path}/${segment}/${id}`,
        listSectors: () => `${path}/${segment}`,
        updateSector: (id: string) => `${path}/${segment}/${id}`,
        deleteSector: (id: string) => `${path}/${segment}/${id}`,
        listSubsector: (id:string) => `${path}/${segment}/${id}/subsectors`,
        createSubsector: (id:string) => `${path}/${segment}/${id}/subsectors`,
        sectorRoutesForProgramme: (id:string) => sectorRoutesForProgramme(`${path}/${segment}/${id}`),
        sectorRoutesForProgrammeSector: (id:string) => sectorRoutesForProgrammeSector(`${path}/${segment}/${id}`)
    }
}

// subroutes 
// programme 
export const sectorRoutesForProgramme = (path: string) => {
    const segment = 'programmes'
    return {
        listProgrammes: () => `${path}/${segment}`,
        addProgramme: (id:string) => `${path}/${segment}/${id}/add`,
        removeProgramme: (id:string) => `${path}/${segment}/${id}/remove`,
    }
}

// programmeSector 
export const sectorRoutesForProgrammeSector = (path:string) => {
    const segment = 'programme-sectors'
    return {
        
        listProgramme: () => `${path}/${segment}`
    }
}