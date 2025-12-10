import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import { PlatformAuth } from '@zwp/platform.auth'
import {
    AuditEventResponse,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class EnduserAPIService {
    abstract createEnduser(
        request: Model.CreateEnduserRequest
    ): Observable<Model.EnduserResponse>
    abstract getEnduser(enduserId: string): Observable<Model.EnduserResponse>
    abstract listEndusers(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserResponse>>>
    ): Observable<PaginatedResponse<Model.EnduserResponse>>
    abstract updateEnduser(
        enduserId: string,
        request: Model.UpdateEnduserRequest
    ): Observable<Model.EnduserResponse>
    abstract deleteEnduser(enduserId: string): Observable<void>

    abstract loginEnduserEmailPassword(
        request: Model.LoginEnduserEmailPasswordRequest
    ): Observable<PlatformAuth.Model.AuthedUserResponse<Model.EnduserResponse>>
    abstract logoutEnduser(): Observable<void>
    abstract refreshEnduserToken(
        request: Model.RefreshEnduserTokenRequest
    ): Observable<PlatformAuth.Model.AuthedUserResponse<Model.EnduserResponse>>

    abstract createEnduserAddress(
        enduserId: string,
        request: Model.CreateEnduserAddressRequest
    ): Observable<Model.EnduserAddressResponse>
    abstract getEnduserAddress(
        addressId: string
    ): Observable<Model.EnduserAddressResponse>
    abstract listEnduserAddresses(
        enduserId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserAddressResponse>>>
    ): Observable<PaginatedResponse<Model.EnduserAddressResponse>>
    abstract updateEnduserAddress(
        addressId: string,
        request: Model.UpdateEnduserAddressRequest
    ): Observable<Model.EnduserAddressResponse>
    abstract deleteEnduserAddress(addressId: string): Observable<void>

    abstract createEnduserEmail(
        enduserId: string,
        request: Model.CreateEnduserEmailRequest
    ): Observable<Model.EnduserEmailResponse>
    abstract getEnduserEmail(
        emailId: string
    ): Observable<Model.EnduserEmailResponse>
    abstract listEnduserEmails(
        enduserId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserEmailResponse>>>
    ): Observable<PaginatedResponse<Model.EnduserEmailResponse>>
    abstract updateEnduserEmail(
        emailId: string,
        request: Model.UpdateEnduserEmailRequest
    ): Observable<Model.EnduserEmailResponse>
    abstract deleteEnduserEmail(emailId: string): Observable<void>

    abstract createEnduserCredential(
        enduserId: string,
        request: Model.CreateEnduserCredentialRequest
    ): Observable<Model.EnduserCredentialResponse>
    abstract getEnduserCredential(
        credentialId: string
    ): Observable<Model.EnduserCredentialResponse>
    abstract listEnduserCredentials(
        enduserId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserCredentialResponse>>>
    ): Observable<PaginatedResponse<Model.EnduserCredentialResponse>>
    abstract updateEnduserCredential(
        credentialId: string,
        request: Model.UpdateEnduserCredentialRequest
    ): Observable<Model.EnduserCredentialResponse>
    abstract deleteEnduserCredential(credentialId: string): Observable<void>

    abstract createEnduserPhone(
        enduserId: string,
        request: Model.CreateEnduserPhoneRequest
    ): Observable<Model.EnduserPhoneResponse>
    abstract getEnduserPhone(
        phoneId: string
    ): Observable<Model.EnduserPhoneResponse>
    abstract listEnduserPhones(
        enduserId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserPhoneResponse>>>
    ): Observable<PaginatedResponse<Model.EnduserPhoneResponse>>
    abstract updateEnduserPhone(
        phoneId: string,
        request: Model.UpdateEnduserPhoneRequest
    ): Observable<Model.EnduserPhoneResponse>
    abstract deleteEnduserPhone(phoneId: string): Observable<void>

    abstract getEnduserDevice(
        deviceId: string
    ): Observable<Model.EnduserDeviceResponse>
    abstract listEnduserDevices(
        enduserId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserDeviceResponse>>>
    ): Observable<PaginatedResponse<Model.EnduserDeviceResponse>>

    abstract listEnduserActivity(
        enduserId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<AuditEventResponse>>>
    ): Observable<PaginatedResponse<AuditEventResponse>>

    abstract getEnduserSession(
        sessionId: string
    ): Observable<Model.EnduserSessionResponse>

    abstract listEnduserSessions(
        enduserId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserSessionResponse>>>
    ): Observable<PaginatedResponse<Model.EnduserSessionResponse>>
    
    abstract invalidateEnduserSession(
        sessionId: string
    ): Observable<Model.EnduserSessionResponse>
}

export const ENDUSER_API_SERVICE = new InjectionToken<EnduserAPIService>(
    'cdp.enduser.api-service'
)
