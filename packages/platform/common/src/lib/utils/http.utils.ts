import { HttpHeaders, HttpParameterCodec, HttpParams } from '@angular/common/http'
import { HTTPHeaderOptions, HTTPMediaType, HTTPMediaTypeKey, ZWPExpandedURL, Nullable, Undefinable } from '../model'
import { HTTPMediaTypes } from '../model/networking/constants'
import { isUndefined } from './optional.utils'
import { coerceBoolean, coerceString, propertyOrNull, tryBoolean, tryNumber, tryPrimitive, tryString } from './primitive-type.utils'
import { InjectionToken } from '@angular/core'

export class ZWPHTTPURLEncodingCodec implements HttpParameterCodec {
    encodeKey(key: string): string { return encodeURIComponent(key) }
    encodeValue(value: string): string { return encodeURIComponent(value) }
    decodeKey(key: string): string { return decodeURIComponent(key) }
    decodeValue(value: string): string { return decodeURIComponent(value) }
}

export const getURLParam = (urlToCheck: string, name: string): string => {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
    const regex = new RegExp('[\\?&#]' + name + '=([^&#]*)')
    const results = regex.exec(urlToCheck)
    return results === null ? '' : decodeURIComponent(results[1])
}

export const getParamFromFlexibleHTTPParams = <V = string | number | boolean>(params: Undefinable<HttpParams | Map<string, string | number | boolean> | Record<string, string | number | boolean> | string> = undefined, name: string, fallback: V): Nullable<V> => {
    if (isUndefined(params)) { return null }
    if (params instanceof HttpParams) { return tryPrimitive(params.get(name), fallback) }
    if (params instanceof Map) { return tryPrimitive(params.get(name), fallback) }
    if (typeof params === 'object') { return tryPrimitive(params[name], fallback) }
    if (typeof params === 'string') { return tryPrimitive(getURLParam(params, name), fallback) }
    return null
}


export const expandURLWithFlexibleHTTPParams = (url: string): ZWPExpandedURL => {
    const urlParts = url.split('?')

    const params = new HttpParams({ fromString: urlParts.length > 0 ? urlParts[1] : '', encoder: new ZWPHTTPURLEncodingCodec() })
    const paramsObject: Record<string, string | number | boolean> = {}
    params.keys().forEach(key => paramsObject[key] = params.get(key) ?? '')
    return { url: urlParts[0], params: paramsObject }
}


export const createHTTPParams = (existing: Undefinable<HttpParams | Map<string, string | number | boolean> | Record<string, string | number | boolean> | string> = undefined): HttpParams => {
    if (isUndefined(existing)) { return new HttpParams({encoder: new ZWPHTTPURLEncodingCodec()}) }
    if (existing instanceof HttpParams) { return new HttpParams({ fromString: existing.toString(), encoder: new ZWPHTTPURLEncodingCodec() }) }
    if (existing instanceof Map) { return new HttpParams({ fromObject: Object.fromEntries(existing), encoder: new ZWPHTTPURLEncodingCodec() }) }
    if (typeof existing === 'object') { return new HttpParams({ fromObject: existing, encoder: new ZWPHTTPURLEncodingCodec() }) }
    if (typeof existing === 'string') { return new HttpParams({ fromString: existing, encoder: new ZWPHTTPURLEncodingCodec() }) }
    return new HttpParams({encoder: new ZWPHTTPURLEncodingCodec()})
}

export const upsertHTTPParam = (existing: HttpParams, key: string, value: string | number | boolean): HttpParams => {
    if (existing.has(key)) { return existing.delete(key).append(key, value) }
    return existing.append(key, value)
}

export const upsertHTTPParamToExisting = (existing: HttpParams, key: string, value: string | number | boolean) => {
    if (existing.has(key)) { existing = existing.delete(key) }
    existing = existing.append(key, value)
}

export const upsertHTTPParams = (existing: HttpParams, params: Undefinable<HttpParams | Map<string, string | number | boolean> | Record<string, string | number | boolean> | string>): HttpParams => {
    if (isUndefined(params)) { return existing }
    if (params instanceof HttpParams) { 
        params.keys().forEach(key => {
            if (existing.has(key)) { existing = existing.delete(key) }
            existing = existing.append(key, params.get(key) ?? '')
        })
        return existing
    }
    if (params instanceof Map) { 
        params.forEach((value, key) => {
            if (existing.has(key)) { existing = existing.delete(key) }
            existing = existing.append(key, value)
        })
        return existing
    }
    if (typeof params === 'string') {
        const paramsObject = new HttpParams({ fromString: params, encoder: new ZWPHTTPURLEncodingCodec() })
        paramsObject.keys().forEach(key => {
            if (existing.has(key)) { existing = existing.delete(key) }
            existing = existing.append(key, paramsObject.get(key) ?? '')
        })
        return existing
    }
    if (typeof params === 'object') { 
        Object.keys(params).forEach(key => {
            if (existing.has(key)) { existing = existing.delete(key) }
            existing = existing.append(key, params[key])
        })
        return existing
    }
    return existing
}

export const getHTTPMediaType = (key: HTTPMediaTypeKey): HTTPMediaType => {
    return HTTPMediaTypes[key]
}

export const httpMediaTypeHeader = (key: HTTPMediaTypeKey): string => {
    const mediaType = getHTTPMediaType(key)
    let str = mediaType.type + '/' + mediaType.subtype
    if (isUndefined(mediaType.parameters) || Object.keys(mediaType.parameters).length < 1) { return str }
    Object.entries(mediaType.parameters).forEach(param => {
        str = str.concat('; ', param[0], '=', param[1])
    })
    return str
}

export type HTTPHeaderFactory = (options?: Partial<HTTPHeaderOptions>) => HttpHeaders

export const makeHTTPHeaders = (options: Undefinable<Partial<HTTPHeaderOptions>> = undefined): HttpHeaders => {
    let headers = new HttpHeaders()
    
    // headers = headers.set('Content-Security-Policy', "script-src https: 'unsafe-inline' 'unsafe-eval';style-src https: 'unsafe-inline' 'unsafe-eval';img-src https: data:;font-src https: data:;")
    if (isUndefined(options)) { 
        headers = headers.set('Accept', 'application/json')
        // headers = headers.set('Content-Type', 'application/json')
        return headers
     }
    if (!isUndefined(options.bearerToken)) { headers = headers.set('Authorization', 'Bearer ' + decodeURIComponent(options.bearerToken))}
    headers = headers.set('Accept', httpMediaTypeHeader(isUndefined(options.accept) ? 'json' : options.accept))
    headers = headers.set('Content-Type', httpMediaTypeHeader(isUndefined(options.contentType) ? 'json' : options.contentType))
    return headers
}

export enum GlobalAPILocation {
    LOCAL = 'local',
    REMOTE = 'remote'
}

export enum ModuleAPIState {
    LIVE = 'live',
    MOCK = 'mock'
}

export interface BaseModuleAPIConfig {
    remoteBaseUrl: string
    localBaseUrl: string
    apiState: ModuleAPIState
}

export const GLOBAL_API_LOCATION = new InjectionToken<GlobalAPILocation>('zwp.http.global-api-location')