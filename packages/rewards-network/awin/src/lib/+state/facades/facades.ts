import { AWinCategoryFacade } from './category.facade'
import { AWinSectorFacade } from './sector.facade'
import { AWinAccountFacade } from './account.facade'

export * from './account.facade'
export * from './category.facade'
export * from './sector.facade'

export const ALL = [
    AWinAccountFacade,
    AWinCategoryFacade,
    AWinSectorFacade
]