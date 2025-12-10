import { Injectable, inject } from '@angular/core'
import { AuditEventResponse, HTTPMethod, ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, PaginatedResponse, serialisePaginatedQueryParams } from '@zwp/platform.common'
import { EnduserAPIService } from '../abstract'
import { Observable } from 'rxjs'
import { PlatformAuth } from '@zwp/platform.auth'
import { Model } from '../../model'
import { CDP_USERS_API_BASE_URL, CDP_USERS_API_CONFIG } from '../../config'
import { APIRoutes } from '../../api-routes'
import { EnduserFacade, EnduserSessionFacade } from '../../+state/facades'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'EnduserLiveAPIService', options: { skipMethodDebugger: true } })
export class EnduserLiveAPIService extends PlatformAuth.AuthedAPIService implements EnduserAPIService {
    private config = inject(CDP_USERS_API_CONFIG)
    private baseUrl = inject(CDP_USERS_API_BASE_URL)
    private enduserFacade = inject(EnduserFacade)
    private enduserSessionFacade = inject(EnduserSessionFacade)

    createEnduser(request: Model.CreateEnduserRequest): Observable<Model.EnduserResponse> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).createEnduser()
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.POST, path, request, this.auth.addDeviceIdHeader())
    }

    getEnduser(enduserId: string): Observable<Model.EnduserResponse> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).getEnduser(enduserId)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.GET, path, null, this.auth.addDeviceIdHeader())
    }

    listEndusers(pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserResponse>>>): Observable<PaginatedResponse<Model.EnduserResponse>> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).listEndusers()
        const params = serialisePaginatedQueryParams(pagination, this.enduserFacade.enduserRemotePagination$)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.GET, path, null, this.auth.addDeviceIdHeader(), params)
    }

    updateEnduser(enduserId: string, request: Model.UpdateEnduserRequest): Observable<Model.EnduserResponse> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).updateEnduser(enduserId)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.PATCH, path, request, this.auth.addDeviceIdHeader())
    }

    deleteEnduser(enduserId: string): Observable<void> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).deleteEnduser(enduserId)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.DELETE, path, null, this.auth.addDeviceIdHeader())
    }

    loginEnduserEmailPassword(request: Model.LoginEnduserEmailPasswordRequest): Observable<PlatformAuth.Model.AuthedUserResponse<Model.EnduserResponse>> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).authRoutes.login()
        return this.http.unauthedRequest(HTTPMethod.POST, path, request, this.auth.addDeviceIdHeader())
    }

    logoutEnduser(): Observable<void> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).authRoutes.logout()
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.POST, path, null, this.auth.addDeviceIdHeader())
    }

    refreshEnduserToken(request: Model.RefreshEnduserTokenRequest): Observable<PlatformAuth.Model.AuthedUserResponse<Model.EnduserResponse>> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).authRoutes.refreshToken()
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.POST, path, request, this.auth.addDeviceIdHeader())
    }

    createEnduserAddress(enduserId: string, request: Model.CreateEnduserAddressRequest): Observable<Model.EnduserAddressResponse> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).addressRoutesForEnduser(enduserId).createAddress()
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.POST, path, request, this.auth.addDeviceIdHeader())
    }

    getEnduserAddress(addressId: string): Observable<Model.EnduserAddressResponse> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).addressRoutes.getAddress(addressId)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.GET, path, null, this.auth.addDeviceIdHeader())
    }

    listEnduserAddresses(enduserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserAddressResponse>>>): Observable<PaginatedResponse<Model.EnduserAddressResponse>> {
        const path = enduserId ? APIRoutes.enduserRoutes(this.baseUrl).addressRoutesForEnduser(enduserId).listAddresses() : APIRoutes.enduserRoutes(this.baseUrl).addressRoutes.listAddresses()
        const params = serialisePaginatedQueryParams(pagination)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.GET, path, null, this.auth.addDeviceIdHeader(), params)
    }

    updateEnduserAddress(addressId: string, request: Model.UpdateEnduserAddressRequest): Observable<Model.EnduserAddressResponse> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).addressRoutes.updateAddress(addressId)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.PATCH, path, request, this.auth.addDeviceIdHeader())
    }

    deleteEnduserAddress(addressId: string): Observable<void> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).addressRoutes.deleteAddress(addressId)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.DELETE, path, null, this.auth.addDeviceIdHeader())
    }

    createEnduserEmail(enduserId: string, request: Model.CreateEnduserEmailRequest): Observable<Model.EnduserEmailResponse> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).emailRoutesForEnduser(enduserId).createEmail()
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.POST, path, request, this.auth.addDeviceIdHeader())
    }

    getEnduserEmail(emailId: string): Observable<Model.EnduserEmailResponse> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).emailRoutes.getEmail(emailId)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.GET, path, null, this.auth.addDeviceIdHeader())
    }

    listEnduserEmails(enduserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserEmailResponse>>>): Observable<PaginatedResponse<Model.EnduserEmailResponse>> {
        const path = enduserId ? APIRoutes.enduserRoutes(this.baseUrl).emailRoutesForEnduser(enduserId).listEmails() : APIRoutes.enduserRoutes(this.baseUrl).emailRoutes.listEmails()
        const params = serialisePaginatedQueryParams(pagination)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.GET, path, null, this.auth.addDeviceIdHeader(), params)
    }

    updateEnduserEmail(emailId: string, request: Model.UpdateEnduserEmailRequest): Observable<Model.EnduserEmailResponse> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).emailRoutes.updateEmail(emailId)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.PATCH, path, request, this.auth.addDeviceIdHeader())
    }

    deleteEnduserEmail(emailId: string): Observable<void> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).emailRoutes.deleteEmail(emailId)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.DELETE, path, null, this.auth.addDeviceIdHeader())
    }

    createEnduserCredential(enduserId: string, request: Model.CreateEnduserCredentialRequest): Observable<Model.EnduserCredentialResponse> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).credentialRoutesForEnduser(enduserId).createCredential()
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.POST, path, request, this.auth.addDeviceIdHeader())
    }

    getEnduserCredential(credentialId: string): Observable<Model.EnduserCredentialResponse> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).credentialRoutes.getCredential(credentialId)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.GET, path, null, this.auth.addDeviceIdHeader())
    }

    listEnduserCredentials(enduserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserCredentialResponse>>>): Observable<PaginatedResponse<Model.EnduserCredentialResponse>> {
        const path = enduserId ? APIRoutes.enduserRoutes(this.baseUrl).credentialRoutesForEnduser(enduserId).listCredentials() : APIRoutes.enduserRoutes(this.baseUrl).credentialRoutes.listCredentials()
        const params = serialisePaginatedQueryParams(pagination)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.GET, path, null, this.auth.addDeviceIdHeader(), params)
    }

    updateEnduserCredential(credentialId: string, request: Model.UpdateEnduserCredentialRequest): Observable<Model.EnduserCredentialResponse> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).credentialRoutes.updateCredential(credentialId)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.PATCH, path, request, this.auth.addDeviceIdHeader())
    }

    deleteEnduserCredential(credentialId: string): Observable<void> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).credentialRoutes.deleteCredential(credentialId)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.DELETE, path, null, this.auth.addDeviceIdHeader())
    }

    createEnduserPhone(enduserId: string, request: Model.CreateEnduserPhoneRequest): Observable<Model.EnduserPhoneResponse> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).phoneRoutesForEnduser(enduserId).createPhone()
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.POST, path, request, this.auth.addDeviceIdHeader())
    }

    getEnduserPhone(phoneId: string): Observable<Model.EnduserPhoneResponse> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).phoneRoutes.getPhone(phoneId)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.GET, path, null, this.auth.addDeviceIdHeader())
    }

    listEnduserPhones(enduserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserPhoneResponse>>>): Observable<PaginatedResponse<Model.EnduserPhoneResponse>> {
        const path = enduserId ? APIRoutes.enduserRoutes(this.baseUrl).phoneRoutesForEnduser(enduserId).listPhones() : APIRoutes.enduserRoutes(this.baseUrl).phoneRoutes.listPhones()
        const params = serialisePaginatedQueryParams(pagination)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.GET, path, null, this.auth.addDeviceIdHeader(), params)
    }

    updateEnduserPhone(phoneId: string, request: Model.UpdateEnduserPhoneRequest): Observable<Model.EnduserPhoneResponse> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).phoneRoutes.updatePhone(phoneId)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.PATCH, path, request, this.auth.addDeviceIdHeader())
    }

    deleteEnduserPhone(phoneId: string): Observable<void> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).phoneRoutes.deletePhone(phoneId)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.DELETE, path, null, this.auth.addDeviceIdHeader())
    }

    getEnduserDevice(deviceId: string): Observable<Model.EnduserDeviceResponse> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).deviceRoutes.getDevice(deviceId)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.GET, path, null, this.auth.addDeviceIdHeader())
    }

    listEnduserDevices(enduserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserDeviceResponse>>>): Observable<PaginatedResponse<Model.EnduserDeviceResponse>> {
        const path = enduserId ? APIRoutes.enduserRoutes(this.baseUrl).deviceRoutesForEnduser(enduserId).listDevices() : APIRoutes.enduserRoutes(this.baseUrl).deviceRoutes.listDevices()
        const params = serialisePaginatedQueryParams(pagination)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.GET, path, null, this.auth.addDeviceIdHeader(), params)
    }

    listEnduserActivity(enduserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<AuditEventResponse>>>): Observable<PaginatedResponse<AuditEventResponse>> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).activityRoutesForEnduser(enduserId ?? "").listActivity()
        const params = serialisePaginatedQueryParams(pagination)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.GET, path, null, this.auth.addDeviceIdHeader(), params)
    }

    getEnduserSession(enduserSessionId: string): Observable<Model.EnduserSessionResponse> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).sessionRoutes.getSession(enduserSessionId)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.GET, path, null, this.auth.addDeviceIdHeader())
    }

    listEnduserSessions(enduserId: string, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserSessionResponse>>>): Observable<PaginatedResponse<Model.EnduserSessionResponse>> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).sessionRoutesForEnduser(enduserId).listSessions()
        const params = serialisePaginatedQueryParams(pagination, this.enduserSessionFacade.enduserSessionRemotePagination$)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.GET, path, null, this.auth.addDeviceIdHeader(), params)
    }

    invalidateEnduserSession(sessionId: string): Observable<Model.EnduserSessionResponse> {
        const path = APIRoutes.enduserRoutes(this.baseUrl).sessionRoutes.invalidateSession(sessionId)
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.POST, path, null, this.auth.addDeviceIdHeader())
    }
}