import { InjectionToken } from "@angular/core";

export interface CommonEnvironment {
    production: boolean
}

export const COMMON_ENVIRONMENT = new InjectionToken<CommonEnvironment>('zwp-common-environment')