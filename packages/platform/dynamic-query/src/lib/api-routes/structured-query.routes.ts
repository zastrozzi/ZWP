import { booleanFilterRoutesForStructuredQuery } from './boolean-filter.routes'
import { dateFilterRoutesForStructuredQuery } from './date-filter.routes'
import { enumFilterRoutesForStructuredQuery } from './enum-filter.routes'
import { filterGroupRoutesForStructuredQuery } from './filter-group.routes'
import { numericFilterRoutesForStructuredQuery } from './numeric-filter.routes'
import { stringFilterRoutesForStructuredQuery } from './string-filter.routes'
import { uuidFilterRoutesForStructuredQuery } from './uuid-filter.routes'

export const structuredQueryRoutes = (path: string) => {
    const segment = 'structured-queries'
    return {
      listStructuredQueries: () => `${path}/${segment}`,
      createStructuredQuery: () => `${path}/${segment}`,
      getStructuredQuery: (id: string) => `${path}/${segment}/${id}`,
      updateStructuredQuery: (id: string) => `${path}/${segment}/${id}`,
      deleteStructuredQuery: (id: string) => `${path}/${segment}/${id}`,
      filterGroupRoutesForStructuredQuery: (id: string) => filterGroupRoutesForStructuredQuery(`${path}/${segment}/${id}`),
      booleanFilterRoutesForStructuredQuery: (id: string) => booleanFilterRoutesForStructuredQuery(`${path}/${segment}/${id}`),
      dateFilterRoutesForStructuredQuery: (id: string) => dateFilterRoutesForStructuredQuery(`${path}/${segment}/${id}`),
      enumFilterRoutesForStructuredQuery: (id: string) => enumFilterRoutesForStructuredQuery(`${path}/${segment}/${id}`),
      numericFilterRoutesForStructuredQuery: (id: string) => numericFilterRoutesForStructuredQuery(`${path}/${segment}/${id}`),
      stringFilterRoutesForStructuredQuery: (id: string) => stringFilterRoutesForStructuredQuery(`${path}/${segment}/${id}`),
      uuidFilterRoutesForStructuredQuery: (id: string) => uuidFilterRoutesForStructuredQuery(`${path}/${segment}/${id}`)
    }
}