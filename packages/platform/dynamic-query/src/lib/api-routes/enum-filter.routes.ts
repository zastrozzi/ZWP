export const enumFilterRoutesForStructuredQuery = (path: string) => {
    const segment = 'enum-filters'
    return {
      createEnumFilter: () => `${path}/${segment}`,
      listEnumFilters: () => `${path}/${segment}`
    }
  }
  
  export const enumFilterRoutesForFilterGroup = (path: string) => {
    const segment = 'enum-filters'
    return {
      createEnumFilter: () => `${path}/${segment}`,
      listEnumFilters: () => `${path}/${segment}`
    }
  }
  
  export const enumFilterRoutes = (path: string) => {
    const segment = 'enum-filters'
    return {
      listEnumFilters: () => `${path}/${segment}`,
      getEnumFilter: (id: string) => `${path}/${segment}/${id}`,
      updateEnumFilter: (id: string) => `${path}/${segment}/${id}`,
      deleteEnumFilter: (id: string) => `${path}/${segment}/${id}`
    }
  }