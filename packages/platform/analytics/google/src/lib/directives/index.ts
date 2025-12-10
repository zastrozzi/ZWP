import { ZWPGoogleAnalyticsEventCategoryDirective } from './google-analytics.event-category.directive'
import { ZWPGoogleAnalyticsEventDirective } from './google-analytics.event.directive'

export * from './google-analytics.event-category.directive'
export * from './google-analytics.event.directive'

export const GOOGLE_ANALYTICS_EXPORTABLE_DIRECTIVES = [
    ZWPGoogleAnalyticsEventDirective,
    ZWPGoogleAnalyticsEventCategoryDirective
]