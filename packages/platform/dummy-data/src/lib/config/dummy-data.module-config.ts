import { InjectionToken } from '@angular/core'

export interface PlatformDummyDataModuleConfig {
    includeProjectsState: boolean
}

export const DUMMY_DATA_MODULE_CONFIG = new InjectionToken<PlatformDummyDataModuleConfig>(
    'platform.dummy-data.module.config'
)