import { makeTransformEnumPipeSignature } from '../transform-enum-pipe.signature'

export enum AuditEventActionType {
    create = 'create',
    update = 'update',
    delete = 'delete',
    restore = 'restore'
}

export enum AuditEventActionTypeVerb {
    create = 'created',
    update = 'updated',
    delete = 'deleted',
    restore = 'restored'
}

export enum AuditEventActionTypeLabel {
    create = 'Create',
    update = 'Update',
    delete = 'Delete',
    restore = 'Restore'
}

export const auditEventActionTypeLabelPipe = makeTransformEnumPipeSignature(AuditEventActionType, AuditEventActionTypeLabel)