import { Nullable, Undefinable } from "@zwp/platform.common"
import { ZWPCookieSameSite } from "./cookie.same-site"

export interface ZWPCookieListItem {
    name: Undefinable<string>
    value: Undefinable<string>
    domain: Nullable<string>
    path: Undefinable<string>
    expires: Nullable<Date | number>
    secure: Undefinable<boolean>
    sameSite: Undefinable<ZWPCookieSameSite>
}