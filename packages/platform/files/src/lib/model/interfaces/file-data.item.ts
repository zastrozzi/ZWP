import { Nullable, ZWPEnumDictionary, ZWPEnumDictionaryPartial } from '@zwp/platform.common'
import { FileExplorerFileType } from '../enums'

export interface FileDataItem {
    id: string
    name: string
    fileType?: FileExplorerFileType

    isDir: boolean
    isHidden?: boolean
    isSymlink?: boolean
    isEncrypted?: boolean

    size?: number
    createdAt: Date
    updatedAt: Date

    color?: string
    icon?: string
    thumbnailUrl?: string
    folderChainIcon?: Nullable<string>
    
    parentFileDataItemId?: string
    childFileDataItems?: Array<FileDataItem>
    childFileDataItemsCount?: number
}