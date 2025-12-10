import { IPInfoASN } from "./ipinfo.asn"

export interface IPInfoBasicResponse {
    ip: string
    hostname: string
    city: string
    region: string
    country: string
    loc: string
    org: string
    postal: string
    timezone: string
    asn: IPInfoASN
}