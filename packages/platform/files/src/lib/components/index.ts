import * as FILE_CONTROLS_COMPONENTS from './controls'
import * as FILE_WINDOW_COMPONENTS from './windows'
import * as FILE_EXPLORER_COMPONENTS from './explorer'

export * from './controls'
export * from './explorer'
export * from './windows'

export const INTERNAL_COMPONENTS = {
    FILE_CONTROLS_COMPONENTS,
    FILE_WINDOW_COMPONENTS,
    FILE_EXPLORER_COMPONENTS,

    ALL: [
        FILE_CONTROLS_COMPONENTS.FileExplorerGroupingViewModeControlsComponent,
        FILE_CONTROLS_COMPONENTS.FileExplorerItemContextMenuComponent,
        FILE_CONTROLS_COMPONENTS.FileExplorerNavigationControlsComponent,
        FILE_CONTROLS_COMPONENTS.FileExplorerViewModeControlsComponent,

        FILE_WINDOW_COMPONENTS.FileExplorerNewFileWindowComponent,
        FILE_WINDOW_COMPONENTS.FileExplorerNewFolderWindowComponent,

        FILE_EXPLORER_COMPONENTS.FileExplorerCompactListComponent,
        
        FILE_EXPLORER_COMPONENTS.FileExplorerDragPreviewComponent,
        FILE_EXPLORER_COMPONENTS.FileExplorerGridComponent,
        FILE_EXPLORER_COMPONENTS.FileExplorerGridItemComponent,
        FILE_EXPLORER_COMPONENTS.FileExplorerListComponent
    ]
}

export const EXPORTABLE_COMPONENTS = {
    ALL: [
        FILE_EXPLORER_COMPONENTS.FileExplorerComponent
    ]
}