import { AuditEventActionType } from "./audit-event.action-type";
import { AuditEventFieldData } from "./audit-event.field-data";

export interface AuditEventResponse {
    id: string;
    dbCreatedAt: Date;
    schema: string;
    table: string;
    affectedId: string;
    eventType: AuditEventActionType;
    eventData: {[key: string]: AuditEventFieldData};
    platformActorType: string;
    platformActorId: string;
}