import { ZWP_JWT_PARTS } from '../model'
import { isUndefined } from './optional.utils'
import { isObject, isObjectWithProperty, isString } from './primitive-type.utils'

export const getJWTExpirationDate = (dataIdToken: any): Date => {
    if (!isObject(dataIdToken) && !isObjectWithProperty(dataIdToken, 'exp')) { return new Date(new Date().toUTCString()) }
    const date = new Date(0)
    date.setUTCSeconds(dataIdToken.exp)
    return date
}

export const getSigningInputFromJWT = (token: any, encoded: boolean): string => {
    if (!jwtIsValid(token)) { return '' }

    const header: string = getHeaderFromJWT(token, encoded)
    const payload: string = getPayloadFromJWT(token, encoded)
    return `${header}.${payload}`
}

export const getHeaderFromJWT = (token: any, encoded: boolean): any => {
    if (!jwtIsValid(token)) { return {} }
    return getJWTPart(token, 0, encoded)
}

export const getPayloadFromJWT = (token: any, encoded: boolean): any => {
    
    if (!jwtIsValid(token)) { return {} }
    return getJWTPart(token, 1, encoded)
}

export const getSignatureFromJWT = (token: any, encoded: boolean): any => {
    if (!jwtIsValid(token)) { return {} }
    return getJWTPart(token, 2, encoded)
}

export const getJWTPart = (token: string, part: number, encoded: boolean): any => {
    const partOfToken = extractJWTPart(token, part)
    if (encoded) { return partOfToken }
    const parsed = JSON.parse(jwtBase64UrlDecode(partOfToken))
    return parsed
}

export const jwtBase64UrlDecode = (token: string): string => {
    let output = token.replace(/-/g, '+').replace(/_/g, '/')
    switch (output.length % 4) {
        case 0: break;
        case 2: output += '=='; break;
        case 3: output += '='; break;
        default: throw new Error('Illegal Base64URL string')
    }

    const decoded = window.atob(output)
    try {
        return decodeURIComponent(decoded.split('').map((c) => { return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2) }).join(''))
    } catch (err) {
        return decoded
    }
}

export const jwtIsValid = (token: string): boolean => {
    if (isUndefined(token) || !isString(token)) { return false }
    if (!token.includes('.')) { return false }
    const tokenParts = token.split('.')
    if (tokenParts.length !== ZWP_JWT_PARTS) { return false }
    return true
}

export const extractJWTPart = (token: string, part: number): string => {
    if (!jwtIsValid(token)) { return '' }
    const tokenParts = token.split('.')
    return tokenParts[part]
}