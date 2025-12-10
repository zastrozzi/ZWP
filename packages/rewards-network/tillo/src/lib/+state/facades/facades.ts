import { TilloBrandFacade } from './brand.facade'
import { TilloDigitalCodeBrandFacade } from './digital-code-brand.facade'
import { TilloDigitalCodeFacade } from './digital-code.facade'
import { TilloFloatFacade } from './float.facade'
import { TilloStoreCardFacade } from './store-card.facade'
import { TilloTransactionSpreadFacade } from './transaction-spread.facade'

export * from './brand.facade'
export * from './digital-code.facade'
export * from './digital-code-brand.facade'
export * from './float.facade'
export * from './store-card.facade'
export * from './transaction-spread.facade'

export const ALL = [
    TilloBrandFacade,
    TilloDigitalCodeBrandFacade,
    TilloDigitalCodeFacade,
    TilloFloatFacade,
    TilloStoreCardFacade,
    TilloTransactionSpreadFacade,
]
