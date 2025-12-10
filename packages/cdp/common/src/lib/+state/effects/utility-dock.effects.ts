import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import {
    allEnumCases,
    isUndefined,
    ZWPDebuggableInjectable
} from '@zwp/platform.common'
import { UtilityDockActions } from '../actions'
import { debounceTime, filter, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'CDPCommonUtilityDockEffects', options: { skipMethodDebugger: true } })
export class CDPCommonUtilityDockEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private utilityDockFacade = inject(Facades.CDPCommonUtilityDockFacade)

    // Local Action Effects
    toggleUtilityDockPanel$ = createEffect(() => 
        this.actions$.pipe(
            ofType(UtilityDockActions.toggleUtilityDockPanel),
            map(action => action.panelType),
            mergeMap((panelType) => 
                of(panelType).pipe(
                    withLatestFrom(this.utilityDockFacade.utilityDockPanel$(panelType))
                )
            ),
            filter(([_, panel]) => !isUndefined(panel)),
            map(([panelType, panel]) => panel?.isExpanded ? 
                UtilityDockActions.closeUtilityDockPanel({ panelType }) :
                UtilityDockActions.openUtilityDockPanel({ panelType })
            )
        )
    )

    openUtilityDockPanel$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UtilityDockActions.openUtilityDockPanel),
            map(action => action.panelType),
            map(panelTypeToOpen => allEnumCases(Model.UtilityDockPanelType).filter(panelType => panelType !== panelTypeToOpen)),
            map(panelTypesToClose => UtilityDockActions.closeManyUtilityDockPanels({ panelTypes: panelTypesToClose }))
        )
    )

    ngrxOnInitEffects() {
        return UtilityDockActions.initialiseUtilityDockState()
    }

}