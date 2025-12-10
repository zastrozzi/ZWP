import { inject, Injectable, InjectionToken } from '@angular/core'
import { ZWPDebuggableInjectable } from '../decorators'
import { Nullable } from '../model'
import { isNil, isNull, isObjectWithProperty } from '../utils'
import { ZWPLoggingService, ZWP_LOGGING_SERVICE } from './zwp.logging.service'

@Injectable({ providedIn: 'root' })
export abstract class ZWPStorageService {
    
    abstract read<V>(featureKey: Nullable<string>, key: Nullable<string>): Nullable<V>
    abstract write(featureKey: Nullable<string>, key: Nullable<string>, value: any): boolean
    abstract remove(featureKey: Nullable<string>, key: Nullable<string>): boolean
    abstract clear(featureKey: Nullable<string>): boolean
    
}

export const ZWP_STORAGE_SERVICE = new InjectionToken<ZWPStorageService>('zwp.common.storage-service')

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'ZWPLocalStorageService', options: { skipMethodDebugger: true } })
export class ZWPLocalStorageService implements ZWPStorageService {
    private readonly loggingService: ZWPLoggingService = inject(ZWP_LOGGING_SERVICE)
    
    constructor() {
        // super('ZWPLocalStorageService', { skipMethodDebugger: true })
    }

    read<V>(featureKey: Nullable<string> = null, key: Nullable<string> = null): Nullable<V> {
        if (!this._hasStorage()) { return this._logAndNull('No storage available') }
        if (isNull(featureKey)) {
            if (isNull(key)) { return this._getAll() }
            const raw = localStorage.getItem(key)
            if (isNull(raw)) { return this._logAndNull(`No value found for key '${key}'`) }
            return JSON.parse(raw)
        } else {
            const raw = localStorage.getItem(featureKey)
            if (isNull(raw)) { return this._logAndNull(`No value found for key '${key}' because feature '${featureKey}' does not exist`) }
            const feature = JSON.parse(raw)
            if (isNull(key)) { return feature }
            if (!isObjectWithProperty(feature, key)) { return this._logAndNull(`No value found for key '${key}' because feature '${featureKey}' does not have a property '${key}'`) }
            return feature[key]
        }
    }

    write(featureKey: Nullable<string> = null, key: Nullable<string>, value: any): boolean {
        if (!this._hasStorage()) { return this._logAndFail('No storage available') }
        // if (isNil(value)) { return this._logAndFail(`Cannot write null or undefined value to storage ${key}`) }
        if (isNull(featureKey)) {
            const stringified = JSON.stringify(value)
            if (isNull(key)) { return this._logAndFail(`Cannot write value '${value}' to non-feature storage because no key was provided`) }
            localStorage.setItem(key, stringified)
            return true
        }
        if (isNull(key)) {
            const stringified = JSON.stringify(value)
            localStorage.setItem(featureKey, stringified)
            return true
        }
        const rawFeature = localStorage.getItem(featureKey)
        const feature = isNull(rawFeature) ? {} : JSON.parse(rawFeature)
        feature[key] = value
        const stringified = JSON.stringify(feature)
        localStorage.setItem(featureKey, stringified)
        return true
    }

    remove(featureKey: Nullable<string> = null, key: Nullable<string> = null): boolean {
        if (!this._hasStorage()) { return this._logAndFail('No storage available') }
        if (isNull(featureKey) && isNull(key)) { return this._logAndFail(`Cannot remove value from non-feature storage because no key was provided`) }
        if (isNull(featureKey) && !isNull(key)) { localStorage.removeItem(key); return true }
        if (!isNull(featureKey) && isNull(key)) { localStorage.removeItem(featureKey); return true }
        if (isNull(featureKey) || isNull(key)) { return this._logAndFail('Internal Error') }
        const rawFeature = localStorage.getItem(featureKey)
        if (isNull(rawFeature)) { return this._logAndFail(`Cannot remove value from feature '${featureKey}' because it does not exist`) }
        const feature = JSON.parse(rawFeature)
        if (!isObjectWithProperty(feature, key)) { this._logAndFail(`Cannot remove value from feature '${featureKey}' because it does not have a property '${key}'`) }
        delete feature[key]
        const stringified = JSON.stringify(feature)
        localStorage.setItem(featureKey, stringified)
        return true
    }

    clear(featureKey: Nullable<string> = null): boolean {
        if (!this._hasStorage()) { return this._logAndFail('No storage available') }
        isNull(featureKey) ? localStorage.clear() : localStorage.removeItem(featureKey)
        return true
    }

    private _hasStorage(): boolean { return typeof Storage !== 'undefined' }

