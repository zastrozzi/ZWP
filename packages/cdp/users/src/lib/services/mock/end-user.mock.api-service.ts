import { Inject, Injectable, inject } from '@angular/core';
import { AuditEventResponse, HTTPMethod, ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, PaginatedResponse, serialisePaginatedQueryParams } from '@zwp/platform.common';
import { EnduserAPIService } from '../abstract';
import { Observable, of } from 'rxjs';
import { PlatformAuth } from '@zwp/platform.auth';
import { Model } from '../../model';
import { mockEnduserResponse, mockEnduserAddressResponse, mockEnduserEmailResponse,
    mockEnduserCredentialResponse, mockEnduserPhoneResponse, mockEnduserDeviceResponse, mockEndUserAuditResponse, mockEnduserSessionResponse } from './mock-data/enduser-mockData';

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({serviceName: 'EndUserMockAPIServices', options: { skipMethodDebugger: true }})
export class EndUserMockAPIServices extends PlatformAuth.AuthedAPIService implements EnduserAPIService { 
    private mockEnduserResponse = mockEnduserResponse;
    private mockEnduserAddressResponse = mockEnduserAddressResponse;
    private mockEnduserEmailResponse = mockEnduserEmailResponse;
    private mockEnduserCredentialResponse = mockEnduserCredentialResponse;
    private mockEnduserPhoneResponse = mockEnduserPhoneResponse;
    private mockEnduserDeviceResponse = mockEnduserDeviceResponse;
    private mockEndUserAuditResponse = mockEndUserAuditResponse;
    private mockEnduserSessionResponse = mockEnduserSessionResponse;

    createEnduser(): Observable<Model.EnduserResponse> {
        return of(this.mockEnduserResponse[0]);
    }

    getEnduser(): Observable<Model.EnduserResponse> {
        return of(this.mockEnduserResponse[0]);
    }

    listEndusers(pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserResponse>>>): Observable<PaginatedResponse<Model.EnduserResponse>> {
        return of({results: this.mockEnduserResponse, total: this.mockEnduserResponse.length})
    }

    updateEnduser(enduserId: string, request: Model.UpdateEnduserRequest): Observable<Model.EnduserResponse> {
        return of(this.mockEnduserResponse[0]);
    }

    deleteEnduser(enduserId: string): Observable<void> {
        return of();
    }

    loginEnduserEmailPassword(request: Model.LoginEnduserEmailPasswordRequest): Observable<PlatformAuth.Model.AuthedUserResponse<Model.EnduserResponse>> {
        return of({accessToken: 'fe168146453f8e18c6ff16e6bca9', refreshToken: 'fe453fxx8e18c6ff16e6bca9', userData: this.mockEnduserResponse[0]})
    }

    logoutEnduser(): Observable<void> {
        return of();
    }

    refreshEnduserToken(request: Model.RefreshEnduserTokenRequest): Observable<PlatformAuth.Model.AuthedUserResponse<Model.EnduserResponse>> {
        return of({accessToken: 'fe168146453f8e18c6ff34r3bca9', refreshToken: 'fe453fxx8e18c6ff3436bca9', userData: this.mockEnduserResponse[0]})
    }

    createEnduserAddress(enduserId: string, request: Model.CreateEnduserAddressRequest): Observable<Model.EnduserAddressResponse> {
        return of(this.mockEnduserAddressResponse[0]);
    }

    getEnduserAddress(addressId: string): Observable<Model.EnduserAddressResponse> {
        return of(this.mockEnduserAddressResponse[0]);
    }

    listEnduserAddresses(enduserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserAddressResponse>>>): Observable<PaginatedResponse<Model.EnduserAddressResponse>> {
        return of({results: this.mockEnduserAddressResponse, total: this.mockEnduserAddressResponse.length}); 
    }

    updateEnduserAddress(addressId: string, request: Model.UpdateEnduserAddressRequest): Observable<Model.EnduserAddressResponse> {
        return of(this.mockEnduserAddressResponse[0]);
    }

    deleteEnduserAddress(addressId: string): Observable<void> {
        return of();
    }

