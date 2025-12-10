import { Undefinable } from "@zwp/platform.common"

export interface ZWPCookieStoreDeleteOptions {
    name: string
    domain: Undefinable<string>
    path: Undefinable<string>
}