export const uuidFilterRoutesForStructuredQuery = (path: string) => {
    const segment = 'uuid-filters'
    return {
      createUUIDFilter: () => `${path}/${segment}`,
      listUUIDFilters: () => `${path}/${segment}`
    }
  }
  
  export const uuidFilterRoutesForFilterGroup = (path: string) => {
    const segment = 'uuid-filters'
    return {
      createUUIDFilter: () => `${path}/${segment}`,
      listUUIDFilters: () => `${path}/${segment}`
    }
  }
  
  export const uuidFilterRoutes = (path: string) => {
    const segment = 'uuid-filters'
    return {
      listUUIDFilters: () => `${path}/${segment}`,
      getUUIDFilter: (id: string) => `${path}/${segment}/${id}`,
      updateUUIDFilter: (id: string) => `${path}/${segment}/${id}`,
      deleteUUIDFilter: (id: string) => `${path}/${segment}/${id}`
    }
  }