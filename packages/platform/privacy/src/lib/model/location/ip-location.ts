import { ZWPIANATimezone, ZWPIANATimezoneCity, ZWPIANATimezoneISO3166Alpha2CountryMap, ZWPISO3166Alpha2, Nullable } from "@zwp/platform.common"
import { IPInfoResponse } from "../ipinfo"

export interface ZWPIPLocation {
    ip: Nullable<string>
    hostname: Nullable<string>
    city: Nullable<string>
    region: Nullable<string>
    country: Nullable<ZWPISO3166Alpha2>
    latitude: Nullable<number>
    longitude: Nullable<number>
    org: Nullable<string>
    postCode: Nullable<string>
    timezone: Nullable<string>
}

export const parseIPInfoResponse = (response: IPInfoResponse): ZWPIPLocation => ({
    ip: response.ip,
    hostname: response.hostname,
    city: response.city,
    region: response.region,
    country: ZWPISO3166Alpha2[response.country as keyof typeof ZWPISO3166Alpha2] ?? null,
    // country: ZWPISO3166Alpha2.NZ,
    latitude: response.loc?.split(',')[0] as unknown as number,
    longitude: response.loc?.split(',')[1] as unknown as number,
    org: response.org,
    postCode: response.postal,
    timezone: response.timezone
})

export const parseIntlTimezone = (response: ZWPIANATimezone): ZWPIPLocation => ({
    ip: null,
    hostname: null,
    city: ZWPIANATimezoneCity(response),
    region: null,
    country: ZWPIANATimezoneISO3166Alpha2CountryMap[response],
    latitude: null,
    longitude: null,
    org: null,
    postCode: null,
    timezone: response
})