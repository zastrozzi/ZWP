import { GeometryEdges } from '@zwp/platform.common'

export interface ResizeCursors {
    topLeft: string
    topRight: string
    bottomLeft: string
    bottomRight: string
    leftOrRight: string
    topOrBottom: string
}

export const defaultResizeCursors: ResizeCursors = {
    topLeft: 'nw-resize',
    topRight: 'ne-resize',
    bottomLeft: 'sw-resize',
    bottomRight: 'se-resize',
    leftOrRight: 'col-resize',
    topOrBottom: 'row-resize'
}

export const getResizeCursor = (edges: GeometryEdges, cursors: ResizeCursors): string => {
    if (edges.left && edges.top) {
        return cursors.topLeft
    } else if (edges.right && edges.top) {
        return cursors.topRight
    } else if (edges.left && edges.bottom) {
        return cursors.bottomLeft
    } else if (edges.right && edges.bottom) {
        return cursors.bottomRight
    } else if (edges.left || edges.right) {
        return cursors.leftOrRight
    } else if (edges.top || edges.bottom) {
        return cursors.topOrBottom
    } else {
        return ''
    }
}
