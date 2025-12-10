import { ZWPCookieList } from "./cookie-list"

export interface ZWPCookieChangeEventInit extends EventInit {
    changed: ZWPCookieList
    deleted: ZWPCookieList
}