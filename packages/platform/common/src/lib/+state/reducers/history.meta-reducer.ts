import { inject } from "@angular/core"
import { Action, ActionReducer, MetaReducer } from "@ngrx/store"
import { ZWPHistoryService } from "../../services"
import { DiffingUtils, isInternalNgrxAction, isInternalPersistenceAction, isInternalPersistenceProfileAction, matchesActionType } from "../../utils"
import { HistoryStoreActions, KeyboardActions } from "../actions"

function copyBuffer (cur: any) {
    if (cur instanceof Buffer) {
      return Buffer.from(cur)
    }
  
    return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length)
  }
  
  function rfdc (opts: any) {
    opts = opts || {}
  
    if (opts.circles) return rfdcCircles(opts)
    return opts.proto ? cloneProto : clone
  
    function cloneArray (a: any, fn: any) {
      const keys = Object.keys(a)
      const a2 = new Array(keys.length)
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i]
        const cur = a[k]
        if (typeof cur !== 'object' || cur === null) {
          (a2 as any)[k] = cur
        } else if (cur instanceof Date) {
          (a2 as any)[k] = new Date(cur)
        } else if (ArrayBuffer.isView(cur)) {
            (a2 as any)[k] = copyBuffer(cur)
        } else {
            (a2 as any)[k] = fn(cur)
        }
      }
      return a2
    }
  
    function clone (o: any) {
      if (typeof o !== 'object' || o === null) return o
      if (o instanceof Date) return new Date(o)
      if (Array.isArray(o)) return cloneArray(o, clone)
      if (o instanceof Map) return new Map(cloneArray(Array.from(o), clone))
      if (o instanceof Set) return new Set(cloneArray(Array.from(o), clone))
      const o2 = {}
      for (const k in o) {
        if (Object.hasOwnProperty.call(o, k) === false) continue
        const cur = o[k]
        if (typeof cur !== 'object' || cur === null) {
            (o2 as any)[k] = cur
        } else if (cur instanceof Date) {
            (o2 as any)[k] = new Date(cur)
        } else if (cur instanceof Map) {
            (o2 as any)[k] = new Map(cloneArray(Array.from(cur), clone))
        } else if (cur instanceof Set) {
            (o2 as any)[k] = new Set(cloneArray(Array.from(cur), clone))
        } else if (ArrayBuffer.isView(cur)) {
            (o2 as any)[k] = copyBuffer(cur)
        } else {
            (o2 as any)[k] = clone(cur)
        }
      }
      return o2
    }
  
    function cloneProto (o: any) {
      if (typeof o !== 'object' || o === null) return o
      if (o instanceof Date) return new Date(o)
      if (Array.isArray(o)) return cloneArray(o, cloneProto)
      if (o instanceof Map) return new Map(cloneArray(Array.from(o), cloneProto))
      if (o instanceof Set) return new Set(cloneArray(Array.from(o), cloneProto))
      const o2 = {}
      for (const k in o) {
        const cur = o[k]
        if (typeof cur !== 'object' || cur === null) {
            (o2 as any)[k] = cur
        } else if (cur instanceof Date) {
            (o2 as any)[k] = new Date(cur)
        } else if (cur instanceof Map) {
            (o2 as any)[k] = new Map(cloneArray(Array.from(cur), cloneProto))
        } else if (cur instanceof Set) {
            (o2 as any)[k] = new Set(cloneArray(Array.from(cur), cloneProto))
        } else if (ArrayBuffer.isView(cur)) {
            (o2 as any)[k] = copyBuffer(cur)
        } else {
            (o2 as any)[k] = cloneProto(cur)
        }
      }
      return o2
    }
  }
  
  function rfdcCircles (opts: any) {
    const refs: any[] = []
    const refsNew: any[] = []
  
    return opts.proto ? cloneProto : clone
  
    function cloneArray (a: any, fn: any) {
      const keys = Object.keys(a)
      const a2 = new Array(keys.length)
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i]
        const cur = a[k]
        if (typeof cur !== 'object' || cur === null) {
          (a2 as any)[k] = cur
        } else if (cur instanceof Date) {
            (a2 as any)[k] = new Date(cur)
        } else if (ArrayBuffer.isView(cur)) {
            (a2 as any)[k] = copyBuffer(cur)
        } else {
          const index = refs.indexOf(cur)
          if (index !== -1) {
            (a2 as any)[k] = refsNew[index]
          } else {
            (a2 as any)[k] = fn(cur)
          }
        }
      }
      return a2
    }
  
    function clone (o: any) {
      if (typeof o !== 'object' || o === null) return o
      if (o instanceof Date) return new Date(o)
      if (Array.isArray(o)) return cloneArray(o, clone)
      if (o instanceof Map) return new Map(cloneArray(Array.from(o), clone))
      if (o instanceof Set) return new Set(cloneArray(Array.from(o), clone))
      const o2 = {}
      refs.push(o)
      refsNew.push(o2)
      for (const k in o) {
        if (Object.hasOwnProperty.call(o, k) === false) continue
        const cur = o[k]
        if (typeof cur !== 'object' || cur === null) {
            (o2 as any)[k] = cur
        } else if (cur instanceof Date) {
            (o2 as any)[k] = new Date(cur)
        } else if (cur instanceof Map) {
            (o2 as any)[k] = new Map(cloneArray(Array.from(cur), clone))
        } else if (cur instanceof Set) {
            (o2 as any)[k] = new Set(cloneArray(Array.from(cur), clone))
        } else if (ArrayBuffer.isView(cur)) {
            (o2 as any)[k] = copyBuffer(cur)
        } else {
          const i = refs.indexOf(cur)
          if (i !== -1) {
            (o2 as any)[k] = refsNew[i]
          } else {
            (o2 as any)[k] = clone(cur)
          }
        }
      }
      refs.pop()
      refsNew.pop()
      return o2
    }
  
    function cloneProto (o: any) {
      if (typeof o !== 'object' || o === null) return o
      if (o instanceof Date) return new Date(o)
      if (Array.isArray(o)) return cloneArray(o, cloneProto)
      if (o instanceof Map) return new Map(cloneArray(Array.from(o), cloneProto))
      if (o instanceof Set) return new Set(cloneArray(Array.from(o), cloneProto))
      const o2 = {}
      refs.push(o)
      refsNew.push(o2)
      for (const k in o) {
        const cur = o[k]
        if (typeof cur !== 'object' || cur === null) {
            (o2 as any)[k] = cur
        } else if (cur instanceof Date) {
            (o2 as any)[k] = new Date(cur)
        } else if (cur instanceof Map) {
            (o2 as any)[k] = new Map(cloneArray(Array.from(cur), cloneProto))
        } else if (cur instanceof Set) {
            (o2 as any)[k] = new Set(cloneArray(Array.from(cur), cloneProto))
        } else if (ArrayBuffer.isView(cur)) {
            (o2 as any)[k] = copyBuffer(cur)
        } else {
          const i = refs.indexOf(cur)
          if (i !== -1) {
            (o2 as any)[k] = refsNew[i]
          } else {
            (o2 as any)[k] = cloneProto(cur)
          }
        }
      }
      refs.pop()
      refsNew.pop()
      return o2
    }
  }

