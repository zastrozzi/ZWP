export const accountRoutes = (path: string) => {
    const segment = 'accounts'
    return {
        listAccounts: () => `${path}/${segment}`,
        refreshAccounts: () => `${path}/${segment}`,
        getAccout: (id:string) => `${path}/${segment}/${id}`,
        deleteAccount: (id:string) => `${path}/${segment}/${id}`,
        membershipRoutesForAccount:(id:string) => membershipRoutesForAccount(`${path}/${segment}/${id}`),
        programmeRoutesForAccount:(id:string) => programmeRoutesForAccount(`${path}/${segment}/${id}`),
        promotionRoutesForAccount:(id:string) => promotionRoutesForAccount(`${path}/${segment}/${id}`)
    }
}

export const membershipRoutesForAccount = (path: string) => {
    const segment = 'memberships'
    return {
        listMemberships: () => `${path}/${segment}`,
        refreshMemberships: () => `${path}/${segment}/refresh`
    }
}

export const programmeRoutesForAccount = (path: string) => {
    const segment='programmes'
    return {
        listProgrammes: () => `${path}/${segment}`
    }
}

export const promotionRoutesForAccount =(path:string) => {
    const segment ='promotions'
    return {
        listPromotions:() => `${path}/${segment}`,
        refreshPromotions:() => `${path}/${segment}/refresh`,
    }
}