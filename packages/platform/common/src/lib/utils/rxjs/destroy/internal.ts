import {
    Type,
    ɵNG_PIPE_DEF,
    ɵPipeDef,
    InjectableType,
    ɵDirectiveType,
    ɵComponentType,
    ɵglobal,
    ɵgetLContext,
    ɵLContext,
} from '@angular/core'
import { EMPTY, from, Subject } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

const NG_PIPE_DEF = ɵNG_PIPE_DEF as 'ɵpipe'

export interface PipeType<T> extends Type<T> {
    ɵpipe: ɵPipeDef<T>
}

export function isPipe<T>(target: any): target is PipeType<T> {
    return !!target[NG_PIPE_DEF]
}

const DESTROY: unique symbol = Symbol('__destroy')

export const DECORATOR_APPLIED: unique symbol = Symbol('__decoratorApplied')

export function getSymbol<T>(destroyMethodName?: keyof T): symbol {
    if (typeof destroyMethodName === 'string') {
        return Symbol(`__destroy__${destroyMethodName}`)
    } else {
        return DESTROY
    }
}

export function markAsDecorated<T>(
    type: InjectableType<T> | PipeType<T> | ɵDirectiveType<T> | ɵComponentType<T>
): void {
    type.prototype[DECORATOR_APPLIED] = true
}

export interface UntilDestroyOptions {
    blackList?: string[]
    arrayName?: string
    checkProperties?: boolean
}

export function createSubjectOnTheInstance(instance: any, symbol: symbol): void {
    if (!instance[symbol]) {
        instance[symbol] = new Subject<void>()
    }
}

export function completeSubjectOnTheInstance(instance: any, symbol: symbol): void {
    if (instance[symbol]) {
        instance[symbol].next()
        instance[symbol].complete()
        instance[symbol] = null
    }
}

const CLEANUP = 7
const CheckerHasBeenSet = Symbol('CheckerHasBeenSet')

export function setupSubjectUnsubscribedChecker(instance: any, destroy$: Subject<void>): void {

    if (instance[CheckerHasBeenSet] || isAngularInTestMode()) {
        return
    }

    runOutsideAngular(() =>
        from(Promise.resolve())
            .pipe(
                mergeMap(() => {
                    let lContext: ɵLContext | null

                    try {
                        lContext = ɵgetLContext(instance)
                    } catch {
                        lContext = null
                    }

                    const lView = lContext?.lView

                    if (lView == null) {
                        return EMPTY
                    }

                    const lCleanup = lView[CLEANUP] || (lView[CLEANUP] = [])
                    const cleanupHasBeenExecuted$ = new Subject<void>()
                    lCleanup.push(function untilDestroyedLCleanup() {
                        runOutsideAngular(() => {
                            cleanupHasBeenExecuted$.next()
                            cleanupHasBeenExecuted$.complete()
                        })
                    })
                    return cleanupHasBeenExecuted$
                }),
                
                mergeMap(() => Promise.resolve())
            )
            .subscribe(() => {
                const observed = destroy$['observed'] ?? destroy$['observers'].length > 0
                if (observed) {
                    console.warn(createMessage(instance))
                }
            })
    )

    instance[CheckerHasBeenSet] = true
}

function isAngularInTestMode(): boolean {
    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (typeof __karma__ !== 'undefined' && !!__karma__) ||
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (typeof jasmine !== 'undefined' && !!jasmine) ||
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (typeof jest !== 'undefined' && !!jest) ||
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (typeof Mocha !== 'undefined' && !!Mocha) ||
        (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]')
    )
}

function runOutsideAngular<T>(fn: () => T): T {
    const Zone = ɵglobal.Zone
    const isNgZoneEnabled = !!Zone && typeof Zone.root?.run === 'function'
    return isNgZoneEnabled ? Zone.root.run(fn) : fn()
}

function createMessage(instance: any): string {
    return `
  The ${instance.constructor.name} still has subscriptions that haven't been unsubscribed.
  This may happen if the class extends another class decorated with @UntilDestroy().
  The child class implements its own ngOnDestroy() method but doesn't call super.ngOnDestroy().
  Let's look at the following example:
  @UntilDestroy()
  @Directive()
  export abstract class BaseDirective {}
  @Component({ template: '' })
  export class ConcreteComponent extends BaseDirective implements OnDestroy {
    constructor() {
      super();
      someObservable$.pipe(untilDestroyed(this)).subscribe();
    }
    ngOnDestroy(): void {
      // Some logic here...
    }
  }
  The BaseDirective.ngOnDestroy() will not be called since Angular will call ngOnDestroy()
  on the ConcreteComponent, but not on the BaseDirective.
  One of the solutions is to declare an empty ngOnDestroy method on the BaseDirective:
  @UntilDestroy()
  @Directive()
  export abstract class BaseDirective {
    ngOnDestroy(): void {}
  }
  @Component({ template: '' })
  export class ConcreteComponent extends BaseDirective implements OnDestroy {
    constructor() {
      super();
      someObservable$.pipe(untilDestroyed(this)).subscribe();
    }
    ngOnDestroy(): void {
      // Some logic here...
      super.ngOnDestroy();
    }
  }
  `
}
