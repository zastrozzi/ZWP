import { TransformEnumPipeSignature } from '@zwp/platform.common'

export enum FileExplorerViewMode {
    list = "list",
    compact = "compact",
    grid = "grid"
}

export enum FileExplorerViewModeLabel {
    list = "List",
    compact = "Compact List",
    grid = "Grid"
}

export const fileExplorerViewModeLabelPipeSignature: TransformEnumPipeSignature = {
    input: FileExplorerViewMode,
    output: FileExplorerViewModeLabel
}