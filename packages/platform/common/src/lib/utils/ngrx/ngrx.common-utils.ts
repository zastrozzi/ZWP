import { Dictionary } from "@ngrx/entity"
import { Action, ActionCreator } from "@ngrx/store"
import "../array.extensions"
import { isNil } from "../optional.utils"

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

export const createActionType = (identifiers: string[], actionType: string) => {
    return identifiers.map(i => '[' + i + ']').join(' ').concat(' ', actionType)
}

export const createNamespacedFeatureKey = (namespace: string, featureKey: string) => {
    return namespace.concat('.', featureKey)
}

export type NamespacedIdentifiers = {
    namespace: string
    identifiers: string[]
}

export const createRequestActionType = (identifiers: string[], actionType: string) => createActionType([...identifiers, REQUEST], actionType)
export const createSuccessActionType = (identifiers: string[], actionType: string) => createActionType([...identifiers, SUCCESS], actionType)
export const createFailureActionType = (identifiers: string[], actionType: string) => createActionType([...identifiers, FAILURE], actionType)

export type SelectedEntity<Entity> = Entity & {
    isSelected: boolean
}

export const dictionaryValuesFromArray = <T>(ids: string[], dict: Dictionary<T>): T[] => ids.compactMap(id => dict[id])

export const actionTypes = (actionObj: {[actionName: string]: Action | ActionCreator | any}): string[] => {
    return Object.values(actionObj).map(action => isNil(action.type) ? undefined : action.type).filter(Boolean)
}

export const matchesActionType = (action: Action, actionsObj: {[actionName: string]: Action | ActionCreator | any}): boolean => {
    return actionTypes(actionsObj).includes(action.type)
}
