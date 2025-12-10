import { IPInfoASN } from "./ipinfo.asn"
import { IPInfoPrivacy } from "./ipinfo.privacy"

export interface IPInfoStandardResponse {
    ip: string
    hostname: string
    anycast: boolean
    city: string
    region: string
    country: string
    loc: string
    org: string
    postal: string
    timezone: string
    asn: IPInfoASN
    privacy: IPInfoPrivacy
}