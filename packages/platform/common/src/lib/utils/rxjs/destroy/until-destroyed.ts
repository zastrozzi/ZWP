import { Observable, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { DECORATOR_APPLIED, getSymbol, createSubjectOnTheInstance, completeSubjectOnTheInstance, setupSubjectUnsubscribedChecker } from './internal'

declare const ngDevMode: boolean

const NG_DEV_MODE = typeof ngDevMode === 'undefined' || ngDevMode

function overrideNonDirectiveInstanceMethod(instance: any, destroyMethodName: string, symbol: symbol): void {
    const originalDestroy = instance[destroyMethodName]

    if (NG_DEV_MODE && typeof originalDestroy !== 'function') {
        throw new Error(
            `${instance.constructor.name} is using untilDestroyed but doesn't implement ${destroyMethodName}`
        )
    }

    createSubjectOnTheInstance(instance, symbol)

    instance[destroyMethodName] = function () {
        // eslint-disable-next-line prefer-rest-params
        originalDestroy.apply(this, arguments)
        completeSubjectOnTheInstance(this, symbol)
        instance[destroyMethodName] = originalDestroy
    }
}

export function untilDestroyed<T>(instance: T, destroyMethodName?: keyof T) {
    return <U>(source: Observable<U>) => {
        const symbol = getSymbol<T>(destroyMethodName)
        if (typeof destroyMethodName === 'string') {
            overrideNonDirectiveInstanceMethod(instance, destroyMethodName, symbol)
        } else {
            NG_DEV_MODE && ensureClassIsDecorated(instance)
            createSubjectOnTheInstance(instance, symbol)
        }

        const destroy$: Subject<void> = (instance as any)[symbol]
        NG_DEV_MODE && setupSubjectUnsubscribedChecker(instance, destroy$)

        return source.pipe(takeUntil<U>(destroy$))
    }
}

function ensureClassIsDecorated(instance: InstanceType<any>): never | void {
    const prototype = Object.getPrototypeOf(instance)
    const missingDecorator = !(DECORATOR_APPLIED in prototype)

    if (missingDecorator) {
        throw new Error(
            'untilDestroyed operator cannot be used inside directives or ' +
                'components or providers that are not decorated with UntilDestroy decorator'
        )
    }
}
