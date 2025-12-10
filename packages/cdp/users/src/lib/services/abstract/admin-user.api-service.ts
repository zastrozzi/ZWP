import { Injectable, InjectionToken } from "@angular/core";
import { Model } from "../../model";
import { PlatformAuth } from "@zwp/platform.auth";
import { AuditEventResponse, Nullable, PaginatedQueryParams, PaginatedResponse } from "@zwp/platform.common";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export abstract class AdminUserAPIService {
    abstract createAdminUser(request: Model.CreateAdminUserRequest): Observable<Model.AdminUserResponse>
    abstract getAdminUser(adminUserId: string): Observable<Model.AdminUserResponse>
    abstract listAdminUsers(pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserResponse>>>): Observable<PaginatedResponse<Model.AdminUserResponse>>
    abstract updateAdminUser(adminUserId: string, request: Model.UpdateAdminUserRequest): Observable<Model.AdminUserResponse>
    abstract deleteAdminUser(adminUserId: string): Observable<void>

    abstract loginAdminUserEmailPassword(request: Model.LoginAdminUserEmailPasswordRequest): Observable<PlatformAuth.Model.AuthedUserResponse<Model.AdminUserResponse>>
    abstract logoutAdminUser(): Observable<void>
    abstract refreshAdminUserToken(request: Model.RefreshAdminUserTokenRequest): Observable<PlatformAuth.Model.AuthedUserResponse<Model.AdminUserResponse>>

    abstract createAdminUserEmail(adminUserId: string, request: Model.CreateAdminUserEmailRequest): Observable<Model.AdminUserEmailResponse>
    abstract getAdminUserEmail(emailId: string): Observable<Model.AdminUserEmailResponse>
    abstract listAdminUserEmails(adminUserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserEmailResponse>>>): Observable<PaginatedResponse<Model.AdminUserEmailResponse>>
    abstract updateAdminUserEmail(emailId: string, request: Model.UpdateAdminUserEmailRequest): Observable<Model.AdminUserEmailResponse>
    abstract deleteAdminUserEmail(emailId: string): Observable<void>

    abstract createAdminUserCredential(adminUserId: string, request: Model.CreateAdminUserCredentialRequest): Observable<Model.AdminUserCredentialResponse>
    abstract getAdminUserCredential(credentialId: string): Observable<Model.AdminUserCredentialResponse>
    abstract listAdminUserCredentials(adminUserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserCredentialResponse>>>): Observable<PaginatedResponse<Model.AdminUserCredentialResponse>>
    abstract updateAdminUserCredential(credentialId: string, request: Model.UpdateAdminUserCredentialRequest): Observable<Model.AdminUserCredentialResponse>
    abstract deleteAdminUserCredential(credentialId: string): Observable<void>

    abstract getAdminUserDevice(deviceId: string): Observable<Model.AdminUserDeviceResponse>
    abstract listAdminUserDevices(adminUserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserDeviceResponse>>>): Observable<PaginatedResponse<Model.AdminUserDeviceResponse>>

    abstract listAdminUserActivity(adminUserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<AuditEventResponse>>>): Observable<PaginatedResponse<AuditEventResponse>>

    abstract getAdminUserSession(sessionId: string): Observable<Model.AdminUserSessionResponse>
    abstract listAdminUserSessions(adminUserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserSessionResponse>>>): Observable<PaginatedResponse<Model.AdminUserSessionResponse>>
    abstract invalidateAdminUserSession(sessionId: string): Observable<Model.AdminUserSessionResponse>
}

export const ADMIN_USER_API_SERVICE = new InjectionToken<AdminUserAPIService>('cdp.admin-user.api-service')