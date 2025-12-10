import { Injectable, inject } from "@angular/core";
import { AuditEventResponse, createHTTPParams, HTTPMethod, ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, PaginatedResponse, serialiseDateQueryFilter, serialiseEnumQueryFilter, serialisePaginatedQueryParams, serialiseStringQueryFilter, upsertHTTPParam, upsertHTTPParams } from "@zwp/platform.common";
import { AdminUserAPIService } from "../abstract";
import { map, Observable, take } from "rxjs";
import { Model } from "../../model";
import { PlatformAuth } from "@zwp/platform.auth";
import { CDP_USERS_API_BASE_URL, CDP_USERS_API_CONFIG } from "../../config";
import { APIRoutes } from "../../api-routes";
import { AdminUserActivityFacade, AdminUserCredentialFacade, AdminUserDeviceFacade, AdminUserEmailFacade, AdminUserFacade, AdminUserSessionFacade } from "../../+state/facades";

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'AdminUserLiveAPIService', options: { skipMethodDebugger: true } })
export class AdminUserLiveAPIService extends PlatformAuth.AuthedAPIService implements AdminUserAPIService {

    private config = inject(CDP_USERS_API_CONFIG)
    private baseUrl = inject(CDP_USERS_API_BASE_URL)
    private adminUserFacade = inject(AdminUserFacade)
    private adminUserActivityFacade = inject(AdminUserActivityFacade)
    private adminUserCredentialFacade = inject(AdminUserCredentialFacade)
    private adminUserDeviceFacade = inject(AdminUserDeviceFacade)
    private adminUserEmailFacade = inject(AdminUserEmailFacade)
    private adminUserSessionFacade = inject(AdminUserSessionFacade)


