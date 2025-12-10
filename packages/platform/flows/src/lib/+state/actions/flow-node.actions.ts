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

const FLOW_NODE_ACTION_IDENTIFIERS = [Identifiers.FLOWS_ACTION_IDENTIFIER, Identifiers.FLOW_NODE_STATE_FEATURE_KEY]

const updateFlowNodeFilters = createAction(
    createActionType(FLOW_NODE_ACTION_IDENTIFIERS, 'Update Filters'),
    props<{ filters: Partial<Model.FlowNodeFilters> }>()
)

const resetFlowNodeFilters = createAction(
    createActionType(FLOW_NODE_ACTION_IDENTIFIERS, 'Reset Filters')
)

const resetFlowNodeState = createAction(
    createActionType(FLOW_NODE_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseFlowNodeState = createAction(
    createActionType(FLOW_NODE_ACTION_IDENTIFIERS, 'Initialise State')
)

const setSelectedFlowNode = createAction(
    createActionType(FLOW_NODE_ACTION_IDENTIFIERS, 'Set Selected'),
    props<{ flowNodeId: string }>()
)

const createFlowNode = createRemoteActionGroup<
    { containerId: string, request: Model.CreateFlowNodeRequest },
    Model.FlowNodeResponse
>('Create Flow Node', ...FLOW_NODE_ACTION_IDENTIFIERS)

const getFlowNode = createRemoteActionGroup<
    { flowNodeId: string },
    Model.FlowNodeResponse
>('Get Flow Node', ...FLOW_NODE_ACTION_IDENTIFIERS)

const listFlowNodes = createRemoteActionGroup<
    { containerId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.FlowNodeResponse>>> },
    PaginatedResponse<Model.FlowNodeResponse>
>('List Flow Nodes', ...FLOW_NODE_ACTION_IDENTIFIERS)

const updateFlowNode = createRemoteActionGroup<
    { flowNodeId: string, update: Model.UpdateFlowNodeRequest },
    Model.FlowNodeResponse
>('Update Flow Node', ...FLOW_NODE_ACTION_IDENTIFIERS)

const deleteFlowNode = createRemoteActionGroup<
    { flowNodeId: string },
    { flowNodeId: string }
>('Delete Flow Node', ...FLOW_NODE_ACTION_IDENTIFIERS)

export const FlowNodeLocalActions = {
    updateFlowNodeFilters,
    resetFlowNodeFilters,
    resetFlowNodeState,
    initialiseFlowNodeState,
}

export const FlowNodeRemoteActions = createRemoteActionMap(
    FLOW_NODE_ACTION_IDENTIFIERS,
    {
        createFlowNode,
        getFlowNode,
        listFlowNodes,
        updateFlowNode,
        deleteFlowNode,
    }
)