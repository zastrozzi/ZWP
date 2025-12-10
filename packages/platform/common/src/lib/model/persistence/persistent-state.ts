export type PersistentState<State> = {
    [P in keyof State]?: boolean | PersistentState<State>
}