    createAdminUser(request: Model.CreateAdminUserRequest): Observable<Model.AdminUserResponse> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).createAdminUser()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    getAdminUser(adminUserId: string): Observable<Model.AdminUserResponse> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).getAdminUser(adminUserId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    listAdminUsers(pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserResponse>>>): Observable<PaginatedResponse<Model.AdminUserResponse>> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).listAdminUsers()
        let params = serialisePaginatedQueryParams(pagination, this.adminUserFacade.adminUserRemotePagination$)
        this.adminUserFacade.adminUserFilters$.pipe(
            take(1),
            map((filters) => {
                if (filters.dbCreatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt)) }
                if (filters.dbUpdatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt)) }
                if (filters.dbDeletedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_deleted_at', filters.dbDeletedAt)) }
                if (filters.firstName) { params = upsertHTTPParams(params, serialiseStringQueryFilter('first_name', filters.firstName)) }
                if (filters.lastName) { params = upsertHTTPParams(params, serialiseStringQueryFilter('last_name', filters.lastName)) }
                if (filters.role) { params = upsertHTTPParams(params, serialiseStringQueryFilter('role', filters.role)) }
            })
        ).subscribe().unsubscribe()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params,
        })
    }

    updateAdminUser(adminUserId: string, request: Model.UpdateAdminUserRequest): Observable<Model.AdminUserResponse> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).updateAdminUser(adminUserId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    deleteAdminUser(adminUserId: string): Observable<void> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).deleteAdminUser(adminUserId)
        const params = createHTTPParams()
        // if (force) { params = upsertHTTPParam(params, 'force', force) }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params
        })
    }

    loginAdminUserEmailPassword(request: Model.LoginAdminUserEmailPasswordRequest): Observable<PlatformAuth.Model.AuthedUserResponse<Model.AdminUserResponse>> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).authRoutes.login()
        return this.http.unauthedRequest(HTTPMethod.POST, path, request, this.auth.addDeviceIdHeader())
    }

    logoutAdminUser(): Observable<void> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).authRoutes.logout()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    refreshAdminUserToken(request: Model.RefreshAdminUserTokenRequest): Observable<PlatformAuth.Model.AuthedUserResponse<Model.AdminUserResponse>> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).authRoutes.refreshToken()
        return this.http.unauthedRequest(HTTPMethod.POST, path, request, this.auth.addDeviceIdHeader())
    }

    createAdminUserEmail(adminUserId: string, request: Model.CreateAdminUserEmailRequest): Observable<Model.AdminUserEmailResponse> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).emailRoutesForAdminUser(adminUserId).createEmail()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    getAdminUserEmail(emailId: string): Observable<Model.AdminUserEmailResponse> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).emailRoutes.getEmail(emailId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    listAdminUserEmails(adminUserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserEmailResponse>>>): Observable<PaginatedResponse<Model.AdminUserEmailResponse>> {
        const path = adminUserId
            ? APIRoutes.adminUserRoutes(this.baseUrl).emailRoutesForAdminUser(adminUserId).listEmails()
            : APIRoutes.adminUserRoutes(this.baseUrl).emailRoutes.listEmails()
        let params = serialisePaginatedQueryParams(pagination, this.adminUserEmailFacade.adminUserEmailRemotePagination$)
        this.adminUserEmailFacade.adminUserEmailFilters$.pipe(
            take(1),
            map((filters) => {
                if (filters.dbCreatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt)) }
                if (filters.dbUpdatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt)) }
                if (filters.dbDeletedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_deleted_at', filters.dbDeletedAt)) }
                if (filters.emailAddressValue) { params = upsertHTTPParams(params, serialiseStringQueryFilter('email_address_value', filters.emailAddressValue)) }
                if (filters.isVerified) { params = upsertHTTPParam(params, 'is_verified', filters.isVerified) }
            })
        ).subscribe().unsubscribe()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params,
        })
    }

    updateAdminUserEmail(emailId: string, request: Model.UpdateAdminUserEmailRequest): Observable<Model.AdminUserEmailResponse> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).emailRoutes.updateEmail(emailId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    deleteAdminUserEmail(emailId: string): Observable<void> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).emailRoutes.deleteEmail(emailId)
        const params = createHTTPParams()
        // if (force) { params = upsertHTTPParam(params, 'force', force) }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params
        })
    }

    createAdminUserCredential(adminUserId: string, request: Model.CreateAdminUserCredentialRequest): Observable<Model.AdminUserCredentialResponse> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).credentialRoutesForAdminUser(adminUserId).createCredential()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    getAdminUserCredential(credentialId: string): Observable<Model.AdminUserCredentialResponse> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).credentialRoutes.getCredential(credentialId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    listAdminUserCredentials(adminUserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserCredentialResponse>>>): Observable<PaginatedResponse<Model.AdminUserCredentialResponse>> {
        const path = adminUserId
            ? APIRoutes.adminUserRoutes(this.baseUrl).credentialRoutesForAdminUser(adminUserId).listCredentials()
            : APIRoutes.adminUserRoutes(this.baseUrl).credentialRoutes.listCredentials()
        let params = serialisePaginatedQueryParams(pagination, this.adminUserCredentialFacade.adminUserCredentialRemotePagination$)
        this.adminUserCredentialFacade.adminUserCredentialFilters$.pipe(
            take(1),
            map((filters) => {
                if (filters.dbCreatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt)) }
                if (filters.dbUpdatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt)) }
                if (filters.dbDeletedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_deleted_at', filters.dbDeletedAt)) }
                if (filters.credentialType) { params = upsertHTTPParams(params, serialiseEnumQueryFilter('credential_type', filters.credentialType)) }
                if (filters.isValid) { params = upsertHTTPParam(params, 'is_valid', filters.isValid) }
            })
        ).subscribe().unsubscribe()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params,
        })
    }

    updateAdminUserCredential(credentialId: string, request: Model.UpdateAdminUserCredentialRequest): Observable<Model.AdminUserCredentialResponse> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).credentialRoutes.updateCredential(credentialId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    deleteAdminUserCredential(credentialId: string): Observable<void> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).credentialRoutes.deleteCredential(credentialId)
        const params = createHTTPParams()
        // if (force) { params = upsertHTTPParam(params, 'force', force) }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params
        })
    }

    getAdminUserDevice(deviceId: string): Observable<Model.AdminUserDeviceResponse> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).deviceRoutes.getDevice(deviceId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    listAdminUserDevices(adminUserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserDeviceResponse>>>): Observable<PaginatedResponse<Model.AdminUserDeviceResponse>> {
        const path = adminUserId
            ? APIRoutes.adminUserRoutes(this.baseUrl).deviceRoutesForAdminUser(adminUserId).listDevices()
            : APIRoutes.adminUserRoutes(this.baseUrl).deviceRoutes.listDevices()
        let params = serialisePaginatedQueryParams(pagination, this.adminUserDeviceFacade.adminUserDeviceRemotePagination$)
        this.adminUserDeviceFacade.adminUserDeviceFilters$.pipe(
            take(1),
            map((filters) => {
                if (filters.dbCreatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt)) }
                if (filters.dbUpdatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt)) }
                if (filters.dbDeletedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_deleted_at', filters.dbDeletedAt)) }
                if (filters.localDeviceIdentifier) { params = upsertHTTPParams(params, serialiseStringQueryFilter('local_device_identifier', filters.localDeviceIdentifier)) }
                if (filters.system) { params = upsertHTTPParams(params, serialiseEnumQueryFilter('system', filters.system)) }
                if (filters.osVersion) { params = upsertHTTPParams(params, serialiseStringQueryFilter('os_version', filters.osVersion)) }
                if (filters.lastSeenAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('last_seen_at', filters.lastSeenAt)) }
                if (filters.userAgent) { params = upsertHTTPParams(params, serialiseStringQueryFilter('user_agent', filters.userAgent)) }
                if (filters.apnsPushToken) { params = upsertHTTPParams(params, serialiseStringQueryFilter('apns_push_token', filters.apnsPushToken)) }
                if (filters.fcmPushToken) { params = upsertHTTPParams(params, serialiseStringQueryFilter('fcm_push_token', filters.fcmPushToken)) }
            })
        ).subscribe().unsubscribe()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params,
        })
    }

    listAdminUserActivity(adminUserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<AuditEventResponse>>>): Observable<PaginatedResponse<AuditEventResponse>> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).activityRoutesForAdminUser(adminUserId ?? "").listActivity()
        let params = serialisePaginatedQueryParams(pagination, this.adminUserActivityFacade.adminUserActivityRemotePagination$)
        this.adminUserActivityFacade.adminUserActivityFilters$.pipe(
            take(1),
            map((filters) => {
                if (filters.dbCreatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt)) }
                // if (filters.dbUpdatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt)) }
                // if (filters.dbDeletedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_deleted_at', filters.dbDeletedAt)) }
                if (filters.affectedId) { params = upsertHTTPParams(params, serialiseStringQueryFilter('affected_id', filters.affectedId)) }
                if (filters.affectedSchema) { params = upsertHTTPParams(params, serialiseStringQueryFilter('affected_schema', filters.affectedSchema)) }
                if (filters.eventType) { params = upsertHTTPParams(params, serialiseEnumQueryFilter('event_type', filters.eventType)) }
            })
        ).subscribe().unsubscribe()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params,
        })
    }

    getAdminUserSession(sessionId: string): Observable<Model.AdminUserSessionResponse> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).sessionRoutes.getSession(sessionId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }

    listAdminUserSessions(adminUserId: string, pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserSessionResponse>>>): Observable<PaginatedResponse<Model.AdminUserSessionResponse>> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).sessionRoutesForAdminUser(adminUserId).listSessions()
        let params = serialisePaginatedQueryParams(pagination, this.adminUserSessionFacade.adminUserSessionRemotePagination$)
        this.adminUserSessionFacade.adminUserSessionFilters$.pipe(
            take(1),
            map((filters) => {
                if (filters.dbCreatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt)) }
                if (filters.dbUpdatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt)) }
                if (filters.dbDeletedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_deleted_at', filters.dbDeletedAt)) }
                if (filters.isActive) { params = upsertHTTPParam(params, 'is_active', filters.isActive) }
            })
        ).subscribe().unsubscribe()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params,
        })
    }

    invalidateAdminUserSession(sessionId: string): Observable<Model.AdminUserSessionResponse> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).sessionRoutes.invalidateSession(sessionId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader()
        })
    }
}