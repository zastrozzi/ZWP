export const booleanFilterRoutesForFilterGroup = (path: string) => {
    const segment = 'boolean-filters'
    return {
      createBooleanFilter: () => `${path}/${segment}`,
      listBooleanFilters: () => `${path}/${segment}`
    }
}

export const booleanFilterRoutesForStructuredQuery = (path: string) => {
    const segment = 'boolean-filters'
    return {
      createBooleanFilter: () => `${path}/${segment}`,
      listBooleanFilters: () => `${path}/${segment}`
    }
}

export const booleanFilterRoutes = (path: string) => {
    const segment = 'boolean-filters'
    return {
      listBooleanFilters: () => `${path}/${segment}`,
      getBooleanFilter: (id: string) => `${path}/${segment}/${id}`,
      updateBooleanFilter: (id: string) => `${path}/${segment}/${id}`,
      deleteBooleanFilter: (id: string) => `${path}/${segment}/${id}`
    }
}