    private _logAndFail(message: string): boolean {
        this.loggingService.debug(`[ZWPLocalStorage] ${message}`)
        return false
    }

    private _logAndNull(message: string): Nullable<any> {
        this.loggingService.debug(`[ZWPLocalStorage] ${message}`)
        return null
    }

    private _getAll<V>(): V {
        const all: any = {}
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (isNull(key)) { continue }
            const value = localStorage.getItem(key)
            if (isNull(value)) { continue }
            all[key] = JSON.parse(value)
        }
        return all as V
    }
}

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'ZWPSessionStorageService', options: { skipMethodDebugger: true } })
export class ZWPSessionStorageService implements ZWPStorageService {
    constructor(readonly loggingService: ZWPLoggingService) {
        // super('ZWPSessionStorageService', { skipMethodDebugger: true })
    }

    read<V>(featureKey: Nullable<string> = null, key: Nullable<string> = null): Nullable<V> {
        if (!this._hasStorage()) { return this._logAndNull('No storage available') }
        if (isNull(featureKey)) {
            if (isNull(key)) { return this._getAll() }
            const raw = sessionStorage.getItem(key)
            if (isNull(raw)) { return this._logAndNull(`No value found for key '${key}'`) }
            return JSON.parse(raw)
        } else {
            const raw = sessionStorage.getItem(featureKey)
            if (isNull(raw)) { return this._logAndNull(`No value found for key '${key}' because feature '${featureKey}' does not exist`) }
            const feature = JSON.parse(raw)
            if (isNull(key)) { return feature }
            if (!isObjectWithProperty(feature, key)) { return this._logAndNull(`No value found for key '${key}' because feature '${featureKey}' does not have a property '${key}'`) }
            return feature[key]
        }
    }

    write(featureKey: Nullable<string> = null, key: Nullable<string>, value: any): boolean {
        if (!this._hasStorage()) { return this._logAndFail('No storage available') }
        if (isNil(value)) { return this._logAndFail(`Cannot write null or undefined value to storage`) }
        if (isNull(featureKey)) {
            const stringified = JSON.stringify(value)
            if (isNull(key)) { return this._logAndFail(`Cannot write value '${value}' to non-feature storage because no key was provided`) }
            sessionStorage.setItem(key, stringified)
            return true
        }
        if (isNull(key)) {
            const stringified = JSON.stringify(value)
            sessionStorage.setItem(featureKey, stringified)
            return true
        }
        const rawFeature = sessionStorage.getItem(featureKey)
        const feature = isNull(rawFeature) ? {} : JSON.parse(rawFeature)
        feature[key] = value
        const stringified = JSON.stringify(feature)
        sessionStorage.setItem(featureKey, stringified)
        return true
    }

    remove(featureKey: Nullable<string> = null, key: Nullable<string> = null): boolean {
        if (!this._hasStorage()) { return this._logAndFail('No storage available') }
        if (isNull(featureKey) && isNull(key)) { return this._logAndFail(`Cannot remove value from non-feature storage because no key was provided`) }
        if (isNull(featureKey) && !isNull(key)) { sessionStorage.removeItem(key); return true }
        if (!isNull(featureKey) && isNull(key)) { sessionStorage.removeItem(featureKey); return true }
        if (isNull(featureKey) || isNull(key)) { return this._logAndFail('Internal Error') }
        const rawFeature = sessionStorage.getItem(featureKey)
        if (isNull(rawFeature)) { return this._logAndFail(`Cannot remove value from feature '${featureKey}' because it does not exist`) }
        const feature = JSON.parse(rawFeature)
        if (!isObjectWithProperty(feature, key)) { return this._logAndFail(`Cannot remove value from feature '${featureKey}' because it does not have a property '${key}'`) }
        delete feature[key]
        const stringified = JSON.stringify(feature)
        sessionStorage.setItem(featureKey, stringified)
        return true
    }

    clear(featureKey: Nullable<string> = null): boolean {
        if (!this._hasStorage()) { return this._logAndFail('No storage available') }
        isNull(featureKey) ? sessionStorage.clear() : sessionStorage.removeItem(featureKey)
        return true
    }

    private _logAndFail(message: string): boolean {
        this.loggingService.debug(`[ZWPLocalStorage] ${message}`)
        return false
    }

    private _logAndNull(message: string): Nullable<any> {
        this.loggingService.debug(`[ZWPLocalStorage] ${message}`)
        return null
    }

    private _getAll<V>(): V {
        const all: any = {}
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i)
            if (isNull(key)) { continue }
            const value = sessionStorage.getItem(key)
            if (isNull(value)) { continue }
            all[key] = JSON.parse(value)
        }
        return all as V
    }

    private _hasStorage(): boolean { return typeof Storage !== 'undefined' }
}