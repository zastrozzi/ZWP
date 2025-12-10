// import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
// import { createReducer, on } from '@ngrx/store'
// import { FlowPromptEntity } from '../../model'
// import { FlowPromptActions } from '../actions'

// export interface FlowPromptFeatureState {
//     prompts: EntityState<FlowPromptEntity>,
//     focusedPromptId: string | null
// }

// export const flowPromptEntityAdapter: EntityAdapter<FlowPromptEntity> = createEntityAdapter<FlowPromptEntity>()

// export const initialFlowPromptFeatureState: FlowPromptFeatureState = {
//     prompts: flowPromptEntityAdapter.getInitialState(),
//     focusedPromptId: null
// }

// export const flowPromptReducer = createReducer(
//     initialFlowPromptFeatureState,
//     on(
//         FlowPromptActions.add, 
//         (state, { prompt }) => ({ ...state, prompts: flowPromptEntityAdapter.setOne(prompt, state.prompts) })
//     ),
//     on(
//         FlowPromptActions.addMany, 
//         (state, { prompts }) => ({ ...state, prompts: flowPromptEntityAdapter.setMany(prompts, state.prompts) })
//     ),
//     on(
//         FlowPromptActions.focusInput,
//         (state, { id }) => ({ ...state, focusedPromptId: id })
//     ),
//     on(
//         FlowPromptActions.populateInput,
//         (state, { id, inputData }) => ({ 
//             ...state, 
//             prompts: flowPromptEntityAdapter.updateOne({ id: id, changes: { inputData } }, state.prompts) 
//         })
//     ),
//     on(
//         FlowPromptActions.submitInput,
//         (state, { id, inputData }) => ({ 
//             ...state, 
//             prompts: flowPromptEntityAdapter.updateOne({ id: id, changes: { inputData } }, state.prompts) 
//         })
//     ),
//     on(
//         FlowPromptActions.clearInput,
//         (state, { id }) => ({ 
//             ...state, 
//             prompts: flowPromptEntityAdapter.updateOne({ id: id, changes: { inputData: null } }, state.prompts) 
//         })
//     ),
//     on(
//         FlowPromptActions.remove,
//         (state, { id }) => ({ 
//             ...state, 
//             focusedPromptId: state.focusedPromptId === id ? null : state.focusedPromptId,
//             prompts: flowPromptEntityAdapter.removeOne(id, state.prompts)
//         })
//     ),
//     on(
//         FlowPromptActions.removeMany,
//         (state, { ids }) => ({ 
//             ...state, 
//             focusedPromptId: state.focusedPromptId !== null && ids.includes(state.focusedPromptId) ? null : state.focusedPromptId,
//             prompts: flowPromptEntityAdapter.removeMany(ids, state.prompts)
//         })
//     ),
//     on(
//         FlowPromptActions.removeAll,
//         (state) => ({ 
//             ...state, 
//             focusedPromptId: null,
//             prompts: flowPromptEntityAdapter.removeAll(state.prompts)
//         })
//     )
// )