import { InjectionToken } from '@angular/core'
import { ZWPColorThemePipe } from './color-theme.pipe'
import { ZWPTransformEnumPipe } from './transform-enum.pipe'
import { ZWPTransformEnumArrayPipe } from './transform-enum.array.pipe'

export * from './transform-enum.pipe'
export * from './transform-enum.array.pipe'
export * from './color-theme.pipe'

export const COMMON_EXPORTABLE_PIPES = [ZWPTransformEnumPipe, ZWPTransformEnumArrayPipe, ZWPColorThemePipe]

export const TRANSFORM_ENUM_PIPE = new InjectionToken<ZWPTransformEnumPipe>('zwp.common.transform-enum-pipe', {
    providedIn: 'platform',
    factory: () => {
        return new ZWPTransformEnumPipe()
    },
})

export const TRANSFORM_ENUM_ARRAY_PIPE = new InjectionToken<ZWPTransformEnumArrayPipe>('zwp.common.transform-enum-array-pipe', {
    providedIn: 'platform',
    factory: () => {
        return new ZWPTransformEnumArrayPipe()
    },
})
// export const COLOR_THEME_PIPE = new InjectionToken<ZWPColorThemePipe>('zwp.common.color-theme-pipe', { providedIn: 'platform', factory: () => { return new ZWPColorThemePipe() }})
