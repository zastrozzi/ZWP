import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform, EventEmitter, ɵisPromise, ɵisSubscribable, Injectable, inject } from '@angular/core'
import { map, Observable, Subscribable, Unsubscribable } from 'rxjs'
import { ZWPThemingFacade } from '../+state/facades'
import { isUndefined, MakeHexWithLightness, MakeHexWithOpacity, isNull, MakeHexWithHSLSaturation } from '../utils'

interface SubscriptionStrategy {
    createSubscription(async: Subscribable<any> | Promise<any>, updateLatestValue: any): Unsubscribable | Promise<any>
    dispose(subscription: Unsubscribable | Promise<any>): void
}

class SubscribableStrategy implements SubscriptionStrategy {
    createSubscription(async: Subscribable<any>, updateLatestValue: any): Unsubscribable {
        return async.subscribe({
            next: updateLatestValue,
            error: (e: any) => {
                throw e
            }
        })
    }

    dispose(subscription: Unsubscribable): void {
        subscription.unsubscribe()
    }
}

class PromiseStrategy implements SubscriptionStrategy {
    createSubscription(async: Promise<any>, updateLatestValue: (v: any) => any): Promise<any> {
        return async.then(updateLatestValue, (e) => {
            throw e
        })
    }

    dispose(): void {
        return
    }
}

const _promiseStrategy = new PromiseStrategy()
const _subscribableStrategy = new SubscribableStrategy()

@Injectable({ providedIn: 'root' })
@Pipe({ name: 'zwpColorTheme', pure: false })
export class ZWPColorThemePipe implements OnDestroy, PipeTransform {
    private themingFacade = inject(ZWPThemingFacade)
    private _ref: any = null
    private _latestValue: any = null
    private _subscription: Unsubscribable | Promise<any> | null = null
    private _obj: Subscribable<any> | Promise<any> | EventEmitter<any> | null = null
    private _strategy: SubscriptionStrategy | null = null

    constructor(ref: ChangeDetectorRef) {
        this._ref = ref
        //
    }

    transform(value: string, options?: { lightness?: number, saturation?: number, opacity?: number }): string {
        if (!this._obj) {
            const obj = this._makeObservable(value, options)
            if (obj) {
                this._subscribe(obj)
            }
            return this._latestValue
        }
        const obj = this._makeObservable(value, options)
        if (obj !== this._obj) {
            this._dispose()
            return this.transform(value, options)
        }

        return this._latestValue
    }

    ngOnDestroy(): void {
        if (this._subscription) {
            this._dispose()
        }

        this._ref = null
    }

    private _makeObservable(value: string, options?: { lightness?: number, saturation?: number, opacity?: number }): Observable<string> {
        return this.themingFacade.themeColors$.pipe(
            map((colors) => {
                if (Object.keys(colors).includes(value)) {
                    return colors[value]
                } else {
                    console.warn(`[ColorThemePipe] No color found in theme for key '${value}'`)
                    return '#000000'
                }
            }),
            map((hexString) => {
                if (isUndefined(options)) { return hexString }
                if (!isUndefined(options) && !isUndefined(options.lightness)) { hexString = MakeHexWithLightness(hexString, options.lightness) }
                if (!isUndefined(options) && !isUndefined(options.saturation)) { hexString = MakeHexWithHSLSaturation(hexString, options.saturation) }
                if (!isUndefined(options) && !isUndefined(options.opacity)) { hexString = MakeHexWithOpacity(hexString, options.opacity) }
                return hexString
            })
        )
    }

    private _dispose(): void {
        if (!isNull(this._subscription)) {
            this._strategy?.dispose(this._subscription)
        }
        
        this._latestValue = null
        this._subscription = null
        this._obj = null
    }

    private _subscribe(obj: Subscribable<any> | Promise<any> | EventEmitter<any>): void {
        this._obj = obj
        this._strategy = this._selectStrategy(obj)
        this._subscription = this._strategy.createSubscription(obj, (value: unknown) => this._updateLatestValue(obj, value))
    }

    private _selectStrategy(obj: Subscribable<any> | Promise<any> | EventEmitter<any>): SubscriptionStrategy {
        if (ɵisPromise(obj)) {
            return _promiseStrategy
        }

        if (ɵisSubscribable(obj)) {
            return _subscribableStrategy
        }

        throw new Error('invalid')
    }

    private _updateLatestValue(async: any, value: unknown): void {
        if (async === this._obj) {
            this._latestValue = value
            this._ref?.markForCheck()
        }
    }
}
