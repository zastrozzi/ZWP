import { ZWPCookieList } from "./cookie-list"
import { ZWPCookieChangeEventInit } from "./cookie.change-event.init"

export class ZWPCookieChangeEvent extends Event {
    changed: ZWPCookieList
    deleted: ZWPCookieList

    constructor(type: string, eventInitDict: ZWPCookieChangeEventInit = { changed: [], deleted: [] }) {
        super(type, eventInitDict)
        this.changed = eventInitDict.changed || []
        this.deleted = eventInitDict.deleted || []
    }
}