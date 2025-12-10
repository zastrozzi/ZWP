// import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
// import { createReducer, on } from '@ngrx/store'
// import { FlowNodeEntity } from '../../model'
// import { FlowNodeActions, FlowNodeRemoteActions } from '../actions'
// import { Nullable, RemotePaginationState } from '@zwp/platform.common'

// export interface FlowNodeFeatureState {
//     nodes: EntityState<FlowNodeEntity>,
//     selectedNodeId: Nullable<string>,
//     nodesRemotePagination: RemotePaginationState
// }

// export const flowNodeEntityAdapter: EntityAdapter<FlowNodeEntity> = createEntityAdapter<FlowNodeEntity>()

// export const initialFlowNodeFeatureState: FlowNodeFeatureState = {
//     nodes: flowNodeEntityAdapter.getInitialState(),
//     selectedNodeId: null,
//     nodesRemotePagination: {
//         limit: 0,
//         offset: 0,
//         order: 'asc',
//         orderBy: null,
//         total: 0
//     }
// }

// export const flowNodeReducer = createReducer(
//     initialFlowNodeFeatureState,

//     on(
//         FlowNodeActions.add, 
//         (state, { node }) => ({ ...state, nodes: flowNodeEntityAdapter.setOne(node, state.nodes) })
//     ),

//     on(
//         FlowNodeActions.addMany, 
//         (state, { nodes }) => ({ ...state, nodes: flowNodeEntityAdapter.setMany(nodes, state.nodes) })
//     ),

//     on(
//         FlowNodeActions.remove, 
//         (state, { id }) => ({ 
//             ...state, 
//             nodes: flowNodeEntityAdapter.removeOne(id, state.nodes),
//             selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId
//         })
//     ),

//     on(
//         FlowNodeActions.removeMany,
//         (state, { ids }) => ({ 
//             ...state, 
//             nodes: flowNodeEntityAdapter.removeMany(ids, state.nodes),
//             selectedNodeId: state.selectedNodeId !== null && ids.includes(state.selectedNodeId) ? 
//                 null : state.selectedNodeId
//         })
//     ),

//     on(
//         FlowNodeActions.removeAll,
//         (state) => ({ 
//             ...state, 
//             nodes: flowNodeEntityAdapter.removeAll(state.nodes),
//             selectedNodeId: null
//         })
//     ),

//     on(
//         FlowNodeActions.setSelected,
//         (state, { id }) => ({ ...state, selectedNodeId: id })
//     ),

//     on(
//         FlowNodeRemoteActions.addRemote.success,
//         (state, remote) => ({ ...state, nodes: flowNodeEntityAdapter.setOne(remote.response, state.nodes) })
//     ),

//     on(
//         FlowNodeRemoteActions.getRemote.success,
//         (state, remote) => ({ ...state, nodes: flowNodeEntityAdapter.setOne(remote.response, state.nodes) })
//     ),

//     on(
//         FlowNodeRemoteActions.listRemote.request,
//         (state, request) => ({ 
//             ...state,
//             nodesRemotePagination: {
//                 ...state.nodesRemotePagination,
//                 ...request.query
//             }
//         })
//     ),

//     on(
//         FlowNodeRemoteActions.listRemote.success,
//         (state, remote) => ({ 
//             ...state, 
//             nodes: flowNodeEntityAdapter.setMany(remote.response.results, state.nodes),
//             nodesRemotePagination: {
//                 ...state.nodesRemotePagination,
//                 total: remote.response.total
//             }
//         })
//     ),

//     on(
//         FlowNodeRemoteActions.updateRemote.success,
//         (state, remote) => ({
//             ...state,
//             nodes: flowNodeEntityAdapter.upsertOne(remote.response, state.nodes)
//         })
//     ),

//     on(
//         FlowNodeRemoteActions.removeRemote.success,
//         (state, remote) => ({
//             ...state,
//             nodes: flowNodeEntityAdapter.removeOne(remote.response.flowNodeId, state.nodes)
//         })
//     )
// )