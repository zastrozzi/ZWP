import { ISO4217CurrencyCode } from "@zwp/platform.common";
import { Region, ProgrammeKPI, CommissionGroupRange } from '../common'
import { ProgrammeStatus, MembershipStatus, SectorStatus } from "../enums";

export interface ProgrammeResponse {
    id: string,
    dbCreatedAt: Date,
    dbUpdatedAt: Date,
    dbDeletedAt?: Date,
    awid: number,
    name: string,
    description?: string,
    logoUrl: string,
    clickThroughUrl: string,
    displayUrl?: string,
    currencyCode: ISO4217CurrencyCode,
    primaryRegion: Region,
    primarySector?: string,
    status: ProgrammeStatus,
    validDomains: [string]
}

export interface SectorResponse {
    id: string,
    dbCreatedAt: Date,
    dbUpdatedAt: Date,
    dbDeletedAt?: Date,
    name: string,
    status?: SectorStatus, // MIGHT NEED TO REMOVE THIS
    displayImageUrl?: string,
    parentId?: string
}

export interface ProgrammeSectorResponse {
    id: string,
    dbCreatedAt: Date,
    dbUpdatedAt: Date,
    dbDeletedAt?: Date,
    programmeId: string,
    sectorId: string,
    programme?: ProgrammeResponse,
    sector?: SectorResponse
}

export interface ProgrammeMembershipResponse {
    id: string,
    dbCreatedAt: Date,
    dbUpdatedAt: Date,
    dbDeletedAt?: Date,
    deeplinkEnabled: boolean,
    membershipStatus: MembershipStatus,
    kpi?: ProgrammeKPI,
    commissionRange: [CommissionGroupRange],
    accountId: string,
    accountAwid: number,
    programmeId: string,
    programmeAwid: number
}