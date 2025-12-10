export const numericFilterRoutesForStructuredQuery = (path: string) => {
    const segment = 'numeric-filters'
    return {
      createNumericFilter: () => `${path}/${segment}`,
      listNumericFilters: () => `${path}/${segment}`
    }
  }
  
  export const numericFilterRoutesForFilterGroup = (path: string) => {
    const segment = 'numeric-filters'
    return {
      createNumericFilter: () => `${path}/${segment}`,
      listNumericFilters: () => `${path}/${segment}`
    }
  }
  
  export const numericFilterRoutes = (path: string) => {
    const segment = 'numeric-filters'
    return {
      listNumericFilters: () => `${path}/${segment}`,
      getNumericFilter: (id: string) => `${path}/${segment}/${id}`,
      updateNumericFilter: (id: string) => `${path}/${segment}/${id}`,
      deleteNumericFilter: (id: string) => `${path}/${segment}/${id}`
    }
  }