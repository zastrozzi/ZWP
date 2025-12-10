import { ISO4217CurrencyCode, ZWPISO3166Alpha2 } from '@zwp/platform.common'
import { Common } from '../../common'
import { NotificationSettings } from './notification.settings'

export interface UserProfile {
    currency: ISO4217CurrencyCode
    locale: Common.TinkLocale
    market: ZWPISO3166Alpha2
    notificationSettings: NotificationSettings
    periodAdjustedDay: number
    periodMode: Common.PeriodMode
    timeZone: string
}