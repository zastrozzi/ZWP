import { AuditEventFilters, DateQueryFilter, Nullable, StringQueryFilter } from "@zwp/platform.common";

export interface EmployeeFilters {
    employerId: Nullable<string>
}

export interface EnduserFilters {
    firstName: Nullable<StringQueryFilter>,
    lastName: Nullable<StringQueryFilter>,
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>
}

export interface EnduserAddressFilters {
    enduserId: Nullable<string>
}

export interface EnduserCredentialFilters {
    enduserId: Nullable<string>
}

export interface EnduserEmailFilters {
    enduserId: Nullable<string>
}

export interface EnduserPhoneFilters {
    enduserId: Nullable<string>
}

export interface EnduserDeviceFilters {
    enduserId: Nullable<string>
}

export interface EnduserSessionFilters {
    enduserId: Nullable<string>
}

export interface EnduserActivityWithEnduserFilters {
    enduser: Nullable<EnduserFilters>
    activity: Nullable<AuditEventFilters>
}