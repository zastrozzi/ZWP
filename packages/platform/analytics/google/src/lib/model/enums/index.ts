import { ZWPAutoGoogleAnalytics4ActionEventName } from './auto.google-analytics.4.action.event-name'
import { ZWPCommonGoogleAnalytics4ActionEventName } from './common.google-analytics.4.action.event-name'
import { ZWPGamesGoogleAnalytics4ActionEventName } from './games.google-analytics.4.action.event-name'
import { ZWPECommerceGoogleAnalytics4ActionEventName } from './ecommerce.google-analytics.4.action.event-name'

export * from './auto.google-analytics.4.action.event-name'
export * from './common.google-analytics.4.action.event-name'
export * from './ecommerce.google-analytics.4.action.event-name'
export * from './games.google-analytics.4.action.event-name'

export type ZWPGoogleAnalytics4ActionEventName = ZWPAutoGoogleAnalytics4ActionEventName | ZWPCommonGoogleAnalytics4ActionEventName | ZWPECommerceGoogleAnalytics4ActionEventName | ZWPGamesGoogleAnalytics4ActionEventName