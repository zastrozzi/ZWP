import { getPlatform, Inject, inject, Injectable, OnDestroy, platformCore, getNgModuleById, INJECTOR, Injector } from "@angular/core";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { COMMON_ENVIRONMENT, CommonEnvironment, Nullable } from "../model";
import { isNull } from '../utils'

@Injectable({ providedIn: 'platform' })
export class ZWPDebuggableServiceLogger {
    services: {[serviceName: string]: number | undefined} = {}
    private _environment: Nullable<CommonEnvironment> = null
    constructor(@Inject(INJECTOR) private injector: Injector) {
        this.logInitService('ZWPDebuggableServiceLogger')
    }

    get environment(): Nullable<CommonEnvironment> {
        return (platformCore() as any)._modules[0]?.injector?.get(COMMON_ENVIRONMENT, null, { optional: true }) ?? null
        // if (isNull(this._environment)) {
            
        // }
        // console.log(this._environment, 'this._environment?')
        // return this._environment
    }

    logInitService(serviceName: string) {
        setTimeout(() => {
            if (!isNull(this.environment) && !this.environment.production) {
                // eslint-disable-next-line no-restricted-syntax
                console.debug('[DI]', `${serviceName} Initialised`)
            }
        
            if (this.services[serviceName] !== undefined) {
                this.services[serviceName] = (this.services[serviceName] ?? 0) + 1
                if ((this.services[serviceName] ?? 0) > 1) {
                    console.error('[DI]', `${serviceName} Duplicate`, `Count: ${(this.services[serviceName] ?? 0)}`)
                }
            } else {
                this.services[serviceName] = 1
            }
        }, 0)
    }

    logDeinitService(serviceName: string) {
        setTimeout(() => {
            if (!isNull(this.environment) && !this.environment.production) {
                // eslint-disable-next-line no-restricted-syntax
                console.debug('[DI]', `${serviceName} Destroyed`)
            }
            
            if (this.services[serviceName] !== undefined) {
                if ((this.services[serviceName] ?? 0) < 1) {
                    console.error('[DI]', `${serviceName} Zero or Negative`, `Count: ${(this.services[serviceName] ?? 0)}`)
                }
                this.services[serviceName] = (this.services[serviceName] ?? 0) - 1
            } else {
                this.services[serviceName] = 0
            }
        }, 0)
    }

    logServiceMethod(serviceName: string, methodName: string, params: any) {
        setTimeout(() => {
            if (!isNull(this.environment) && !this.environment.production) {
                // eslint-disable-next-line no-restricted-syntax
                console.debug('[DI]', '[MethodDebugger]', `${serviceName}.${methodName}()`, params)
            }
        }, 0)
        
    }
}
