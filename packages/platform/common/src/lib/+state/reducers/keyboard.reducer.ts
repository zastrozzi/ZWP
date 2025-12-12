import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity"
import { createReducer, on } from "@ngrx/store"
import { KeyboardShortcutEntity } from "../../model"
import { KeyboardActions } from "../actions"
import { arrayDistinctRemove, arrayDistinctUpsert } from '../../utils'

export interface KeyboardFeatureState extends EntityState<KeyboardShortcutEntity> {
    activeKeyCodes: number[]
    altKeyActive: boolean
    ctrlKeyActive: boolean
    metaKeyActive: boolean
    shiftKeyActive: boolean
}

export const keyboardShortcutEntityAdapter: EntityAdapter<KeyboardShortcutEntity> = createEntityAdapter<KeyboardShortcutEntity>()

export const initialKeyboardFeatureState: KeyboardFeatureState = keyboardShortcutEntityAdapter.getInitialState({
    activeKeyCodes: [],
    altKeyActive: false,
    ctrlKeyActive: false,
    metaKeyActive: false,
    shiftKeyActive: false
})

export const keyboardReducer = createReducer(
    initialKeyboardFeatureState,
    on(KeyboardActions.recordKeydown, (state, { keyCode }) => ({ ...state, activeKeyCodes: arrayDistinctUpsert(state.activeKeyCodes, keyCode) })),
    on(KeyboardActions.recordKeyup, (state, { keyCode }) => ({ ...state, activeKeyCodes: arrayDistinctRemove(state.activeKeyCodes, keyCode) })),
    on(KeyboardActions.setAltKeyActive, (state, { active }) => ({ ...state, altKeyActive: active })),
    on(KeyboardActions.setCtrlKeyActive, (state, { active }) => ({ ...state, ctrlKeyActive: active })),
    on(KeyboardActions.setMetaKeyActive, (state, { active }) => ({ ...state, metaKeyActive: active })),
    on(KeyboardActions.setShiftKeyActive, (state, { active }) => ({ ...state, shiftKeyActive: active }))
)