export function isHistoryUndo(action: Action): action is ReturnType<typeof HistoryStoreActions.undo> {
    return action.type === HistoryStoreActions.undo.type
}

export function isHistoryRedo(action: Action): action is ReturnType<typeof HistoryStoreActions.redo> {
    return action.type === HistoryStoreActions.redo.type
}

export const stateWithUndoRedo = (state: any, action: Action) => {
    if (isHistoryUndo(action)) { 
        const stateClone = rfdc(undefined)(state)
        // console.log(stateClone, 'clone')
        const stateReverseAdditions = DiffingUtils.subtractDeep2(action.entity.stateAdditions, stateClone)
        const stateReverseRemovals = DiffingUtils.addDeep(stateReverseAdditions, action.entity.stateRemovals)
        // let statePostUndo = DiffingUtils.addDeep(DiffingUtils.subtractDeep(stateClone, action.entity.stateAdditions), action.entity.stateRemovals)
        
        return stateReverseRemovals
    } else if (isHistoryRedo(action)) {
        const stateClone = rfdc(undefined)(state)
        // console.log(stateClone, 'clone')
        const stateReverseRemovals = DiffingUtils.subtractDeep2(action.entity.stateRemovals, stateClone)
        const stateReverseAdditions = DiffingUtils.addDeep(stateReverseRemovals, action.entity.stateAdditions)
        
        
        // let statePostUndo = DiffingUtils.addDeep(DiffingUtils.subtractDeep(stateClone, action.entity.stateAdditions), action.entity.stateRemovals)
        
        return stateReverseAdditions
    } else {
        return state
    }
    
}

export const historyMetaReducerFactory = (): MetaReducer => {
    const service = inject(ZWPHistoryService)
    
    return (reducer: ActionReducer<any>) => (state, action) => {
        const newState = reducer(stateWithUndoRedo(state, action), action)
        if (isHistoryUndo(action)) { service.processUndoSuccess(action.entity.id) }
        if (isHistoryRedo(action)) { service.processRedoSuccess(action.entity.id) }
        if (
            !isInternalNgrxAction(action) && 
            !isInternalPersistenceAction(action) && 
            !isInternalPersistenceProfileAction(action) &&
            !matchesActionType(action, KeyboardActions) &&
            !matchesActionType(action, HistoryStoreActions)
        ) {
            if (service.actionIsHistoryRecordable(action)) {service.processHistoryRecordableAction(action, state, newState)}
        }
        
        return newState
    }
}