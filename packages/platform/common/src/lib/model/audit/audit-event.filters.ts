import { DateQueryFilter, EnumQueryFilter, QueryFilterEntityMap, StringQueryFilter } from '../networking'
import { Nullable } from "../types";
import { AuditEventActionType } from "./audit-event.action-type";
import { AuditEventResponse } from './audit-event.response'

export interface AuditEventFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    affectedSchema: Nullable<StringQueryFilter>
    affectedId: Nullable<StringQueryFilter>
    eventType: Nullable<EnumQueryFilter<AuditEventActionType>>
}

export const initialAuditEventFilters: AuditEventFilters = {
    dbCreatedAt: null,
    affectedSchema: null,
    affectedId: null,
    eventType: null
}

export const auditEventFilterEntityMap: QueryFilterEntityMap<AuditEventFilters, AuditEventResponse> = {
    dbCreatedAt: 'dbCreatedAt',
    affectedSchema: 'schema',
    affectedId: 'affectedId',
    eventType: 'eventType'
}