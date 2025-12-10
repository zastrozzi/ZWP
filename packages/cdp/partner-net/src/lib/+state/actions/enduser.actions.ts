import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    createRemoteActionGroup,
    createRemoteActionMap,
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { CDPUsers } from '@zwp/cdp.users'

const ENDUSER_ACTION_IDENTIFIERS = [
    Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER,
    CDPUsers.State.Identifiers.ENDUSER_STATE_FEATURE_KEY,
]

const listEndusers = createRemoteActionGroup<
    {
        parentId: string
        parentType: 'partner' | 'subgroup'
        pagination: Nullable<Partial<PaginatedQueryParams<CDPUsers.Model.EnduserResponse>>>
    },
    PaginatedResponse<CDPUsers.Model.EnduserResponse>
>('List Endusers', ...ENDUSER_ACTION_IDENTIFIERS)

export const EnduserRemoteActions = createRemoteActionMap(ENDUSER_ACTION_IDENTIFIERS, {
    listEndusers,
})
