import { LAYOUT_MENUS_EXPORTABLE_COMPONENTS } from "./menus";
import { LAYOUT_PANELS_EXPORTABLE_COMPONENTS } from "./panels";
import { SomeComponent } from "./some.component";
import { TABLES_EXPORTABLE_COMPONENTS } from "./tables";
import { LAYOUT_WINDOWS_EXPORTABLE_COMPONENTS } from "./windows";

export * from './menus'
export * from './panels'
export * from './windows'
export * from './some.component'
export * from './tables'

export const LAYOUT_EXPORTABLE_COMPONENTS = [
    ...LAYOUT_MENUS_EXPORTABLE_COMPONENTS,
    ...LAYOUT_PANELS_EXPORTABLE_COMPONENTS,
    ...LAYOUT_WINDOWS_EXPORTABLE_COMPONENTS,
    ...TABLES_EXPORTABLE_COMPONENTS,
    SomeComponent
]