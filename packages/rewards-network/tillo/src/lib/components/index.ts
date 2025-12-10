import { TilloHomeComponent } from './tillo.home.component'
import { BRAND_COMPONENTS } from './brands'
import { DIGITAL_CODE_COMPONENTS } from './digital-codes'
import { FLOAT_COMPONENTS } from './floats'
import { STORE_CARD_COMPONENTS } from './store-cards'
import { TRANSACTION_SPREAD_COMPONENTS } from './transaction-spreads'

export * from './brands'
export * from './digital-codes'
export * from './floats'
export * from './store-cards'
export * from './transaction-spreads'
export * from './tillo.home.component'

export const INTERNAL_COMPONENTS = {
    BRAND_COMPONENTS,
    DIGITAL_CODE_COMPONENTS,
    FLOAT_COMPONENTS,
    STORE_CARD_COMPONENTS,
    TRANSACTION_SPREAD_COMPONENTS,

    TilloHomeComponent,
    ALL: [
        ...BRAND_COMPONENTS.ALL,
        ...DIGITAL_CODE_COMPONENTS.ALL,
        ...FLOAT_COMPONENTS.ALL,
        ...STORE_CARD_COMPONENTS.ALL,
        ...TRANSACTION_SPREAD_COMPONENTS.ALL,
        TilloHomeComponent
    ]
}
