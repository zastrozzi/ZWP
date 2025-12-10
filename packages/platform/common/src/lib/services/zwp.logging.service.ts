
import { Injectable, InjectionToken } from '@angular/core'
import { getLogLevelColor, getLogLevelPriority, LogLevel } from '../model'
import { ZWPDebuggableInjectable } from '../decorators/zwp.debuggable.decorator'

@Injectable({ providedIn: 'root' })
export abstract class ZWPLoggingService {
    abstract log(level: LogLevel, message: string, ...args: any[]): void
    abstract debug(message: string, ...args: any[]): void
    abstract info(message: string, ...args: any[]): void
    abstract notice(message: string, ...args: any[]): void
    abstract warn(message: string, ...args: any[]): void
    abstract error(message: string, ...args: any[]): void
    abstract setLogLevel(level: LogLevel): void
}

export const ZWP_LOGGING_SERVICE = new InjectionToken<ZWPLoggingService>('zwp.common.logging-service')

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({serviceName: 'ZWPConsoleLoggingService', options: { skipMethodDebugger: true }})
export class ZWPConsoleLoggingService implements ZWPLoggingService {
    constructor() {
        // super('ZWPConsoleLoggingService', { skipMethodDebugger: true })
    }

    private _currentLogLevel: LogLevel = LogLevel.DEBUG

    log(level: LogLevel, message: string, ...args: any[]): void {
        switch (level) {
            case LogLevel.DEBUG: return this.logDebug(message, ...args)
            case LogLevel.INFO: return this.logInfo(message, ...args)
            case LogLevel.NOTICE: return this.logNotice(message, ...args)
            case LogLevel.WARN: return this.logWarn(message, ...args)
            case LogLevel.ERROR: return this.logError(message, ...args)
            default: return
        }
    }

    debug(message: string, ...args: any[]): void { return this.logDebug(message, ...args) }
    info(message: string, ...args: any[]): void { return this.logInfo(message, ...args) }
    notice(message: string, ...args: any[]): void { return this.logNotice(message, ...args) }
    warn(message: string, ...args: any[]): void { return this.logWarn(message, ...args) }
    error(message: string, ...args: any[]): void { return this.logError(message, ...args) }

    setLogLevel(level: LogLevel): void {
        this._currentLogLevel = level
    }

    private logDebug(message: string, ...args: any[]): void {
        if (!this.meetsLogLevel(LogLevel.DEBUG)) { return }
        // eslint-disable-next-line no-restricted-syntax
        if (console && console.debug) { console.debug(`%c[${LogLevel.DEBUG}] ${message}`, `color: ${getLogLevelColor(LogLevel.DEBUG)}`, ...args) }
    }

    private logInfo(message: string, ...args: any[]): void {
        if (!this.meetsLogLevel(LogLevel.INFO)) { return }
        // eslint-disable-next-line no-restricted-syntax
        if (console && console.info) { console.info(`%c[${LogLevel.INFO}] ${message}`, `color: ${getLogLevelColor(LogLevel.INFO)}`, ...args) }
    }

    private logNotice(message: string, ...args: any[]): void {
        if (!this.meetsLogLevel(LogLevel.NOTICE)) { return }
        // eslint-disable-next-line no-restricted-syntax
        if (console && console.log) { console.log(`%c[${LogLevel.NOTICE}] ${message}`, `color: ${getLogLevelColor(LogLevel.NOTICE)}`, ...args) }
    }

    private logWarn(message: string, ...args: any[]): void {
        if (!this.meetsLogLevel(LogLevel.WARN)) { return }
        if (console && console.warn) { console.warn(`%c[${LogLevel.WARN}] ${message}`, `color: ${getLogLevelColor(LogLevel.WARN)}`, ...args) }
    }

    private logError(message: string, ...args: any[]): void {
        if (!this.meetsLogLevel(LogLevel.ERROR)) { return }
        if (console && console.error) { console.error(`%c[${LogLevel.ERROR}] ${message}`, `color: ${getLogLevelColor(LogLevel.ERROR)}`, ...args) }
    }

    private meetsLogLevel(level: LogLevel): boolean {
        const currentLogLevelPriority = getLogLevelPriority(this._currentLogLevel)
        const requestedLogLevelPriority = getLogLevelPriority(level)
        return requestedLogLevelPriority <= currentLogLevelPriority
    }
}