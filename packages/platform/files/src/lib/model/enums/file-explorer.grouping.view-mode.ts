import { TransformEnumPipeSignature } from '@zwp/platform.common'

export enum FileExplorerGroupingViewMode {
    combined = "combined",
    itemType = "itemType",
    fileType = "fileType"
}

export enum FileExplorerGroupingViewModeLabel {
    combined = "Combined",
    itemType = "Files & Folders",
    fileType = "File Type"
}

export const fileExplorerGroupingViewModeLabelPipeSignature: TransformEnumPipeSignature = {
    input: FileExplorerGroupingViewMode,
    output: FileExplorerGroupingViewModeLabel
}