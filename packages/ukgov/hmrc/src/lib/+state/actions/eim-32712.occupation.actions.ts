import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    createActionType,
    createRemoteActionGroup,
    createRemoteActionMap
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const EIM_32712_OCCUPATION_ACTION_IDENTIFIERS = [
    Identifiers.UKGOV_HMRC_ACTION_IDENTIFIER,
    Identifiers.EIM32712_OCCUPATION_STATE_FEATURE_KEY
]

const updateEIM32712OccupationFilters = createAction(
    createActionType(EIM_32712_OCCUPATION_ACTION_IDENTIFIERS, 'Update Filters'),
    props<{ filters: Partial<Model.EIM32712OccupationFilters> }>()
)

const addEIM327120OccupationFiltersIndustryInValue = createAction(
    createActionType(EIM_32712_OCCUPATION_ACTION_IDENTIFIERS, 'Add Industry In Value'),
    props<{ industry: Model.EIM32712Industry }>()
)

const removeEIM327120OccupationFiltersIndustryInValue = createAction(
    createActionType(EIM_32712_OCCUPATION_ACTION_IDENTIFIERS, 'Remove Industry In Value'),
    props<{ industry: Model.EIM32712Industry }>()
)

const resetEIM32712OccupationFilters = createAction(
    createActionType(EIM_32712_OCCUPATION_ACTION_IDENTIFIERS, 'Reset Filters')
)

const resetEIM32712OccupationState = createAction(
    createActionType(EIM_32712_OCCUPATION_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseEIM32712OccupationState = createAction(
    createActionType(EIM_32712_OCCUPATION_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectEIM32712Occupation = createAction(
    createActionType(EIM_32712_OCCUPATION_ACTION_IDENTIFIERS, 'Select'),
    props<{ id: string }>()
)

const createEIM32712Occupation = createRemoteActionGroup<
    Model.CreateEIM32712OccupationRequest,
    Model.EIM32712OccupationResponse
>('Create', ...EIM_32712_OCCUPATION_ACTION_IDENTIFIERS)

const getEIM32712Occupation = createRemoteActionGroup<
    { occupationId: string },
    Model.EIM32712OccupationResponse
>('Get', ...EIM_32712_OCCUPATION_ACTION_IDENTIFIERS)

const listEIM32712Occupations = createRemoteActionGroup<
    { pagination: Nullable<Partial<PaginatedQueryParams<Model.EIM32712OccupationResponse>>> },
    PaginatedResponse<Model.EIM32712OccupationResponse>
>('List', ...EIM_32712_OCCUPATION_ACTION_IDENTIFIERS)

const updateEIM32712Occupation = createRemoteActionGroup<
    { occupationId: string, request: Model.UpdateEIM32712OccupationRequest },
    Model.EIM32712OccupationResponse
>('Update', ...EIM_32712_OCCUPATION_ACTION_IDENTIFIERS)

const deleteEIM32712Occupation = createRemoteActionGroup<
    { occupationId: string },
    { occupationId: string }
>('Delete', ...EIM_32712_OCCUPATION_ACTION_IDENTIFIERS)

export const EIM32712OccupationLocalActions = {
    updateEIM32712OccupationFilters,
    addEIM327120OccupationFiltersIndustryInValue,
    removeEIM327120OccupationFiltersIndustryInValue,
    resetEIM32712OccupationFilters,
    resetEIM32712OccupationState,
    initialiseEIM32712OccupationState,
    selectEIM32712Occupation
}

export const EIM32712OccupationRemoteActions = createRemoteActionMap(
    EIM_32712_OCCUPATION_ACTION_IDENTIFIERS,
    {
        createEIM32712Occupation,
        getEIM32712Occupation,
        listEIM32712Occupations,
        updateEIM32712Occupation,
        deleteEIM32712Occupation
    }
)