// import { createAction, props } from '@ngrx/store'
// import { createActionType } from '@zwp/platform.common'
// import { FLOWS_ACTION_IDENTIFIER, FLOW_PROMPT_STATE_FEATURE_KEY } from '../identifiers'
// import { FlowPromptEntity } from '../../model'

// const FLOW_PROMPT_ACTION_IDENTIFIERS = [FLOWS_ACTION_IDENTIFIER, FLOW_PROMPT_STATE_FEATURE_KEY]
// const add = createAction(createActionType(FLOW_PROMPT_ACTION_IDENTIFIERS, 'Add'), props<{ prompt: FlowPromptEntity }>())
// const addMany = createAction(createActionType(FLOW_PROMPT_ACTION_IDENTIFIERS, 'AddMany'), props<{ prompts: FlowPromptEntity[] }>())
// const focusInput = createAction(createActionType(FLOW_PROMPT_ACTION_IDENTIFIERS, 'FocusInput'), props<{ id: string | null }>())
// const populateInput = createAction(createActionType(FLOW_PROMPT_ACTION_IDENTIFIERS, 'PopulateInput'), props<{ id: string, inputData: object }>())
// const submitInput = createAction(createActionType(FLOW_PROMPT_ACTION_IDENTIFIERS, 'SubmitInput'), props<{ id: string, inputData: object }>())
// const clearInput = createAction(createActionType(FLOW_PROMPT_ACTION_IDENTIFIERS, 'ClearInput'), props<{ id: string }>())
// const remove = createAction(createActionType(FLOW_PROMPT_ACTION_IDENTIFIERS, 'Remove'), props<{ id: string }>())
// const removeMany = createAction(createActionType(FLOW_PROMPT_ACTION_IDENTIFIERS, 'RemoveMany'), props<{ ids: string[] }>())
// const removeAll = createAction(createActionType(FLOW_PROMPT_ACTION_IDENTIFIERS, 'RemoveAll'))

// export const FlowPromptActions = {
//     add,
//     addMany,
//     focusInput,
//     populateInput,
//     submitInput,
//     clearInput,
//     remove,
//     removeMany,
//     removeAll
// }