    createEnduserEmail(enduserId: string, request: Model.CreateEnduserEmailRequest): Observable<Model.EnduserEmailResponse> {
        return of(this.mockEnduserEmailResponse[0]);
    }

    getEnduserEmail(emailId: string): Observable<Model.EnduserEmailResponse> {
        return of(this.mockEnduserEmailResponse[0]);
    }

    listEnduserEmails(enduserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserEmailResponse>>>): Observable<PaginatedResponse<Model.EnduserEmailResponse>> {
        return of({results: this.mockEnduserEmailResponse, total: this.mockEnduserEmailResponse.length})
    }

    updateEnduserEmail(emailId: string, request: Model.UpdateEnduserEmailRequest): Observable<Model.EnduserEmailResponse> {
        return of(this.mockEnduserEmailResponse[0]);
    }

    deleteEnduserEmail(emailId: string): Observable<void> {
        return of();
    }

    createEnduserCredential(enduserId: string, request: Model.CreateEnduserCredentialRequest): Observable<Model.EnduserCredentialResponse> {
        return of(this.mockEnduserCredentialResponse[0]);
    }

    getEnduserCredential(credentialId: string): Observable<Model.EnduserCredentialResponse> {
        return of(this.mockEnduserCredentialResponse[0]);
    }

    listEnduserCredentials(enduserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserCredentialResponse>>>): Observable<PaginatedResponse<Model.EnduserCredentialResponse>> {
        return of({results: this.mockEnduserCredentialResponse, total: this.mockEnduserCredentialResponse.length})
    }

    updateEnduserCredential(credentialId: string, request: Model.UpdateEnduserCredentialRequest): Observable<Model.EnduserCredentialResponse> {
        return of(this.mockEnduserCredentialResponse[0]);
    }

    deleteEnduserCredential(credentialId: string): Observable<void> {
        return of();
    }

    createEnduserPhone(enduserId: string, request: Model.CreateEnduserPhoneRequest): Observable<Model.EnduserPhoneResponse> {
        return of(this.mockEnduserPhoneResponse[0])
    }

    getEnduserPhone(phoneId: string): Observable<Model.EnduserPhoneResponse> {
        return of(this.mockEnduserPhoneResponse[0])
    }

    listEnduserPhones(enduserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserPhoneResponse>>>): Observable<PaginatedResponse<Model.EnduserPhoneResponse>> {
        return of({results: this.mockEnduserPhoneResponse, total: this.mockEnduserPhoneResponse.length});
    }

    updateEnduserPhone(phoneId: string, request: Model.UpdateEnduserPhoneRequest): Observable<Model.EnduserPhoneResponse> {
        return of(this.mockEnduserPhoneResponse[0]);
    }

    deleteEnduserPhone(phoneId: string): Observable<void> {
        return of();
    }

    getEnduserDevice(deviceId: string): Observable<Model.EnduserDeviceResponse> {
        return of(this.mockEnduserDeviceResponse[0]);
    }

    listEnduserDevices(enduserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserDeviceResponse>>>): Observable<PaginatedResponse<Model.EnduserDeviceResponse>> {
        return of({results: this.mockEnduserDeviceResponse, total: this.mockEnduserDeviceResponse.length});
    }

    listEnduserActivity(enduserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<AuditEventResponse>>>): Observable<PaginatedResponse<AuditEventResponse>> {
        return of({results: this.mockEndUserAuditResponse, total: this.mockEndUserAuditResponse.length})   
    }

    getEnduserSession(enduserSessionId: string): Observable<Model.EnduserSessionResponse> {
        return of(this.mockEnduserSessionResponse[0])
    }

    listEnduserSessions(enduserId: string, pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserSessionResponse>>>): Observable<PaginatedResponse<Model.EnduserSessionResponse>> {
        return of({results: this.mockEnduserSessionResponse, total: this.mockEnduserSessionResponse.length})
    }

    invalidateEnduserSession(sessionId: string): Observable<Model.EnduserSessionResponse> {
        return of(this.mockEnduserSessionResponse[0]);
    }

}
