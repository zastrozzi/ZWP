import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade } from '@zwp/platform.common'
import { Services } from '../../services'
import { FileUploadLocalActions } from '../actions'
import { debounceTime, filter, map, of, switchMap, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'
import { Model } from '../../model'
import { CDPCommon } from '@zwp/cdp.common'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'GoogleCloudFileUploadEffects', options: { skipMethodDebugger: true } })
export class GoogleCloudFileUploadEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private storageBucketAPI = inject(Services.STORAGE_BUCKET_API_SERVICE)
    private storageBucketFacade = inject(Facades.GoogleCloudStorageBucketFacade)
    private routerFacade = inject(ZWPRouterFacade)

    openFileUploadUtilityPanel$ = createEffect(() => 
        this.actions$.pipe(
            ofType(FileUploadLocalActions.createFileUpload),
            map(() => CDPCommon.State.UtilityDockActions.openUtilityDockPanel({ panelType: CDPCommon.Model.UtilityDockPanelType.uploads }))
        )
    )

    // OnInitEffects
    ngrxOnInitEffects() {
        return FileUploadLocalActions.initialiseFileUploadState()
    }
}
