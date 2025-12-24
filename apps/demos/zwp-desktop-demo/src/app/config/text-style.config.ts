import { TextStyleSet } from '@zwp/platform.common'

const fontFamilyFallback = `system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`

const webTextStyles: Partial<TextStyleSet> = {
    largeTitle: {fontFamily: 'Lato', fontSize: 54, lineHeight: 54, fontWeight: '600'},
    title1: {fontFamily: 'Lato', fontSize: 45, lineHeight: 45, fontWeight: '500'},
    title2: {fontFamily: 'Lato', fontSize: 34, lineHeight: 40, fontWeight: '500'},
    title3: {fontFamily: 'Lato', fontSize: 22, lineHeight: 26, fontWeight: '300'},
    headline: {fontFamily: 'Lato', fontSize: 22, lineHeight: 26, fontWeight: '500'},
    subheadline: {fontFamily: 'Lato', fontSize: 18, lineHeight: 22, fontWeight: '500'},
    caption1: {fontFamily: 'Lato', fontSize: 10, lineHeight: 10, fontWeight: '900'},
    caption2: {fontFamily: 'Lato', fontSize: 14, lineHeight: 16, fontWeight: '400'},
    body1: {fontFamily: 'Lato', fontSize: 14, lineHeight: 16, fontWeight: '400'},
    body2: {fontFamily: 'Lato', fontSize: 12, lineHeight: 14, fontWeight: '400'},
    body3: {fontFamily: 'Lato', fontSize: 16, lineHeight: 18, fontWeight: '400'},
    button1: {fontFamily: 'Lato', fontSize: 15, lineHeight: 15, fontWeight: '400'},
    button2: {fontFamily: 'Lato', fontSize: 15, lineHeight: 18, fontWeight: '600'},
    button3: {fontFamily: 'Lato', fontSize: 14, lineHeight: 14, fontWeight: '500'}
}

const tabletTextStyles: Partial<TextStyleSet> = {
    largeTitle: {fontFamily: 'Lato', fontSize: 40, lineHeight: 40, fontWeight: '600'},
    title1: {fontFamily: 'Lato', fontSize: 35, lineHeight: 35, fontWeight: '500'},
    title2: {fontFamily: 'Lato', fontSize: 28, lineHeight: 30, fontWeight: '500'},
    title3: {fontFamily: 'Lato', fontSize: 22, lineHeight: 26, fontWeight: '300'},
    headline: {fontFamily: 'Lato', fontSize: 20, lineHeight: 23, fontWeight: '500'},
    subheadline: {fontFamily: 'Lato', fontSize: 18, lineHeight: 22, fontWeight: '500'},
    caption1: {fontFamily: 'Lato', fontSize: 10, lineHeight: 10, fontWeight: '900'},
    caption2: {fontFamily: 'Lato', fontSize: 14, lineHeight: 16, fontWeight: '400'},
    body1: {fontFamily: 'Lato', fontSize: 14, lineHeight: 16, fontWeight: '400'},
    body2: {fontFamily: 'Lato', fontSize: 12, lineHeight: 14, fontWeight: '400'},
    body3: {fontFamily: 'Lato', fontSize: 16, lineHeight: 18, fontWeight: '400'},
    button1: {fontFamily: 'Lato', fontSize: 14, lineHeight: 14, fontWeight: '400'},
    button2: {fontFamily: 'Lato', fontSize: 14, lineHeight: 18, fontWeight: '600'},
    button3: {fontFamily: 'Lato', fontSize: 12, lineHeight: 12, fontWeight: '500'}
}

const mobileTextStyles: Partial<TextStyleSet> = {
    largeTitle: {fontFamily: 'Lato', fontSize: 30, lineHeight: 33, fontWeight: '600'},
    title1: {fontFamily: 'Lato', fontSize: 30, lineHeight: 30, fontWeight: '500'},
    title2: {fontFamily: 'Lato', fontSize: 24, lineHeight: 26, fontWeight: '500'},
    title3: {fontFamily: 'Lato', fontSize: 18, lineHeight: 18, fontWeight: '300'},
    headline: {fontFamily: 'Lato', fontSize: 18, lineHeight: 22, fontWeight: '500'},
    subheadline: {fontFamily: 'Lato', fontSize: 18, lineHeight: 22, fontWeight: '500'},
    caption1: {fontFamily: 'Lato', fontSize: 10, lineHeight: 10, fontWeight: '900'},
    caption2: {fontFamily: 'Lato', fontSize: 14, lineHeight: 16, fontWeight: '400'},
    body1: {fontFamily: 'Lato', fontSize: 14, lineHeight: 16, fontWeight: '400'},
    body2: {fontFamily: 'Lato', fontSize: 12, lineHeight: 14, fontWeight: '400'},
    body3: {fontFamily: 'Lato', fontSize: 16, lineHeight: 18, fontWeight: '400'},
    button1: {fontFamily: 'Lato', fontSize: 14, lineHeight: 14, fontWeight: '400'},
    button2: {fontFamily: 'Lato', fontSize: 14, lineHeight: 18, fontWeight: '600'},
    button3: {fontFamily: 'Lato', fontSize: 12, lineHeight: 12, fontWeight: '500'}
}

export const TextStyleConfig = {
    web: webTextStyles,
    tablet: tabletTextStyles,
    mobile: mobileTextStyles,
    fontFamilyFallback
}