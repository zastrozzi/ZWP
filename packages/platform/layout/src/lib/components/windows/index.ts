// import { BaseWindowComponent } from './base-window.component'
import { ExampleWindowComponent } from './example-window.component'
import { WindowLayoutDockComponent } from './window-layout.dock.component'
import { WindowComponent } from './window.component'
import { WindowDockButtonComponent } from './window.dock.button.component'

export * from './window.component'
export * from './example-window.component'
export * from './base-window.component'
export * from './window-layout.dock.component'
export * from './window.dock.button.component'

export const LAYOUT_WINDOWS_EXPORTABLE_COMPONENTS = [
    // BaseWindowComponent,
    ExampleWindowComponent,
    WindowComponent,
    WindowLayoutDockComponent,
    WindowDockButtonComponent
    
]