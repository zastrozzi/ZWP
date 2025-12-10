export const partnerTypeAssignmentRoutes = (path: string) => {
    const segment = 'partner-type-assignments'
    return {
        listPartnerTypeAssignments: () => `${path}/${segment}`,
        getPartnerTypeAssignment: (id: string) => `${path}/${segment}/${id}`,
        deletePartnerTypeAssignment: (id: string) => `${path}/${segment}/${id}`
    }
}

export const partnerTypeAssignmentRoutesForPartnerType = (path: string) => {
    const segment = 'partner-type-assignments'
    return {
        listPartnerTypeAssignments: () => `${path}/${segment}`
    }
}

export const partnerTypeAssignmentRoutesForPartner = (path: string) => {
    const segment = 'partner-type-assignments'
    return {
        listPartnerTypeAssignments: () => `${path}/${segment}`
    }
}