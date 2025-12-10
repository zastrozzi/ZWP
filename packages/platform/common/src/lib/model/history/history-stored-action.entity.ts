import { HistoryStoredActionStatus } from "./history-stored-action.status"

export interface HistoryStoredActionEntity {
    id: string
    status: HistoryStoredActionStatus
    actionType: string
    stateAdditions: any
    stateRemovals: any
}