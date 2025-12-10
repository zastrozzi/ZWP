import { NestedKeyOf, TransformEnumPipeSignature } from '@zwp/platform.common'

export interface ColumnInterface<T extends object, K = keyof T | NestedKeyOf<T>> {
    displayName: string
    dataLabel: K
    sortable: boolean
    copyable?: boolean
    hasCustomTemplate?: boolean
    style?: {
        minWidth?: number
        maxWidth?: number
        width?: number
        textOverflow?: 'ellipsis' | 'clip'
        textWrapMode?: 'nowrap' | 'wrap'
        fontWeight?: number
    }
    datePipe?: { format?: string | undefined, timezone?: string | undefined, locale?: string | undefined },
    transformEnumPipe?: TransformEnumPipeSignature
    multi?: boolean
    currencyPipe?: { prefix: string, thousands: string, decimal: string, unit: 1 | 100 }
}

export type NestedTreeInterface<T> = T & {
    id: string
    children?: NestedTreeInterface<T>[]
}

export interface FlattenedTreeMetadata {
    expandable: boolean
    level: number
}

export type FlattenedTreeInterface<T> = Omit<T, 'children'> & {
    id: string
    treeMetadata: FlattenedTreeMetadata
}

// export type ConstructedTreeInterface<T> = T & {
//     id: string
// }