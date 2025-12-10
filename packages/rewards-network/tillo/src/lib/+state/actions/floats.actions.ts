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
import { createAction, createActionGroup, props } from '@ngrx/store';

const FLOAT_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_TILLO_ACTION_IDENTIFIER,
    Identifiers.FLOAT_STATE_FEATURE_KEY
]

const updateFloatFilters = createAction(
    createActionType(FLOAT_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.FloatFilters>>()
)

const resetFloatFilters = createAction(
    createActionType(FLOAT_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetFloatState = createAction(
    createActionType(FLOAT_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseFloatState = createAction(
    createActionType(FLOAT_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectFloat = createAction(
    createActionType(FLOAT_ACTION_IDENTIFIERS, 'Select Float'),
    props<{floatId: string}>()
)

const deselectFloat = createAction(
    createActionType(FLOAT_ACTION_IDENTIFIERS, 'Deselect Float')
)

const resetPagination = createAction(
    createActionType(FLOAT_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const getFloat = createRemoteActionGroup<
    { floatId: string }, Model.FloatResponse>
    ('Get Float', ...FLOAT_ACTION_IDENTIFIERS)

const listFloats = createRemoteActionGroup<
    { pagination: Nullable<Partial<PaginatedQueryParams<Model.FloatResponse>>>},
    PaginatedResponse<Model.FloatResponse>>
    ('List Float', ...FLOAT_ACTION_IDENTIFIERS)

const deleteFloat = createRemoteActionGroup<
    { floatId: string }, { floatId: string}>
    ('Delete Float', ...FLOAT_ACTION_IDENTIFIERS)

const refreshFloat = createRemoteActionGroup<
    { floatId: string }, Model.FloatResponse>
    ('Refresh Float', ...FLOAT_ACTION_IDENTIFIERS)

export const FloatLocalActions = {
    updateFloatFilters,
    resetFloatFilters,
    resetFloatState,
    initialiseFloatState,
    selectFloat,
    deselectFloat,
    resetPagination
}

export const FloatRemoteActions = createRemoteActionMap(
    FLOAT_ACTION_IDENTIFIERS,
    {
        getFloat,
        listFloats,
        deleteFloat,
        refreshFloat
    }
)
