import { ModuleWithProviders, NgModule, Provider } from "@angular/core";
import { Action, META_REDUCERS } from "@ngrx/store";
import { historyMetaReducerFactory } from "../+state/reducers";
import { HistoryStoreFeatureActionGroup, HISTORY_STORE_FEATURE_ACTION_GROUPS, HISTORY_STORE_FEATURE_ACTIONS_REGISTERED } from "../model";
import { ZWPHistoryService } from "../services";

@NgModule({})
export class ZWPNgrxHistoryModule {
    static forFeature(featureName: string, ...allowedActions: Array<Action>): ModuleWithProviders<ZWPNgrxHistoryModule> {
        return { ngModule: ZWPNgrxHistoryModule, providers: [
            ..._provideHistoryFeature(featureName, allowedActions)
        ]}
    }

    static forRoot(): ModuleWithProviders<ZWPNgrxHistoryModule> {
        return { ngModule: ZWPNgrxHistoryModule, providers: [
            ..._provideHistoryRoot()
        ]}
    }
}

export function _provideHistoryFeature(featureName: string, allowedActions: Array<Action>): Provider[] {
    return [
        {
            provide: HISTORY_STORE_FEATURE_ACTION_GROUPS,
            multi: true,
            useValue: {
                featureName: featureName,
                actions: allowedActions
            }
        },
        {
            provide: HISTORY_STORE_FEATURE_ACTIONS_REGISTERED,
            multi: true,
            deps: [HISTORY_STORE_FEATURE_ACTION_GROUPS, ZWPHistoryService],
            // useFactory: _setupHistoryStoreFeatureActions
            useFactory: historyStoreFeatureActionsRegistrationFactory
        }
    ]
}

export function _provideHistoryRoot(): Provider[] {
    return [
        {
            provide: HISTORY_STORE_FEATURE_ACTIONS_REGISTERED,
            multi: true,
            useValue: true
        },
        {
            provide: META_REDUCERS,
            deps: [HISTORY_STORE_FEATURE_ACTIONS_REGISTERED, ZWPHistoryService],
            useFactory: historyMetaReducerFactory,
            multi: true
        }
    ]
}

// export function _setupHistoryStoreFeatureActions(
//     historyStoreFeatureActionGroups: HistoryStoreFeatureActionGroup[]
// ) {
//     const service = inject(ZWPHistoryService)
//     service.registerActionsGroups(historyStoreFeatureActionGroups)
// }

const historyStoreFeatureActionsRegistrationFactory = (
    historyStoreFeatureActionGroups: HistoryStoreFeatureActionGroup[],
    historyService: ZWPHistoryService
) => {
    historyService.registerActionsGroups(historyStoreFeatureActionGroups)
    return true
}