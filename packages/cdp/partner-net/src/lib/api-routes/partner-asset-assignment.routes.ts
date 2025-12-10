export const partnerAssetAssignmentRoutesForPartner = (path: string) => {
    const segment = 'partner-asset-assignments'
    return {
        listPartnerAssetAssignments: () => `${path}/${segment}`
    }
}

export const partnerAssetAssignmentRoutesForAsset = (path: string) => {
    const segment = 'partner-asset-assignments'
    return {
        listPartnerAssetAssignments: () => `${path}/${segment}`
    }
}

export const partnerAssetAssignmentRoutes = (path: string) => {
    const segment = 'partner-asset-assignments'
    return {
        listPartnerAssetAssignments: () => `${path}/${segment}`,
        getPartnerAssetAssignment: (id: string) => `${path}/${segment}/${id}`,
        updatePartnerAssetAssignment: (id: string) => `${path}/${segment}/${id}`,
        deletePartnerAssetAssignment: (id: string) => `${path}/${segment}/${id}`
    }
}