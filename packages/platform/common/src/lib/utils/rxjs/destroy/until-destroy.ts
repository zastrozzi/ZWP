import {
    InjectableType,
    TypeDecorator,
    ɵComponentType as ComponentType,
    ɵDirectiveType as DirectiveType,
} from '@angular/core'
import { Subscription } from 'rxjs'
import { getSymbol, UntilDestroyOptions, completeSubjectOnTheInstance, markAsDecorated,PipeType, isPipe } from './internal'

function unsubscribe(property: unknown): void {
    if (property instanceof Subscription) {
        property.unsubscribe()
    }
}

function unsubscribeIfPropertyIsArrayLike(property: unknown[]): void {
    Array.isArray(property) && property.forEach(unsubscribe)
}

function decorateNgOnDestroy(ngOnDestroy: (() => void) | null | undefined, options: UntilDestroyOptions) {
    return function (this: any) {
        ngOnDestroy && ngOnDestroy.call(this)
        completeSubjectOnTheInstance(this, getSymbol())

        if (options.arrayName) {
            unsubscribeIfPropertyIsArrayLike(this[options.arrayName])
        }

        if (options.checkProperties) {
            for (const property in this) {
                if (options.blackList?.includes(property)) {
                    continue
                }

                unsubscribe(this[property])
            }
        }
    }
}

function decorateProviderDirectiveOrComponent<T>(
    type: InjectableType<T> | DirectiveType<T> | ComponentType<T>,
    options: UntilDestroyOptions
): void {
    type.prototype.ngOnDestroy = decorateNgOnDestroy(type.prototype.ngOnDestroy, options)
}

function decoratePipe<T>(type: PipeType<T>, options: UntilDestroyOptions): void {
    const def = type.ɵpipe
    def.onDestroy = decorateNgOnDestroy(def.onDestroy, options)
}

export function UntilDestroy(options: UntilDestroyOptions = {}): TypeDecorator {
    return (type: any) => {
        if (isPipe(type)) {
            decoratePipe(type, options)
        } else {
            decorateProviderDirectiveOrComponent(type, options)
        }

        markAsDecorated(type)
    }
}
