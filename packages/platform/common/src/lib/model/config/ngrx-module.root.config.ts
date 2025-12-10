export interface ZWPNgrxModuleRootConfig {
    enablePersistence: boolean
    enableRouterState: boolean
    enableApplicationState: boolean
    enableKeyboardState: boolean
    enableThemingState: boolean
    enablePersistenceProfileState: boolean
    enableHistoryState: boolean
    enableDevtools: boolean
    devtoolsMaxAge: number
    actionsBlocklist: string[]
}