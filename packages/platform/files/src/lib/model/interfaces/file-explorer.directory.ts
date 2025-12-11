import { FileExplorerItemType } from '../enums'
import { FileExplorerItem } from './file-explorer.item'

export interface FileExplorerDirectory extends FileExplorerItem<FileExplorerItemType.directory> {
    another?: string
}