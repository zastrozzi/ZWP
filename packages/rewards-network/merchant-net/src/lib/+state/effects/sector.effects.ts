import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { SectorLocalActions, SectorRemoteActions } from '../actions'
import { debounceTime, filter, map, mergeMap, of, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'SectorEffects', options: { skipMethodDebugger: true } })
export class SectorEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private sectorAPI = inject(Services.SECTOR_API_SERVICE)
    private sectorFacade = inject(Facades.SectorFacade)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...SectorRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(SectorRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...SectorRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(SectorRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...SectorRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(SectorRemoteActions.identifiers)({ error: action.error }))
    ))


    // Local Action Effects
    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            SectorLocalActions.updateSectorFilters, 
            SectorLocalActions.resetSectorFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => SectorRemoteActions.list.request({ pagination: null }))
    ))

    selectSector$ = createEffect(() => this.actions$.pipe(
        ofType(SectorLocalActions.selectSector),
        map((action) => SectorRemoteActions.get.request({ sectorId: action.sectorId }))
    ))

    // Remote Action CRUD Effects
    createSector$ = createRemoteEffect(
        this.actions$,
        SectorRemoteActions.create,
        (action) => this.sectorAPI.createSector(action.parentId, action.request)
    )

    getSector$ = createRemoteEffect(
        this.actions$,
        SectorRemoteActions.get,
        (action) => this.sectorAPI.getSector(action.sectorId)
    )

    listSectors$ = createRemoteEffect(
        this.actions$,
        SectorRemoteActions.list,
        (action) => of(action).pipe(
            withLatestFrom(this.sectorFacade.sectorFilters$),
            mergeMap(([requestAction, sectorFilters]) => this.sectorAPI.listSectors(
                requestAction.parent,
                requestAction.pagination,
                sectorFilters
            ))
        )
    )

    listSubsectors$ = createRemoteEffect(
        this.actions$,
        SectorRemoteActions.listSubsectors,
        (action) => of(action).pipe(
            withLatestFrom(this.sectorFacade.sectorFilters$),
            mergeMap(([requestAction, sectorFilters]) => this.sectorAPI.listSubsectors(
                requestAction.sectorId,
                requestAction.pagination,
                sectorFilters
            ))
        )
    )

    updateSector$ = createRemoteEffect(
        this.actions$,
        SectorRemoteActions.update,
        (action) => this.sectorAPI.updateSector(action.sectorId, action.update)
    )

    deleteSector$ = createRemoteEffect(
        this.actions$,
        SectorRemoteActions.delete,
        (action) => this.sectorAPI.deleteSector(action.sectorId),
        (action) => ({ sectorId: action.sectorId })
    )

    ngrxOnInitEffects() {
        return SectorLocalActions.initialiseSectorState()
    }
}