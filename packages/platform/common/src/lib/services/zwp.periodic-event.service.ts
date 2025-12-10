import { inject, Injectable, NgZone, OnDestroy } from '@angular/core'
import { BehaviorSubject, combineLatest, concatAll, debounce, distinct, filter, interval, Observable, Subscription, switchMap } from 'rxjs'
import { Nullable } from '../model'
import { isNull } from '../utils'
import { ZWPDebuggableInjectable } from '../decorators/zwp.debuggable.decorator'
import { ZWP_LOGGING_SERVICE } from './zwp.logging.service'

export interface ZWPPeriodicEvent {
    name: string
    interval: number
    running: boolean
    total: number
    sinceLastStart: number
}

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({serviceName: 'ZWPPeriodicEventService', options: { skipMethodDebugger: true }})
export class ZWPPeriodicEventService implements OnDestroy {
    constructor() {
        // super('ZWPPeriodicEventService', { skipMethodDebugger: true })
    }

    private readonly loggingService = inject(ZWP_LOGGING_SERVICE)
    private readonly zone = inject(NgZone)
    private _periodicEventSubjectMap = new Map<string, BehaviorSubject<ZWPPeriodicEvent>>()
    private _mapChangeSubject = new BehaviorSubject<void>(undefined)
    private subscriptions = new Subscription()

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
        this.removeAll()
        this._mapChangeSubject.complete()
        // this.debuggableServiceDestroy()
    }

    create(name: string, interval: number, running: boolean): void {
        if (this._periodicEventSubjectMap.has(name)) { 
            this.loggingService.error(`Periodic event with name '${name}' already exists`)
            return
        }
        this._periodicEventSubjectMap.set(name, new BehaviorSubject<ZWPPeriodicEvent>({ name, interval, running, total: running ? 1 : 0, sinceLastStart: running ? 1 : 0 }))
        this.registerPeriodicEventSubscription(name)
        this._mapChangeSubject.next()
    }

    remove(name: string): void {
        if (!this._periodicEventSubjectMap.has(name)) { 
            this.loggingService.error(`Periodic event with name '${name}' does not exist`)
            return
        }
        const subject = this.getPeriodicEventSubject(name)
        if (isNull(subject)) { 
            this.loggingService.error(`Periodic event with name '${name}' does not exist`)
            return
        }
        subject.complete()
        this._periodicEventSubjectMap.delete(name)
        this._mapChangeSubject.next()
    }

    removeAll(): void {
        this._periodicEventSubjectMap.forEach((subject) => {
            subject.complete()
        })
        this._periodicEventSubjectMap.clear()
        this._mapChangeSubject.next()
    }

    start(name: string): void {
        const subject = this.getPeriodicEventSubject(name)
        if (isNull(subject)) { 
            this.loggingService.error(`Periodic event with name '${name}' does not exist`)
            return
        }
        const currentValue = subject.getValue()
        if (currentValue.running) { return }
        subject.next({ ...currentValue, running: true, total: currentValue.total + 1, sinceLastStart: 1 })
    }

    stop(name: string): void {
        const subject = this.getPeriodicEventSubject(name)
        if (isNull(subject)) { 
            this.loggingService.error(`Periodic event with name '${name}' does not exist`)
            return
        }
        const currentValue = subject.getValue()
        if (!currentValue.running) { return }
        subject.next({ ...currentValue, running: false })
    }

    startAll(): void {
        this._periodicEventSubjectMap.forEach((subject) => {
            const currentValue = subject.getValue()
            if (currentValue.running) { return }
            subject.next({ ...currentValue, running: true, total: currentValue.total + 1, sinceLastStart: 1 })
        })
    }

    stopAll(): void {
        this._periodicEventSubjectMap.forEach((subject) => {
            const currentValue = subject.getValue()
            if (!currentValue.running) { return }
            subject.next({ ...currentValue, running: false })
        })
    }

    updateInterval(name: string, interval: number): void {
        if (interval <= 0) { 
            this.loggingService.error(`Periodic event interval for event with name ${name} must be greater than 0`)
            return
         }
        const subject = this.getPeriodicEventSubject(name)
        if (isNull(subject)) { 
            this.loggingService.error(`Periodic event with name '${name}' does not exist`)
            return
        }
        subject.next({ ...subject.getValue(), interval })
    }

    getEvents$(...eventNames: string[]): Observable<ZWPPeriodicEvent> {
        const names = [...eventNames]
        return this._mapChangeSubject.asObservable().pipe(
            switchMap(() => combineLatest(Array.from(this._periodicEventSubjectMap.values()))),
            concatAll(),
            filter(event => event.running && (names.length === 0 || names.includes(event.name))),
            distinct(({ name, total }) => `${name}-${total}`)
        )
    }

    private getPeriodicEventSubject(name: string): Nullable<BehaviorSubject<ZWPPeriodicEvent>> {
        if (!this._periodicEventSubjectMap.has(name)) { return null }
        return this._periodicEventSubjectMap.get(name) ?? null
    }

    private registerPeriodicEventSubscription(name: string): void {
        const subject = this.getPeriodicEventSubject(name)
        if (isNull(subject)) { 
            this.loggingService.error(`Periodic event with name '${name}' does not exist`)
            return
        }
        const subscription = subject.pipe(
            filter((event) => event.running),
            debounce(event => interval(event.interval))
        ).subscribe(() => {
            const currentSubject = this.getPeriodicEventSubject(name)
            if (isNull(currentSubject)) { return }
            const currentValue = currentSubject.getValue()
            this.zone.runOutsideAngular(() => {

                currentSubject.next({ ...currentValue, total: currentValue.running ? currentValue.total + 1 : currentValue.total, sinceLastStart: currentValue.running ? currentValue.sinceLastStart + 1 : 0 })
            })
        })
        this.subscriptions.add(subscription)
    }
}