import { isUndefined } from "@zwp/platform.common";
import { ZWPCookie, ZWPCookieParseOptions } from "../model";

function tryDecode(
    str: string,
    decode: ((encodedURIComponent: string) => string) | boolean
  ): string {
    try {
      return typeof decode === 'boolean' ? decodeURIComponent(str) : decode(str);
    } catch (e) {
      return str;
    }
  }

export const parseCookies = (str: string, options: ZWPCookieParseOptions = { decode: undefined }): ZWPCookie[] => {
    if (typeof str !== 'string') { throw new TypeError('argument str must be a string') }

    const obj: any[] = []
    const opt = options || {}
    const pairs = str.split(/; */)
    const dec = opt.decode || decodeURIComponent

    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i]
        let eqIdx = pair.indexOf('=')

        if (eqIdx < 0) { continue }

        const key = pair.substring(0, eqIdx).trim()
        let val = pair.substring(++eqIdx, pair.length).trim()
        if ('"' === val[0]) { val = val.slice(1, -1) }

        if (isUndefined(obj[key as keyof typeof obj])) {
            obj.push({ name: key, value: tryDecode(val, dec) })
        }
    }

    return obj
}