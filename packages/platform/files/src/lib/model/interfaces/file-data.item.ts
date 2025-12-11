import { Nullable } from '@zwp/platform.common'

export interface FileDataItem {
    id: string
    name: string
    ext?: string

    isDir: boolean
    isHidden?: boolean
    isSymlink?: boolean
    isEncrypted?: boolean

    openable?: boolean
    selectable?: boolean
    draggable?: boolean
    droppable?: boolean
    dndOpenable?: boolean

    size?: number
    modDate?: Date | string

    color?: string
    icon?: string
    thumbnailUrl?: string
    folderChainIcon?: Nullable<string>
    
    parentFileDataItemId?: string
    childFileDataItems?: Array<FileDataItem>
    childFileDataItemsCount?: number
}
