// export const createSelectionBox = (element: )

import { GeometryPoint, GeometrySize, SelectionBox, SELECTION_MIN_SIZE } from "../model";

export const getScrollPoint = (): GeometryPoint => {
    if (!document || !document.documentElement) { return { x: 0, y: 0 } }
    return {
        x: document.documentElement.scrollLeft || document.body.scrollLeft,
        y: document.documentElement.scrollTop || document.body.scrollTop
    }
}

export const selectionBoxHasMinimumSize = (selectionBox: SelectionBox<number>, size: GeometrySize = SELECTION_MIN_SIZE, xor: boolean = true): boolean => {
    return xor ? (selectionBox.height > size.height || selectionBox.width > size.width) : selectionBox.height > size.height && selectionBox.width > size.width
}

export const clearWindowSelection = (window: Window) => {
    const selection = window.getSelection() 
    if (!selection) { return }
  
    if (selection.removeAllRanges) {
        selection.removeAllRanges()
    } else if (selection.empty) {
        selection.empty()
    }
}

// export const getRelativePointerEventCoordinate = (pointerEventCoordinate: PointerEventCoordinate, container: SelectionContainerHost): PointerEventCoordinate => {
//     const scrollPoint = getScrollPoint()
//     const borderSize = (container.boundingClientRect.width? - container.clientWidth)
// }