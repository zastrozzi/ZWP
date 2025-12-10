import { InjectionToken } from '@angular/core'

export interface TemplateAPIConfig {
    baseUrl: string
    apiState: 'live' | 'mock'
}

export const TEMPLATE_API_CONFIG = new InjectionToken<TemplateAPIConfig>('template.api.config')