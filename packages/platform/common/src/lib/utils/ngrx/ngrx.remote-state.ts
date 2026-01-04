import { EntityState } from '@ngrx/entity'
import {
    filterBooleanQuery,
    filterDateQuery,
    filterEnumQuery,
    filterNumberQuery,
    filterStringQuery,
    FlexibleKeyOf,
    getNestedValue,
    isBooleanQueryFilter,
    isDateQueryFilter,
    isEnumQueryFilter,
    isNumberQueryFilter,
    isStringQueryFilter,
    Nullable,
    QueryFilterCollection,
} from '../../model'
import { isNil, isNull } from '../optional.utils'
import { coerceBoolean, coerceNumber, coerceString } from '../primitive-type.utils'

export interface BaseRemoteFeatureState {
    apiIsBusy: boolean
    loaded: boolean
    error: Nullable<string>
}

export interface RemotePaginationState<T extends object> {
    limit: number
    offset: number
    order: 'asc' | 'desc'
    orderBy: Nullable<FlexibleKeyOf<T>>
    total: number
}

export const initialBaseRemoteFeatureState: BaseRemoteFeatureState = {
    loaded: false,
    apiIsBusy: false,
    error: null,
}

export const remoteSuccessState = <State extends BaseRemoteFeatureState>(state: State) => ({
    ...state,
    apiIsBusy: false,
    loaded: true,
    error: null,
})
export const remoteFailureState = <State extends BaseRemoteFeatureState>(state: State, error: any) => ({
    ...state,
    apiIsBusy: false,
    loaded: false,
    error: error?.error?.message?.reason ?? `${error}`,
})
export const remoteRequestState = <State extends BaseRemoteFeatureState>(state: State) => ({
    ...state,
    apiIsBusy: true,
    error: null,
})

export const selectRemoteState = <State extends BaseRemoteFeatureState>(state: State) => ({
    busy: state.apiIsBusy,
    loaded: state.loaded,
    error: state.error,
})

export const initialRemotePaginationState = <T extends object>(
    orderBy: Nullable<FlexibleKeyOf<T>> = null
): RemotePaginationState<T> => ({
    limit: 30,
    offset: 0,
    order: 'asc',
    orderBy,
    total: 0,
})

export const selectPaginatedElements = <T extends object>(elements: T[], pagination: RemotePaginationState<T>) => {
    return elements
        .sort((a, b) => {
            if (!isNull(pagination.orderBy)) {
                if (pagination.order === 'asc') {
                    return getNestedValue(a, pagination.orderBy) > getNestedValue(b, pagination.orderBy) ? 1 : -1
                } else {
                    return getNestedValue(a, pagination.orderBy) < getNestedValue(b, pagination.orderBy) ? 1 : -1
                }
            } else {
                return 0
            }
        })
        .slice(pagination.offset, pagination.offset + pagination.limit)
}

export const selectFilteredElements = <T extends object, F extends object>(
    elements: T[],
    filters: QueryFilterCollection<F>,
    filterMap: Record<keyof F, FlexibleKeyOf<T>>
) => {
    return elements.filter((element) => {
        return Object.keys(filters).every((key) => {
            const filter = filters[key as keyof F]
            const value = getNestedValue(element, filterMap[key as keyof F])
            if (filter === null || isNil(value)) return true
            if (isNumberQueryFilter(filter)) {
                return filterNumberQuery(filter, coerceNumber(value))
            }
            if (isDateQueryFilter(filter)) {
                return filterDateQuery(filter, value as Date)
            }
            if (isEnumQueryFilter(filter)) {
                return filterEnumQuery(filter, value)
            }
            if (isStringQueryFilter(filter)) {
                return filterStringQuery(filter, coerceString(value))
            }
            if (isBooleanQueryFilter(filter)) {
                return filterBooleanQuery(filter, coerceBoolean(value))
            }
            return true
        })
    })
}

export const incrementRemotePaginationStateTotal = <T extends object>(
    state: RemotePaginationState<T>,
    increment: number
) => {
    return { ...state, total: state.total + increment }
}

const countEntityStateIds = <E extends object>(entityState: EntityState<E>, ids: string[] | number[], increment: boolean) => {
    const entityStrIds = entityState.ids.map((id) => coerceString(id))
    const strIds = ids.map((id) => coerceString(id))
    return strIds.filter((id) => (increment ? !entityStrIds.includes(id) : entityStrIds.includes(id))).length
}

export const incrementRemotePaginationStateTotalConditionally = <S extends object, E extends object>(
    state: S,
    options: {
        entityStateKey: keyof S
        remotePaginationStateKey: keyof S
        ids: string[] | number[]
    }
) => {
    return {
        ...(state[options.remotePaginationStateKey] as RemotePaginationState<E>),
        total:
            (state[options.remotePaginationStateKey] as RemotePaginationState<E>).total +
            countEntityStateIds(state[options.entityStateKey] as EntityState<E>, options.ids, true)
    }
}

export const decrementRemotePaginationStateTotalConditionally = <S extends object, E extends object>(
    state: S,
    options: {
        entityStateKey: keyof S
        remotePaginationStateKey: keyof S
        ids: string[] | number[]
    }
) => {
    return {
        ...(state[options.remotePaginationStateKey] as RemotePaginationState<E>),
        total:
            (state[options.remotePaginationStateKey] as RemotePaginationState<E>).total -
            countEntityStateIds(state[options.entityStateKey] as EntityState<E>, options.ids, false)
    }
}
