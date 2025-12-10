import { ZWPGoogleAnalyticsCommand } from "./google-analytics.command"

export interface ZWPGoogleAnalyticsSettings {
    trackingCode: string
    initCommands?: ZWPGoogleAnalyticsCommand[]
    initDelay?: number
    uri?: string
    enableTracing?: boolean
    nonce?: string
}