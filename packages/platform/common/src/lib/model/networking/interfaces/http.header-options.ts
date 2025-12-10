import { HTTPMediaTypeKey } from '../enums'

export interface HTTPHeaderOptions {
    bearerToken: string
    accept: HTTPMediaTypeKey
    contentType: HTTPMediaTypeKey
}