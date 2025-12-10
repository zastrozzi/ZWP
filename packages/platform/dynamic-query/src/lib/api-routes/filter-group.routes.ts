import { booleanFilterRoutesForFilterGroup } from './boolean-filter.routes'
import { dateFilterRoutesForFilterGroup } from './date-filter.routes'
import { enumFilterRoutesForFilterGroup } from './enum-filter.routes'
import { numericFilterRoutesForFilterGroup } from './numeric-filter.routes'
import { stringFilterRoutesForFilterGroup } from './string-filter.routes'
import { uuidFilterRoutesForFilterGroup } from './uuid-filter.routes'

export const filterGroupRoutes = (path: string) => {
    const segment = 'filter-groups'
    return {
      listFilterGroups: () => `${path}/${segment}`,
      getFilterGroup: (id: string) => `${path}/${segment}/${id}`,
      updateFilterGroup: (id: string) => `${path}/${segment}/${id}`,
      deleteFilterGroup: (id: string) => `${path}/${segment}/${id}`,
      filterGroupRoutesForParentGroup: (parentId: string) => filterGroupRoutesForParentGroup(`${path}/${segment}/${parentId}`),
      booleanFilterRoutesForFilterGroup: (parentId: string) => booleanFilterRoutesForFilterGroup(`${path}/${segment}/${parentId}`),
      dateFilterRoutesForFilterGroup: (parentId: string) => dateFilterRoutesForFilterGroup(`${path}/${segment}/${parentId}`),
      enumFilterRoutesForFilterGroup: (parentId: string) => enumFilterRoutesForFilterGroup(`${path}/${segment}/${parentId}`),
      numericFilterRoutesForFilterGroup: (parentId: string) => numericFilterRoutesForFilterGroup(`${path}/${segment}/${parentId}`),
      stringFilterRoutesForFilterGroup: (parentId: string) => stringFilterRoutesForFilterGroup(`${path}/${segment}/${parentId}`),
      uuidFilterRoutesForFilterGroup: (parentId: string) => uuidFilterRoutesForFilterGroup(`${path}/${segment}/${parentId}`)
    }
}

export const filterGroupRoutesForStructuredQuery = (path: string) => {
    const segment = 'filter-groups'
    return {
      createFilterGroup: () => `${path}/${segment}`,
      listFilterGroups: () => `${path}/${segment}`
    }
}

export const filterGroupRoutesForParentGroup = (path: string) => {
    const segment = 'filter-groups'
    return {
      createFilterGroup: () => `${path}/${segment}`,
      listFilterGroups: () => `${path}/${segment}`
    }
}