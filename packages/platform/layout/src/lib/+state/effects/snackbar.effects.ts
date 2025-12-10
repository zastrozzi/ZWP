import { Injectable, inject } from '@angular/core'
import { ZWPDebuggableInjectable } from '@zwp/platform.common'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { tap } from 'rxjs/operators'
import { SnackbarActions } from '../actions'
import { ZWPSnackbarService } from '../../services'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'ZWPSnackbarEffects', options: { skipMethodDebugger: true } })
export class ZWPSnackbarEffects {
    private actions$ = inject(Actions)
    private snackbarService = inject(ZWPSnackbarService)

    showSnackbar$ = createEffect(() => this.actions$.pipe(
        ofType(SnackbarActions.showSnackbar),
        tap((action) => {
            console.log('Show Snackbar:', action.message, action.duration)
            this.snackbarService.showSnackbar(action.message, action.duration)
        })
    ), { dispatch: false })
}