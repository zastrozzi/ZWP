import { InjectionToken } from '@angular/core'

export interface ZWPFilesModuleRootConfig {
    persist: boolean
}

export const ZWP_FILES_MODULE_ROOT_CONFIG = new InjectionToken<ZWPFilesModuleRootConfig>('zwp.files-module.root-config')