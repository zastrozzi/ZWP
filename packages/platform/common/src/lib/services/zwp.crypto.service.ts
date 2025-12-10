import { DOCUMENT } from '@angular/common'
import { inject, Injectable } from '@angular/core'
import { from, map, Observable } from 'rxjs'
import { Nullable } from '../model'
import { isNil, isNull, isObjectWithProperty, isUndefined } from '../utils'
import { ZWPDebuggableInjectable } from '../decorators/zwp.debuggable.decorator'
import { ZWPLoggingService, ZWP_LOGGING_SERVICE } from './zwp.logging.service'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({serviceName: 'ZWPCryptoService', options: { skipMethodDebugger: true }})
export class ZWPCryptoService {
    private readonly document: Document = inject(DOCUMENT)
    private readonly loggingService: ZWPLoggingService = inject(ZWP_LOGGING_SERVICE)

    constructor() {
        // super('ZWPCryptoService', { skipMethodDebugger: true })
    }

    

    verifyKey(algorithm: AlgorithmIdentifier | RsaPssParams | EcdsaParams, key: CryptoKey, signature: BufferSource, signingInput: string): Promise<boolean> {
        return this.crypto.subtle.verify(algorithm, key, signature, new TextEncoder().encode(signingInput))
    }

    generateJWTCodeChallenge(codeVerifier: string): Observable<string> {
        return this.calculateHash('SHA-256', codeVerifier).pipe(
            map((codeChallenge) => this.base64UrlEncode(codeChallenge))
        )
    }

    generateJWTHash(algorithm: string, jwt: string): Observable<string> {
        return this.calculateHash(algorithm, jwt).pipe(
            map((tokenHash) => this.base64UrlEncode(tokenHash.substring(0, tokenHash.length / 2)))
        )
    }

    inferJWKVerificationAlgorithm(algorithm: string): Nullable<RsaHashedImportParams | EcdsaParams> {
        switch (algorithm.charAt(0)) {
            case 'R': return { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }
            case 'E': 
                if (algorithm.includes('256')) { return { name: 'ECDSA', hash: 'SHA-256' } }
                if (algorithm.includes('384')) { return { name: 'ECDSA', hash: 'SHA-384' } }
                return null
            default: return null
        }
    }

    inferKeyType(algorithm: string): string {
        switch (algorithm.charAt(0)) {
            case 'R': return 'RSA'
            case 'E': return 'EC'
            default: throw new Error(`Unable to infer key type from algorithm: ${algorithm}`)
        }
    }

    inferJWKImportAlgorithm(algorithm: string): Nullable<RsaHashedImportParams | EcKeyImportParams> {
        switch (algorithm.charAt(0)) {
            case 'R': 
                if (algorithm.includes('256')) { return { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' } }
                if (algorithm.includes('384')) { return { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-384' } }
                if (algorithm.includes('512')) { return { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-512' } }
                return null
            case 'E':
                if (algorithm.includes('256')) { return { name: 'ECDSA', namedCurve: 'P-256' } }
                if (algorithm.includes('384')) { return { name: 'ECDSA', namedCurve: 'P-384' } }
                return null
            default: return null
        }
    }

    extractJWK(keys: JsonWebKey[], spec?: { kid?: string; use?: string; kty?: string}, throwOnEmpty = true): JsonWebKey[] {
        if (keys.length === 0) { throw new Error('No keys provided to JWK Extractor') }
        const found = keys
            .filter(k => !isUndefined(spec) && !isUndefined(spec.kid) ? isObjectWithProperty(k, 'kid') ? k['kid'] === spec.kid : false : true)
            .filter(k => !isUndefined(spec) && !isUndefined(spec.use) ? isObjectWithProperty(k, 'use') ? k['use'] === spec.use : false : true)
            .filter(k => !isUndefined(spec) && !isUndefined(spec.kty) ? isObjectWithProperty(k, 'kty') ? k['kty'] === spec.kty : false : true)

        if (found.length === 0 && throwOnEmpty) { throw new Error('No keys found by JWK Extractor') }
        if (found.length > 1 && isNil(spec)) { throw new Error('Multiple keys found by JWK Extractor. Use spec to filter') }
        return found
    }

    importJWKVerificationKey(algorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm, jwk: JsonWebKey): Promise<CryptoKey> {
        return this.crypto.subtle.importKey('jwk', jwk, algorithm, false, ['verify'])
    }

    generateNonce(length: number = 40): string {
        if (length <= 0) { 
            this.loggingService.warn('[CryptoService] [generateNonce] Length must be greater than 0. Returning empty string')
            return '' 
        }
        if (length > 0 && length < 7) {
            this.loggingService.warn(`[CryptoService] [generateNonce] Called with length ${length}. Length must be greater than 7. Returning 10 chars`)
            length = 10
        }
        const randomValues = new Uint8Array(Math.floor((length - 6) / 2))
        this.crypto.getRandomValues(randomValues)
        return Array.from(randomValues, (dec) => ('0' + dec.toString(16)).substring(-2)).join('') + this.generateRandomString(7)
    }

    private calculateHash(algorithm: AlgorithmIdentifier = 'SHA-256', data: string): Observable<string> {
        const msgBuffer = new TextEncoder().encode(data)
        return from(this.crypto.subtle.digest(algorithm, msgBuffer)).pipe(
            map((hashBuffer) => this.byteArrayToHashString(Array.from(new Uint8Array(hashBuffer))))
        )
    }

    private byteArrayToHashString(byteArray: number[]): string {
        let result = ''
        for (const byte of byteArray) { result += String.fromCharCode(byte) }
        return result
    }


    private base64UrlEncode(input: string): string {
        const base64: string = this.docWindow.btoa(input)
        return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
    }

    private generateRandomString(length: number): string {
        let result = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const randomValues = new Uint32Array(length)
        this.crypto.getRandomValues(randomValues)
        for (let i = 0; i < length; i++) { result += characters[randomValues[i] % characters.length] }
        return result
    }

    private get crypto(): Crypto {
        return this.docWindow.crypto || (this.docWindow as any).msCrypto
    }

    private get docWindow(): Window {
        if (isNull(this.document.defaultView)) { throw new Error('Unable to access document.defaultView') }
        return this.document.defaultView
    }
}