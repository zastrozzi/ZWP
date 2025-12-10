const columnRoutes = (path: string) => {
    const segment = 'columns'
    return {
        listColumns: () => `${path}/${segment}`,
        getColumn: (id: string) => `${path}/${segment}/${id}`
    }
}

const columnRoutesForTable = (path: string) => {
    const segment = 'columns'
    return {
        listColumns: () => `${path}/${segment}`
    }
}

const relationshipRoutes = (path: string) => {
    const segment = 'relationships'
    return {
        listRelationships: () => `${path}/${segment}`,
        getRelationship: (id: string) => `${path}/${segment}/${id}`
    }
}

const relationshipRoutesForTable = (path: string) => {
    const segment = 'relationships'
    return {
        listChildRelationships: () => `${path}/${segment}/child`,
        listChildrenRelationships: () => `${path}/${segment}/children`,
        listParentRelationships: () => `${path}/${segment}/parent`,
        listSiblingRelationships: () => `${path}/${segment}/siblings`,
        listRelationships: () => `${path}/${segment}`
    }
}

const tableRoutes = (path: string) => {
    const segment = 'tables'
    return {
        listTables: () => `${path}/${segment}`,
        getTable: (id: string) => `${path}/${segment}/${id}`,
        columnRoutesForTable: (id: string) => columnRoutesForTable(`${path}/${segment}/${id}`),
        relationshipRoutesForTable: (id: string) => relationshipRoutesForTable(`${path}/${segment}/${id}`)
    }
}

export const queryableSchemaRoutes = (path: string) => {
    const segment = 'schemas'
    return {
        tableRoutes: () => tableRoutes(`${path}/${segment}`),
        columnRoutes: () => columnRoutes(`${path}/${segment}`),
        relationshipRoutes: () => relationshipRoutes(`${path}/${segment}`)
    }
}