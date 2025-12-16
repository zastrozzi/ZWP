import { Nullable, ZWPEnumDictionary, ZWPEnumDictionaryPartial } from '@zwp/platform.common'
import { FileExplorerFileType } from '../enums'

export interface FileDataItem {
    id: string
    name: string
    ext?: string
    fileType?: FileExplorerFileType

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