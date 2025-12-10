import { Model } from '../../model';
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    UpdateRemoteFilters,
    createActionType,
    createRemoteActionCRUDMap,
    createRemoteActionGroup,
    createRemoteActionMap
} from '@zwp/platform.common';
import { Identifiers } from '../identifiers';
import { createAction, props } from '@ngrx/store';

const DIGITAL_CODE_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_TILLO_ACTION_IDENTIFIER,
    Identifiers.DIGITAL_CODE_STATE_FEATURE_KEY
]

const updateDigitalCodeFilters = createAction(
    createActionType(DIGITAL_CODE_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.DigitalCodeFilters>>()
)

const resetDigitalCodeFilters = createAction(
    createActionType(DIGITAL_CODE_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetDigitalCodeState = createAction(
    createActionType(DIGITAL_CODE_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseDigitalCodeState = createAction(
    createActionType(DIGITAL_CODE_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectDigitalCode = createAction(
    createActionType(DIGITAL_CODE_ACTION_IDENTIFIERS, 'Select Digital Code'),
    props<{digitalCodeId: string}>()
)

const deselectDigitalCode = createAction(
    createActionType(DIGITAL_CODE_ACTION_IDENTIFIERS, 'Deselect Digital Code')
)

const resetPagination = createAction(
    createActionType(DIGITAL_CODE_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const getDigitalCode = createRemoteActionGroup<
    { digitalCodeId: string }, Model.DigitalGiftCodeResponse>
    ('Get Digital Code', ...DIGITAL_CODE_ACTION_IDENTIFIERS)


const listDigitalCodes = createRemoteActionGroup<
    { 
        digitalCodeId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.DigitalGiftCodeResponse>>>
    },
    PaginatedResponse<Model.DigitalGiftCodeResponse>
    >('List Digital Codes', ...DIGITAL_CODE_ACTION_IDENTIFIERS)

const deleteDigitalCode = createRemoteActionGroup<
    { digitalCodeId: string }, 
    { digitalCodeId: string }
    >('Delete Digital Code', ...DIGITAL_CODE_ACTION_IDENTIFIERS)

const topupDigitalCode = createRemoteActionGroup<
    { digitalCodeId: string }, 
    Model.DigitalGiftCodeResponse
    >('Topup Digital Code', ...DIGITAL_CODE_ACTION_IDENTIFIERS)

const cancelDigitalCode = createRemoteActionGroup<
    { digitalCodeId: string }, 
    Model.DigitalGiftCodeResponse
    >('Cancel Digital Code', ...DIGITAL_CODE_ACTION_IDENTIFIERS)

const cancelDigitalCodeURL = createRemoteActionGroup<
    { digitalCodeId: string }, 
    Model.DigitalGiftCodeResponse
    >('Cancel Digital Code URL', ...DIGITAL_CODE_ACTION_IDENTIFIERS)

const orderDigitalCode = createRemoteActionGroup<
    { brandId: string, request: Model.OrderCodeRequest}, 
    Model.DigitalGiftCodeResponse
    >('Order Digital Code', ...DIGITAL_CODE_ACTION_IDENTIFIERS)

const issueDigitalCode = createRemoteActionGroup<
    { brandId: string, request: Model.IssueCodeRequest }, 
    Model.DigitalGiftCodeResponse
    >('Issue Digital Code', ...DIGITAL_CODE_ACTION_IDENTIFIERS)

export const DigitalCodeLocalActions = {
    updateDigitalCodeFilters,
    resetDigitalCodeFilters,
    resetDigitalCodeState,
    initialiseDigitalCodeState,
    selectDigitalCode,
    deselectDigitalCode,
    resetPagination
}

export const DigitalCodeRemoteActions = createRemoteActionMap(
    DIGITAL_CODE_ACTION_IDENTIFIERS,
    {
        getDigitalCode,
        listDigitalCodes,
        topupDigitalCode,
        cancelDigitalCode,
        cancelDigitalCodeURL,
        deleteDigitalCode,
        orderDigitalCode,
        issueDigitalCode
    }
)