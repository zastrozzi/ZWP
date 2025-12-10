import { Directive, Input } from "@angular/core";

@Directive({
    selector: '[zwpGoogleAnalyticsEvent][zwpGoogleAnalyticsEventCategory]',
    exportAs: 'zwpGoogleAnalyticsEventCategory'
})
export class ZWPGoogleAnalyticsEventCategoryDirective {
    @Input() zwpGoogleAnalyticsEventCategory!: string
}