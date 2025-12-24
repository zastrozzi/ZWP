import { FileExplorerItemType } from '../enums'

export interface FileExplorerItem<T = FileExplorerItemType> {
    id?: string
    name?: string
    type: T
    createdAt?: Date
    updatedAt?: Date
    parentId?: string
}