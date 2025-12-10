export const dateFilterRoutesForStructuredQuery = (path: string) => {
    const segment = 'date-filters'
    return {
      createDateFilter: () => `${path}/${segment}`,
      listDateFilters: () => `${path}/${segment}`
    }
  }
  
  export const dateFilterRoutesForFilterGroup = (path: string) => {
    const segment = 'date-filters'
    return {
      createDateFilter: () => `${path}/${segment}`,
      listDateFilters: () => `${path}/${segment}`
    }
  }
  
  export const dateFilterRoutes = (path: string) => {
    const segment = 'date-filters'
    return {
      listDateFilters: () => `${path}/${segment}`,
      getDateFilter: (id: string) => `${path}/${segment}/${id}`,
      updateDateFilter: (id: string) => `${path}/${segment}/${id}`,
      deleteDateFilter: (id: string) => `${path}/${segment}/${id}`
    }
  }