import { Undefinable } from "@zwp/platform.common"
import { ZWPCookieSameSite } from "./cookie.same-site"

export interface ZWPCookie {
    name: string
    value: string
    domain: Undefinable<string>
    expires: Undefinable<number>
    path: Undefinable<string>
    secure: Undefinable<boolean>
    sameSite: Undefinable<ZWPCookieSameSite>
}