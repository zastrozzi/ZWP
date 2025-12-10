import { Inject, Injectable, inject } from '@angular/core';
import { AuditEventResponse, HTTPMethod, ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, PaginatedResponse, serialisePaginatedQueryParams } from '@zwp/platform.common';
import { EnduserAPIService } from '../abstract';
import { Observable, of } from 'rxjs';
import { PlatformAuth } from '@zwp/platform.auth';
import { Model } from '../../model';
import { EnduserMockData } from './mock-data';

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({serviceName: 'PlatformEnduserMockAPIService', options: { skipMethodDebugger: true }})
export class PlatformEnduserMockAPIService extends PlatformAuth.AuthedAPIService implements EnduserAPIService {
    createEnduser(): Observable<Model.EnduserResponse> {
        return of(EnduserMockData.primaryEnduser);
    }

    getEnduser(): Observable<Model.EnduserResponse> {
        return of(EnduserMockData.primaryEnduser);
    }

    listEndusers(pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserResponse>>>): Observable<PaginatedResponse<Model.EnduserResponse>> {
        return of({results: EnduserMockData.allEndusers, total: EnduserMockData.allEndusers.length})
    }

    updateEnduser(enduserId: string, request: Model.UpdateEnduserRequest): Observable<Model.EnduserResponse> {
        return of(EnduserMockData.primaryEnduser);
    }

    deleteEnduser(enduserId: string): Observable<void> {
        return of();
    }

    loginEnduserEmailPassword(request: Model.LoginEnduserEmailPasswordRequest): Observable<PlatformAuth.Model.AuthedUserResponse<Model.EnduserResponse>> {
        return of({accessToken: 'fe168146453f8e18c6ff16e6bca9', refreshToken: 'fe453fxx8e18c6ff16e6bca9', userData: EnduserMockData.primaryEnduser})
    }

    logoutEnduser(): Observable<void> {
        return of();
    }

    refreshEnduserToken(request: Model.RefreshEnduserTokenRequest): Observable<PlatformAuth.Model.AuthedUserResponse<Model.EnduserResponse>> {
        return of({accessToken: 'fe168146453f8e18c6ff34r3bca9', refreshToken: 'fe453fxx8e18c6ff3436bca9', userData: EnduserMockData.primaryEnduser})
    }

    createEnduserAddress(enduserId: string, request: Model.CreateEnduserAddressRequest): Observable<Model.EnduserAddressResponse> {
        return of(EnduserMockData.allEnduserAddresses[0]);
    }

    getEnduserAddress(addressId: string): Observable<Model.EnduserAddressResponse> {
        return of(EnduserMockData.allEnduserAddresses[0]);
    }

    listEnduserAddresses(enduserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserAddressResponse>>>): Observable<PaginatedResponse<Model.EnduserAddressResponse>> {
        return of({results: EnduserMockData.allEnduserAddresses, total: EnduserMockData.allEnduserAddresses.length}); 
    }

    updateEnduserAddress(addressId: string, request: Model.UpdateEnduserAddressRequest): Observable<Model.EnduserAddressResponse> {
        return of(EnduserMockData.allEnduserAddresses[0]);
    }

    deleteEnduserAddress(addressId: string): Observable<void> {
        return of();
    }

    createEnduserEmail(enduserId: string, request: Model.CreateEnduserEmailRequest): Observable<Model.EnduserEmailResponse> {
        return of(EnduserMockData.allEnduserEmails[0]);
    }

    getEnduserEmail(emailId: string): Observable<Model.EnduserEmailResponse> {
        return of(EnduserMockData.allEnduserEmails[0]);
    }

    listEnduserEmails(enduserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserEmailResponse>>>): Observable<PaginatedResponse<Model.EnduserEmailResponse>> {
        return of({results: EnduserMockData.allEnduserEmails, total: EnduserMockData.allEnduserEmails.length})
    }

    updateEnduserEmail(emailId: string, request: Model.UpdateEnduserEmailRequest): Observable<Model.EnduserEmailResponse> {
        return of(EnduserMockData.allEnduserEmails[0]);
    }

    deleteEnduserEmail(emailId: string): Observable<void> {
        return of();
    }

    createEnduserCredential(enduserId: string, request: Model.CreateEnduserCredentialRequest): Observable<Model.EnduserCredentialResponse> {
        return of(EnduserMockData.allEnduserCredentials[0]);
    }

    getEnduserCredential(credentialId: string): Observable<Model.EnduserCredentialResponse> {
        return of(EnduserMockData.allEnduserCredentials[0]);
    }

    listEnduserCredentials(enduserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserCredentialResponse>>>): Observable<PaginatedResponse<Model.EnduserCredentialResponse>> {
        return of({results: EnduserMockData.allEnduserCredentials, total: EnduserMockData.allEnduserCredentials.length})
    }

    updateEnduserCredential(credentialId: string, request: Model.UpdateEnduserCredentialRequest): Observable<Model.EnduserCredentialResponse> {
        return of(EnduserMockData.allEnduserCredentials[0]);
    }

    deleteEnduserCredential(credentialId: string): Observable<void> {
        return of();
    }

    createEnduserPhone(enduserId: string, request: Model.CreateEnduserPhoneRequest): Observable<Model.EnduserPhoneResponse> {
        return of(EnduserMockData.allEnduserPhones[0])
    }

    getEnduserPhone(phoneId: string): Observable<Model.EnduserPhoneResponse> {
        return of(EnduserMockData.allEnduserPhones[0])
    }

    listEnduserPhones(enduserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserPhoneResponse>>>): Observable<PaginatedResponse<Model.EnduserPhoneResponse>> {
        return of({results: EnduserMockData.allEnduserPhones, total: EnduserMockData.allEnduserPhones.length});
    }

    updateEnduserPhone(phoneId: string, request: Model.UpdateEnduserPhoneRequest): Observable<Model.EnduserPhoneResponse> {
        return of(EnduserMockData.allEnduserPhones[0]);
    }

    deleteEnduserPhone(phoneId: string): Observable<void> {
        return of();
    }

    getEnduserDevice(deviceId: string): Observable<Model.EnduserDeviceResponse> {
        return of(EnduserMockData.primaryEnduserDevice);
    }

    listEnduserDevices(enduserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserDeviceResponse>>>): Observable<PaginatedResponse<Model.EnduserDeviceResponse>> {
        return of({results: EnduserMockData.allEnduserDevices, total: EnduserMockData.allEnduserDevices.length});
    }

    listEnduserActivity(enduserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<AuditEventResponse>>>): Observable<PaginatedResponse<AuditEventResponse>> {
        return of({results: EnduserMockData.allEnduserAuditEvents, total: EnduserMockData.allEnduserAuditEvents.length})   
    }

    getEnduserSession(enduserSessionId: string): Observable<Model.EnduserSessionResponse> {
        return of(EnduserMockData.allEnduserSessions[0])
    }

    listEnduserSessions(enduserId: string, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserSessionResponse>>>): Observable<PaginatedResponse<Model.EnduserSessionResponse>> {
        return of({results: EnduserMockData.allEnduserSessions, total: EnduserMockData.allEnduserSessions.length})
    }

    invalidateEnduserSession(sessionId: string): Observable<Model.EnduserSessionResponse> {
        return of(EnduserMockData.allEnduserSessions[0]);
    }

}
