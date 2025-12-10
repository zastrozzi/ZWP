import { FilterRelation } from '../enums'

export interface CreateFilterGroupRequest {
    relation: FilterRelation;
}

export interface UpdateFilterGroupRequest {
    relation?: FilterRelation;
}