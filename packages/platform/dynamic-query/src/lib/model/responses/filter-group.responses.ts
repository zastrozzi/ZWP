import { FilterRelation } from '../enums'

export interface FilterGroupResponse {
    id: string;
    dbCreatedAt: Date;
    dbUpdatedAt: Date;
    dbDeletedAt?: Date;
    relation: FilterRelation;
    nestLevel: number;
    structuredQueryId: string;
    parentGroupId?: string;
}