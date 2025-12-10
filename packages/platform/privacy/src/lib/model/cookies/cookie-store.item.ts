import { ZWPCookieCategory } from "./cookie.category"
import { ZWPCookieStatus } from "./cookie.status"

export interface ZWPCookieStoreItem {
    id: string
    name: string
    // lastValue: Nullable<string>
    category: ZWPCookieCategory
    description: string
    status: ZWPCookieStatus
}