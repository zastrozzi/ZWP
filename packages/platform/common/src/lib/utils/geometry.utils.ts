import { GeometryEdges, GeometryPoint, GeometryRect, ZWPCSSProperty } from "../model";
import { coerceNumber } from "./primitive-type.utils";

// export const calculateElementRect = (element: HTMLElement): GeometryRect => {
//     let domRect: DOMRect = element.getBoundingClientRect()
//     return {
//         top: domRect.top,
//         bottom: domRect.bottom,
//         left: domRect.left,
//         right: domRect.right,
//         height: domRect.height,
//         width: domRect.width
//     }
// }

export const calculateGeometryRectDiffForEdges = ({ edges, initialRect, newRect }: { edges: GeometryEdges, initialRect: GeometryRect, newRect: GeometryRect}): GeometryEdges => {
    return Object.keys(edges).reduce((acc, key) => {
        acc[key as keyof GeometryEdges] = (newRect[key as keyof GeometryRect] || 0) - (initialRect[key as keyof GeometryRect] || 0)
        return acc
    }, {} as GeometryEdges)
}

export const transformGeometryRectForEdges = (
    initialRect: GeometryRect,
    transform: GeometryPoint = {x: 0, y: 0},
    edges: GeometryEdges = {}
): GeometryRect => {
    return { 
        top: initialRect.top + (edges.top ? transform.y : 0), 
        bottom: initialRect.bottom + (edges.bottom ? transform.y : 0), 
        left: initialRect.left + (edges.left ? transform.x : 0), 
        right: initialRect.right + (edges.right ? transform.x : 0), 
        height: (initialRect.bottom + (edges.bottom ? transform.y : 0)) - (initialRect.top + (edges.top ? transform.y : 0)), 
        width: (initialRect.right + (edges.right ? transform.x : 0)) - (initialRect.left + (edges.left ? transform.x : 0)) 
    }
}

export const calculateAbsoluteElementRect = (
    element: HTMLElement,
    withTranslation: boolean = true
): GeometryRect => {
    let translateX = 0
    let translateY = 0

    if (withTranslation === true) {
        const style = element.style
        const transformProperties = ['transform', '-ms-transform', '-moz-transform', '-o-transform']
        const transform = transformProperties.map((property) => style.getPropertyValue(property)).find((value) => !!value)
    
        if (transform && transform.includes('translate')) {
            translateX = parseFloat(transform.replace(/.*translate3?d?\((-?[0-9]*)px, (-?[0-9]*)px.*/, '$1'))
            translateY = parseFloat(transform.replace(/.*translate3?d?\((-?[0-9]*)px, (-?[0-9]*)px.*/, '$2'))
        }
    }
    
    return {
        height: element.offsetHeight,
        width: element.offsetWidth,
        top: element.offsetTop - translateY,
        bottom: element.offsetHeight + element.offsetTop - translateY,
        left: element.offsetLeft - translateX,
        right: element.offsetWidth + element.offsetLeft - translateX
    }
}

export const calculateFixedElementRect = (
    element: HTMLElement,
    withTranslation: boolean = true
): GeometryRect => {
    let translateX = 0
    let translateY = 0
    const boundingRect: GeometryRect = element.getBoundingClientRect()

    if (withTranslation === true) {
        const style = element.style
        const transformProperties = ['transform', '-ms-transform', '-moz-transform', '-o-transform']
        const transform = transformProperties.map((property) => style.getPropertyValue(property)).find((value) => !!value)
    
        if (transform && transform.includes('translate')) {
            translateX = parseFloat(transform.replace(/.*translate3?d?\((-?[0-9]*)px, (-?[0-9]*)px.*/, '$1'))
            translateY = parseFloat(transform.replace(/.*translate3?d?\((-?[0-9]*)px, (-?[0-9]*)px.*/, '$2'))
        }
    }
    
    return {
        height: boundingRect.height,
        width: boundingRect.width,
        top: boundingRect.top - translateY,
        bottom: boundingRect.bottom - translateY,
        left: boundingRect.left - translateX,
        right: boundingRect.right - translateX
    }
}

export const calculateElementScrollPosition = (
    element: HTMLElement
): GeometryPoint => {
    return { x: element.scrollLeft, y: element.scrollTop }
}

export const rectContainsPoint = (rect: GeometryRect, point: GeometryPoint): boolean => {
    return (
        rect.left <= point.x && 
        rect.right >= point.x && 
        rect.top <= point.y && 
        rect.bottom >= point.y
    )
}

export const rectIntersectsRect = (rect1: GeometryRect, rect2: GeometryRect): boolean => {
    return (
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
    )
}

export const rectContainsRect = (rect1: GeometryRect, rect2: GeometryRect): boolean => {
    return (
        rect1.left <= rect2.left &&
        rect1.right >= rect2.right &&
        rect1.top <= rect2.top &&
        rect1.bottom >= rect2.bottom
    )
}

export const parseGeometryEdgesString = (geometryString: string): GeometryEdges => {
    const geometryParts = geometryString.split(' ').map(x => parseInt(x))
    if (geometryParts.length === 1) { return {top: geometryParts[0], right: geometryParts[0], bottom: geometryParts[0], left: geometryParts[0]}}
    if (geometryParts.length === 2) { return {top: geometryParts[0], right: geometryParts[1], bottom: geometryParts[0], left: geometryParts[1]}}
    if (geometryParts.length === 3) { return {top: geometryParts[0], right: geometryParts[1], bottom: geometryParts[2], left: geometryParts[1]}}
    if (geometryParts.length === 4) { return {top: geometryParts[0], right: geometryParts[1], bottom: geometryParts[2], left: geometryParts[3]}}
    return {top: 0, right: 0, bottom: 0, left: 0}
}

export const createGeometryPropertySet = (propertyName: string, propertyUnit: string, geometrySet: GeometryEdges): ZWPCSSProperty[] => {
    return [
        { property: `${propertyName}-top`, value: (coerceNumber(geometrySet.top)).toString() + propertyUnit },
        { property: `${propertyName}-right`, value: (coerceNumber(geometrySet.right)).toString() + propertyUnit },
        { property: `${propertyName}-bottom`, value: (coerceNumber(geometrySet.bottom)).toString() + propertyUnit },
        { property: `${propertyName}-left`, value: (coerceNumber(geometrySet.left)).toString() + propertyUnit }
    ]
}