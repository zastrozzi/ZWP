import { createAction, props } from '@ngrx/store'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    createActionType,
    createRemoteActionGroup,
    createRemoteActionMap,
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { Model } from '../../model'

const FLOW_CONTAINER_ACTION_IDENTIFIERS = [
    Identifiers.FLOWS_ACTION_IDENTIFIER, 
    Identifiers.FLOW_CONTAINER_STATE_FEATURE_KEY
]

const updateFlowContainerFilters = createAction(
    createActionType(FLOW_CONTAINER_ACTION_IDENTIFIERS, 'Update Filters'),
    props<{ filters: Partial<Model.FlowContainerFilters> }>()
)

const resetFlowContainerFilters = createAction(
    createActionType(FLOW_CONTAINER_ACTION_IDENTIFIERS, 'Reset Filters')
)

const resetFlowContainerState = createAction(
    createActionType(FLOW_CONTAINER_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseFlowContainerState = createAction(
    createActionType(FLOW_CONTAINER_ACTION_IDENTIFIERS, 'Initialise State')
)

const setSelectedFlowContainer = createAction(
    createActionType(FLOW_CONTAINER_ACTION_IDENTIFIERS, 'Set Selected'),
    props<{ flowContainerId: string }>()
)

const createFlowContainer = createRemoteActionGroup<
    { request: Model.CreateFlowContainerRequest },
    Model.FlowContainerResponse
>('Create Flow Container', ...FLOW_CONTAINER_ACTION_IDENTIFIERS)

const getFlowContainer = createRemoteActionGroup<
    { flowContainerId: string },
    Model.FlowContainerResponse
>('Get Flow Container', ...FLOW_CONTAINER_ACTION_IDENTIFIERS)

const listFlowContainers = createRemoteActionGroup<
    { pagination: Nullable<Partial<PaginatedQueryParams<Model.FlowContainerResponse>>> },
    PaginatedResponse<Model.FlowContainerResponse>
>('List Flow Containers', ...FLOW_CONTAINER_ACTION_IDENTIFIERS)

const updateFlowContainer = createRemoteActionGroup<
    { flowContainerId: string; update: Model.UpdateFlowContainerRequest },
    Model.FlowContainerResponse
>('Update Flow Container', ...FLOW_CONTAINER_ACTION_IDENTIFIERS)

const deleteFlowContainer = createRemoteActionGroup<
    { flowContainerId: string },
    { flowContainerId: string }
>('Delete Flow Container', ...FLOW_CONTAINER_ACTION_IDENTIFIERS)

export const FlowContainerLocalActions = {
    updateFlowContainerFilters,
    resetFlowContainerFilters,
    resetFlowContainerState,
    initialiseFlowContainerState,
    setSelectedFlowContainer,
}

export const FlowContainerRemoteActions = createRemoteActionMap(
    FLOW_CONTAINER_ACTION_IDENTIFIERS,
    {
        createFlowContainer,
        getFlowContainer,
        listFlowContainers,
        updateFlowContainer,
        deleteFlowContainer,
    }
)