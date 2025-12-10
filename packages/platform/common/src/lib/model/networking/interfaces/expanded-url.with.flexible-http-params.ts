import { Undefinable } from '../../types'
import { ZWPFlexibleHttpParams } from './flexible.http-params'

export interface ZWPExpandedURL {
    url: string
    params: Undefinable<ZWPFlexibleHttpParams>
}