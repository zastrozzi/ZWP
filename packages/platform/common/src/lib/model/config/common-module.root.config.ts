import { InjectionToken, Type } from "@angular/core"
import { ZWPLoggingService, ZWPStorageService } from '../../services'
import { CommonEnvironment } from "../environments"

export interface ZWPCommonModuleRootConfig {
    fontFamilyFallback: string
    environment: CommonEnvironment
    enableRootServices: boolean
    storageService: typeof ZWPStorageService
    loggingService: typeof ZWPLoggingService
}

export const ZWP_COMMON_MODULE_ROOT_CONFIG = new InjectionToken<ZWPCommonModuleRootConfig>('zwp.common-module.root-config')