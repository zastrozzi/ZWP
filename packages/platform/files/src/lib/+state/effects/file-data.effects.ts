import { inject, Injectable } from '@angular/core'
import { createNamespacedFeatureKey, DiffingUtils, isNil, PersistenceActions, ZWPDebuggableInjectable, ZWPKeyboardFacade, ZWPRouterFacade } from '@zwp/platform.common'
import { ZWPMenuLayoutFacade } from '@zwp/platform.layout'
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects'
import { ROUTER_NAVIGATED, routerNavigatedAction } from '@ngrx/router-store'
import { concatMap, filter, map, mergeMap, of, tap, withLatestFrom } from 'rxjs'
import { FileExplorerItemContextMenuComponent } from '../../components'
import { FileDataActions, FileExplorerActions } from '../actions'
import { Facades } from '../facades'
import { Identifiers } from '../identifiers'
import { Action } from '@ngrx/store'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'ZWPFileDataEffects', options: { skipMethodDebugger: true } })
export class ZWPFileDataEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private fileExplorerFacade = inject(Facades.ZWPFileExplorerFacade)

    deleteChildrenOnParentDelete$ = createEffect(() => this.actions$.pipe(
        ofType(FileDataActions.remove),
        map(action => action.id),
        mergeMap((id) => of(id).pipe(
            withLatestFrom(this.fileExplorerFacade.fileDataItemsByParentId$(id)),
            map(([_, children]) => children.flatMap(child => child.id))
        )),
        concatMap((childIds) => childIds.map(id => FileDataActions.remove({ id })))
    ))

    ngrxOnInitEffects(): Action {
        return PersistenceActions.rehydrateStateRequest({
            featureKey: createNamespacedFeatureKey(
                Identifiers.PLATFORM_FILES_ACTION_IDENTIFIER,
                Identifiers.FILE_DATA_STATE_FEATURE_KEY
            ),
            persistenceProfileId: null
        })
    }
}
