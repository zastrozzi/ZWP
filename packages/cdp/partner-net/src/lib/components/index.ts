import { ASSET_COMPONENTS } from './asset'
import { PARTNER_COMPONENTS } from './partner'
import { SUBGROUP_COMPONENTS } from './subgroup'

export const INTERNAL_COMPONENTS = {
    ASSET_COMPONENTS,
    PARTNER_COMPONENTS,
    SUBGROUP_COMPONENTS,
    ALL: [
        ...ASSET_COMPONENTS.ALL,
        ...PARTNER_COMPONENTS.ALL,
        ...SUBGROUP_COMPONENTS.ALL
    ]
}