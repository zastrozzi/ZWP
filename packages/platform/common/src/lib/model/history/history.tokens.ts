import { InjectionToken } from "@angular/core";
import { HistoryStoreFeatureActionGroup } from "./history-store.feature.action-group";

export const HISTORY_STORE_FEATURE_ACTION_GROUPS = new InjectionToken<HistoryStoreFeatureActionGroup[]>('zwp.common.HistoryStoreFeatureActionGroups')
export const HISTORY_STORE_FEATURE_ACTIONS_REGISTERED = new InjectionToken<boolean>('zwp.common.HistoryStoreFeatureActionsRegistered')