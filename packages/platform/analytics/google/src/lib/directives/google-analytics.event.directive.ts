import { Directive, ElementRef, Inject, Input, isDevMode, OnDestroy, Optional } from "@angular/core";
import { coerceBoolean, coerceNumber, isUndefined } from "@zwp/platform.common";
import { ZWPGoogleAnalytics4ActionEventName, ZWPGoogleAnalyticsSettings, ZWP_GOOGLE_ANALYTICS_SETTINGS } from "../model";
import { ZWPGoogleAnalyticsService } from "../services";
import { ZWPGoogleAnalyticsEventCategoryDirective } from "./google-analytics.event-category.directive";

@Directive({
    selector: '[zwpGoogleAnalyticsEvent]',
    exportAs: 'zwpGoogleAnalyticsEvent'
})
export class ZWPGoogleAnalyticsEventDirective implements OnDestroy {
    constructor(
        @Optional() private readonly eventCategoryDirective: ZWPGoogleAnalyticsEventCategoryDirective,
        @Inject(ZWP_GOOGLE_ANALYTICS_SETTINGS) private readonly settings: ZWPGoogleAnalyticsSettings,
        private readonly el: ElementRef,
        private zwpGoogleAnalyticsService: ZWPGoogleAnalyticsService
    ) {
        this.zwpGoogleAnalyticsNativeEvent = 'click'
    }

    // private subscription?: Subscription
    private _boundNativeEventName!: string;

    @Input() zwpGoogleAnalyticsEvent: ZWPGoogleAnalytics4ActionEventName | string | undefined
    @Input() zwpGoogleAnalyticsAction: string | undefined
    @Input() zwpGoogleAnalyticsLabel: string | undefined
    @Input() zwpGoogleAnalyticsValue: number | string | undefined
    @Input() zwpGoogleAnalyticsInteraction: boolean | string | undefined

    @Input() set zwpGoogleAnalyticsNativeEvent (zwpGoogleAnalyticsNativeEvent: string) {
        if (this._boundNativeEventName === zwpGoogleAnalyticsNativeEvent) { return }
        // console.log('zwpGoogleAnalyticsNativeEvents', zwpGoogleAnalyticsNativeEvent)
        this.el.nativeElement.removeEventListener(zwpGoogleAnalyticsNativeEvent, () => this.trigger())
        this._boundNativeEventName = zwpGoogleAnalyticsNativeEvent
        this.el.nativeElement.addEventListener(zwpGoogleAnalyticsNativeEvent, () => this.trigger())
        // this.subscription = fromEvent(this.el.nativeElement, zwpGoogleAnalyticsNativeEvent).subscribe(() => {
        //     // console.log('in sub')
        //     this.trigger()
        // })
        
    }
    get zwpGoogleAnalyticsNativeEvent() { return this._boundNativeEventName }

    ngOnDestroy(): void {
        // if (this.subscription) { this.subscription.unsubscribe() }
        this.el.nativeElement.removeEventListener(this.zwpGoogleAnalyticsNativeEvent, () => this.trigger())
        // this.subscription.unsubscribe()
    }

    trigger() {
        try {
            if (isUndefined(this.zwpGoogleAnalyticsAction) && isUndefined(this.zwpGoogleAnalyticsEvent)) { 
                throw new Error('zwpGoogleAnalyticsEvent or zwpGoogleAnalyticsAction must be provided to identify this event.') 
            }
            const actionName = this.zwpGoogleAnalyticsAction || this.zwpGoogleAnalyticsEvent || ''
            const category = this.eventCategoryDirective?.zwpGoogleAnalyticsEventCategory || undefined
            const label = this.zwpGoogleAnalyticsLabel || undefined

            this.zwpGoogleAnalyticsService.event(actionName, category, label, coerceNumber(this.zwpGoogleAnalyticsValue), coerceBoolean(this.zwpGoogleAnalyticsInteraction, true))
        } catch (error) {
            if ((isDevMode() || this.settings.enableTracing) && console) { console.error(error) }
        }
    }
}