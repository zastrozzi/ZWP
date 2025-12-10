export const stringFilterRoutesForStructuredQuery = (path: string) => {
    const segment = 'string-filters'
    return {
      createStringFilter: () => `${path}/${segment}`,
      listStringFilters: () => `${path}/${segment}`
    }
  }
  
  export const stringFilterRoutesForFilterGroup = (path: string) => {
    const segment = 'string-filters'
    return {
      createStringFilter: () => `${path}/${segment}`,
      listStringFilters: () => `${path}/${segment}`
    }
  }
  
  export const stringFilterRoutes = (path: string) => {
    const segment = 'string-filters'
    return {
      listStringFilters: () => `${path}/${segment}`,
      getStringFilter: (id: string) => `${path}/${segment}/${id}`,
      updateStringFilter: (id: string) => `${path}/${segment}/${id}`,
      deleteStringFilter: (id: string) => `${path}/${segment}/${id}`
    }
}