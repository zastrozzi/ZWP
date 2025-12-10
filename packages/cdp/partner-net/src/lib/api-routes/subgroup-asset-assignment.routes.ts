export const subgroupAssetAssignmentRoutesForSubgroup = (path: string) => {
    const segment = 'subgroup-asset-assignments'
    return {
        listSubgroupAssetAssignments: () => `${path}/${segment}`
    }
}

export const subgroupAssetAssignmentRoutesForAsset = (path: string) => {
    const segment = 'subgroup-asset-assignments'
    return {
        listSubgroupAssetAssignments: () => `${path}/${segment}`
    }
}

export const subgroupAssetAssignmentRoutes = (path: string) => {
    const segment = 'subgroup-asset-assignments'
    return {
        listSubgroupAssetAssignments: () => `${path}/${segment}`,
        getSubgroupAssetAssignment: (id: string) => `${path}/${segment}/${id}`,
        updateSubgroupAssetAssignment: (id: string) => `${path}/${segment}/${id}`,
        deleteSubgroupAssetAssignment: (id: string) => `${path}/${segment}/${id}`
    }
}