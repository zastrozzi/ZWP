import { getPlatform } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { ZWPDebuggableServiceLogger } from '../services/zwp.debuggable.service'
import { isNull } from '../utils'

export const ZWPDebuggableInjectable = (params: { serviceName: string, options?: { skipMethodDebugger?: boolean, excludedMethods?: string[], includedMethods?: string[] }}): any => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (injectable: Function) => {
        const serviceLogger = (getPlatform() ?? platformBrowserDynamic()).injector.get(ZWPDebuggableServiceLogger, null, { optional: true })
        
        if (isNull(serviceLogger)) { return }
        // console.log(serviceLogger, 'serviceLogger')

        // const originalInjectable = injectable as { new (...args: any[]): any }
        // function newInjectable(...args: any[]) {
        //     console.log('newInjectable', args)
        //     if (!isNull(serviceLogger)) { 
        //         serviceLogger.logInitService(params.serviceName)
        //     } else {
        //         console.log('serviceLogger is null')
        //     }
        //     const inst = new originalInjectable(...args)
        //     return inst
        // }

        serviceLogger.logInitService(params.serviceName)
        
        const shouldSkipMethodDebugger = params.options !== undefined && params.options.skipMethodDebugger === true
        const props = Object.getOwnPropertyNames(injectable.prototype)
        if (props.includes('ngOnDestroy')) {
            const originalFn = injectable.prototype.ngOnDestroy
            injectable.prototype.ngOnDestroy = function() {
                serviceLogger.logDeinitService(params.serviceName)
                // eslint-disable-next-line prefer-rest-params
                return originalFn.apply(this, arguments)
            }
        } else {
            injectable.prototype.ngOnDestroy = function() {
                serviceLogger.logDeinitService(params.serviceName)
            }
        }

        // if (props.includes('ngOnInit')) {
        //     const originalFn = injectable.prototype.ngOnInit
        //     injectable.prototype.ngOnInit = function() {
        //         serviceLogger.logInitService(params.serviceName)
        //         // eslint-disable-next-line prefer-rest-params
        //         return originalFn.apply(this, arguments)
        //     }
        // } else {
        //     injectable.prototype.ngOnInit = function() {
        //         serviceLogger.logInitService(params.serviceName)
        //     }
        // }
        
        if (shouldSkipMethodDebugger) { return }
        const excludedMethods = params.options?.excludedMethods
        const includedMethods = params.options?.includedMethods
        
        for (const propName of props) {
            if (
                (propName !== 'ngOnDestroy' && propName !== 'attachMethodDebugger') &&
                (excludedMethods === undefined || !excludedMethods?.includes(propName)) &&
                (includedMethods === undefined || includedMethods?.includes(propName))
            ) {
                
                // eslint-disable-next-line @typescript-eslint/ban-types
                const originalFn: Function = injectable.prototype[propName]
                if (originalFn instanceof Function) {
                    injectable.prototype[propName] = function() {
                        // console.log('this', this)        
                        // eslint-disable-next-line prefer-rest-params
                        serviceLogger.logServiceMethod(params.serviceName, propName, arguments[0])
                        // eslint-disable-next-line prefer-rest-params
                        return originalFn.apply(this, arguments)
                    }
                }
            }
        }

        
    }
}
