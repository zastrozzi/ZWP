import { Directive, ElementRef, Inject, Input, OnChanges, OnDestroy, SimpleChanges, inject } from '@angular/core'
import { combineLatest, map, Subject, Subscription } from 'rxjs'
import { ZWPApplicationFacade, ZWPThemingFacade } from '../+state/facades'
import {
    ZWPCommonModuleRootConfig,
    ZWPScreenBreakpointSize,
    ZWP_COMMON_MODULE_ROOT_CONFIG,
    TextStyle,
    TextStyleType,
} from '../model'
// import { ZWP_COMMON_MODULE_ROOT_CONFIG } from '../modules/zwp.common.module'
import { coerceNumber, isUndefined } from '../utils'

@Directive({
    selector: '[zwpTextStyle]',
})
export class TextStyleDirective implements OnChanges, OnDestroy {
    @Input() zwpTextStyle = ''
    @Input() zwpFontFamily: string | undefined = undefined
    @Input() zwpFontSize: number | string | undefined = undefined
    @Input() zwpLineHeight: number | string | undefined = undefined
    @Input() zwpFontWeight: number | string | undefined = undefined

    private subscriptions: Subscription = new Subscription()
    private textStyleType = new Subject<TextStyleType>()
    private applicationFacade = inject(ZWPApplicationFacade)
    textStyles = this.themingFacade.textStyles$
    textScale = this.themingFacade.textScale$
    currentScreenBreakpointSize$ = this.applicationFacade.currentScreenBreakpointSize$

    constructor(
        @Inject(ZWP_COMMON_MODULE_ROOT_CONFIG) private commonModuleRootConfig: ZWPCommonModuleRootConfig,
        private el: ElementRef,
        private themingFacade: ZWPThemingFacade
    ) {
        const textSub = combineLatest([
            this.textStyleType.asObservable(),
            this.textStyles,
            this.textScale,
            this.currentScreenBreakpointSize$,
        ])
            .pipe(
                map(([styleType, styleSet, textScale, breakpointSize]) => ({
                    styles: styleSet[breakpointSize ?? ZWPScreenBreakpointSize.LARGE][styleType],
                    scale: textScale,
                }))
            )
            .subscribe((res) => {
                this.setTextStyleForElement(res.styles, res.scale)
            })

        this.subscriptions.add(textSub)
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            changes['zwpTextStyle'] ||
            changes['zwpFontFamily'] ||
            changes['zwpFontSize'] ||
            changes['zwpLineHeight'] ||
            changes['zwpFontWeight']
        ) {
            const selectedTextStyleType =
                TextStyleType[changes['zwpTextStyle'].currentValue as keyof typeof TextStyleType]
            this.textStyleType.next(selectedTextStyleType)
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    setTextStyleForElement(textStyle: TextStyle, scale: number) {
        const nativeEl: HTMLElement = this.el.nativeElement
        if (textStyle.fontFamily !== undefined && nativeEl.tagName !== 'MAT-ICON') {
            nativeEl.style.fontFamily =
                this.resolveInputFontFamily(textStyle.fontFamily) +
                ', ' +
                this.commonModuleRootConfig.fontFamilyFallback
        }
        if (textStyle.fontSize !== undefined) {
            nativeEl.style.fontSize =
                Math.round(this.resolveInputFontSize(textStyle.fontSize) * scale).toString() + 'px'
        }
        if (textStyle.lineHeight !== undefined) {
            nativeEl.style.lineHeight =
                Math.round(this.resolveInputLineHeight(textStyle.lineHeight) * scale).toString() + 'px'
        }
        if (textStyle.fontWeight !== undefined) {
            nativeEl.style.fontWeight = this.resolveInputFontWeight(textStyle.fontWeight)
        }
    }

    private resolveInputFontWeight(textStyleFontWeight: string): string {
        if (isUndefined(this.zwpFontWeight)) {
            return textStyleFontWeight
        }
        const textStyleFontWeightNumber = parseInt(textStyleFontWeight, 10)
        const zwpFontWeightNumber = coerceNumber(this.zwpFontWeight, textStyleFontWeightNumber)
        if (zwpFontWeightNumber < 100 || zwpFontWeightNumber > 900) {
            return textStyleFontWeight
        }
        return zwpFontWeightNumber.toString()
    }

    private resolveInputFontSize(textStyleFontSize: number): number {
        if (isUndefined(this.zwpFontSize)) {
            return textStyleFontSize
        }
        const zwpFontSizeNumber = coerceNumber(this.zwpFontSize, textStyleFontSize)
        if (zwpFontSizeNumber < 0 || zwpFontSizeNumber > 10000) {
            return textStyleFontSize
        }
        return zwpFontSizeNumber
    }

    private resolveInputLineHeight(textStyleLineHeight: number): number {
        if (isUndefined(this.zwpLineHeight)) {
            return textStyleLineHeight
        }
        const zwpLineHeightNumber = coerceNumber(this.zwpLineHeight, textStyleLineHeight)
        if (zwpLineHeightNumber < 0 || zwpLineHeightNumber > 10000) {
            return textStyleLineHeight
        }
        return zwpLineHeightNumber
    }

    private resolveInputFontFamily(textStyleFontFamily: string): string {
        if (isUndefined(this.zwpFontFamily)) {
            return textStyleFontFamily
        }
        return this.zwpFontFamily
    }
}
