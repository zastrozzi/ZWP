export const programmeSectorRoutes = (path: string) => {
    const segment = 'programme-sectors'
    return {
        getProgrammeSector: (id:string) => `${path}/${segment}/${id}`,
        //getID
        listProgrammeSector: () => `${path}/${segment}`,
        //update
        deleteProgrammeSector: (id:string) => `${path}/${segment}/${id}`
        //delete
    }
}