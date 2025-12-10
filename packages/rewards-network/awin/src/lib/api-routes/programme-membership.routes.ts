export const programmeMembershipRoutes = (path: string) => {
    const segment = 'memberships'
    return {
        // Refresh
        refreshProgrammeMembership: () => `${path}/${segment}`,
        getProgrammeMembership: (id:string) => `${path}/${segment}/${id}`,
        //getID
        listProgrammeMembership: () => `${path}/${segment}`,
        //update
        deleteProgrammeMembership: (id:string) => `${path}/${segment}/${id}`,
        //delete
    }
}

// Check if this has subroutes
