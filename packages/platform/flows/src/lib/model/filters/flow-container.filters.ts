import { DateQueryFilter, Nullable } from "@zwp/platform.common";

export interface FlowContainerFilters {
    dbCreatedAt?: Nullable<DateQueryFilter>,
    dbUpdatedAt?: Nullable<DateQueryFilter>,
    dbDeletedAt?: Nullable<DateQueryFilter>
}

export interface FlowNodeFilters {
    containerId: Nullable<string>
}