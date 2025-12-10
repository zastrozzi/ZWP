import { PersistentState } from "./persistent-state"

export interface PersistentStateFeature<State> {
    key: string
    state: PersistentState<State>
}

