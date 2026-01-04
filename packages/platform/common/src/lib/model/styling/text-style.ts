import { ZWPScreenBreakpointSize } from '../breakpoints'

export enum TextStyleType {
    body1 = 'body1',
    body2 = 'body2',
    body3 = 'body3',
    callout = 'callout',
    caption1 = 'caption1',
    caption2 = 'caption2',
    footnote = 'footnote',
    headline = 'headline',
    largeTitle = 'largeTitle',
    subheadline = 'subheadline',
    title1 = 'title1',
    title2 = 'title2',
    title3 = 'title3',
    button1 = 'button1',
    button2 = 'button2',
    button3 = 'button3'
}

export interface TextStyle {
    fontSize?: number
    lineHeight?: number
    fontFamily?: string
    fontWeight?: string
}

export type TextStyleSet = {
    [key in TextStyleType]: TextStyle
}

export type PartialTextStyleSet = Partial<TextStyleSet>

export interface PartialTextStyleSetForBreakpoint {
    styleSet: PartialTextStyleSet
    breakpointSize: ZWPScreenBreakpointSize
}

export const emptyTextStyleSet: TextStyleSet = {
    body1: {},
    body2: {},
    body3: {},
    callout: {},
    caption1: {},
    caption2: {},
    footnote: {},
    headline: {},
    largeTitle: {},
    subheadline: {},
    title1: {},
    title2: {},
    title3: {},
    button1: {},
    button2: {},
    button3: {}
}
