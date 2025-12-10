import { IPInfoBasicResponse } from './ipinfo.basic.response'
import { IPInfoFreeResponse } from './ipinfo.free.response'
import { IPInfoStandardResponse } from './ipinfo.standard.response'

export * from './ipinfo.asn'
export * from './ipinfo.privacy'

export * from './ipinfo.free.response'
export * from './ipinfo.basic.response'
export * from './ipinfo.standard.response'

export type IPInfoResponse = IPInfoFreeResponse | IPInfoBasicResponse | IPInfoStandardResponse