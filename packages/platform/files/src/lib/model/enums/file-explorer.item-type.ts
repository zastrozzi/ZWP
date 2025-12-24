import { TransformEnumPipeSignature } from '@zwp/platform.common'

export enum FileExplorerItemType {
    directory = "directory",
    file = "file"
}

export enum FileExplorerItemTypeLabel {
    directory = "Directory",
    file = "File"
}

export const fileExplorerItemTypeLabelPipeSignature: TransformEnumPipeSignature = {
    input: FileExplorerItemType,
    output: FileExplorerItemTypeLabel
}