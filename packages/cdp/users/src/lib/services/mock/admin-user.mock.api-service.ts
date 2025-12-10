import { Inject, Injectable, inject } from "@angular/core";
import { PlatformAuth } from "@zwp/platform.auth";
import { AdminUserAPIService } from "../abstract";
import { Model } from "../../model"
import { Observable, of } from 'rxjs';
import { CDP_USERS_API_BASE_URL, CDP_USERS_API_CONFIG } from '../../config';
import { AuditEventResponse, HTTPMethod, ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common';
import { APIRoutes } from "../../api-routes";
import { primaryMockAdminUser, allMockAdminUsers, mockAdminUserEmailResponse, allMockAdminEmailResponses, adminUserCredentialsMock, 
    mockAdminDeviceResponse, mockAuditResponse, mockAdminUserSessionResponse} from './mock-data/admin-user-mockData'


@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({serviceName: 'AdminUserMockAPIService', options: { skipMethodDebugger: true }})
export class AdminUserMockAPIServices extends PlatformAuth.AuthedAPIService implements AdminUserAPIService {

    private config = inject(CDP_USERS_API_CONFIG);
    private baseUrl = inject(CDP_USERS_API_BASE_URL)
    private primaryMockAdminUser = primaryMockAdminUser;
    private allMockAdminUsers = allMockAdminUsers;
    private mockAdminUserEmailResponse = mockAdminUserEmailResponse;
    private allMockAdminEmailResponses = allMockAdminEmailResponses;
    private adminUserCredentialsMock = adminUserCredentialsMock;
    private mockAdminDeviceResponse = mockAdminDeviceResponse;
    private mockAuditResponse = mockAuditResponse;
    private mockAdminUserSessionResponse = mockAdminUserSessionResponse;

  
    createAdminUser(request: Model.CreateAdminUserRequest): Observable<any> {
        return of(this.primaryMockAdminUser)
    }

    getAdminUser(adminUserId: string): Observable<any> {
        const adminUser = this.allMockAdminUsers.find(u => u.id === adminUserId);
        return of(adminUser);
    }

    listAdminUsers(pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserResponse>>>): Observable<PaginatedResponse<Model.AdminUserResponse>> {
        return of({results: this.allMockAdminUsers, total: this.allMockAdminUsers.length})
    }

    updateAdminUser(adminUserId: string, request: Model.UpdateAdminUserRequest): Observable<any> {
        const index = this.allMockAdminUsers.findIndex(user => user.id === adminUserId);
        if (index !== -1) {
          this.allMockAdminUsers[index] = { ...this.allMockAdminUsers[index], ...request };
          return of({ ...this.allMockAdminUsers[index] } as Model.AdminUserResponse);
        } else {
          return of('User not found')
        }
    }

    deleteAdminUser(adminUserId: string): Observable<any> {
        const adminUser = this.allMockAdminUsers.find(u => u.id === adminUserId);
        return of(adminUser);
    }

    loginAdminUserEmailPassword(request: Model.LoginAdminUserEmailPasswordRequest): Observable<PlatformAuth.Model.AuthedUserResponse<Model.AdminUserResponse>> {
        console.log('Mock admin user');
        return of({accessToken: `eyJ0eXAiOiJKV1QiLCJhbGciOiJQUzI1NiJ9.eyJzIjoiRjFFQzkwNzQtOEI1Ny00NTY5LUIxNkMtRTY1MkEwMzJFQTU3IiwiciI6InN1cGVyLWFkbWluIiwicCI6ImFkbWluVXNlciIsInN0IjowLCJpYXQiOjE3MjQzMTgzOTguOTk0MjU5OCwidSI6IkU1NzMwQUFDLUY0NEEtNEVEOS1CMThCLTBDQzE4NEZCQjI0NiIsImQiOiI3MzgyREM1Ny1CMTQ3LTQzNEQtOTkwMS1DRTE2MUY4MkYyMTciLCJleHAiOjE5MDQzMTgzOTguOTk0MjU5OH0.wIffNofikvMzxLaIalmsVVpCLFC3_VpSkhi0Vk0xTFag1inYHLOlk18a87Cbx6JlIOJ6qj6nLWol-hKDoHeLISqq7aX2YXDiX0C17jx5_m5M2QWCedqs4VTlPvEjMhmH63JrWlxmzeWsDYJIU0ZrUo-jl7O-y3WkdjmR9Zr9t2frvIh8Oeyeopq2DlaGP_3Lmkya2OKBN1l24O0kVyaPjefcYEZScP_9TXcCTqKPsoDlbPxpqwS5uLeywLZzdNdRZnG1YYuDVHExcCGXAU7RM0Q9yBaw10lhD88aAnED3sFQAHRFpuXUFM5zdHGSSI0xXhtiIaIozemXnbuv_YuBCg
        `, refreshToken: `eyJhbGciOiJQUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI3NjQ0MzE4Mzk4Ljk5NDI2MywiZCI6IjczODJEQzU3LUIxNDctNDM0RC05OTAxLUNFMTYxRjgyRjIxNyIsImlhdCI6MTcyNDMxODM5OC45OTQyNjMyLCJ1IjoiRTU3MzBBQUMtRjQ0QS00RUQ5LUIxOEItMENDMTg0RkJCMjQ2IiwicyI6IkYxRUM5MDc0LThCNTctNDU2OS1CMTZDLUU2NTJBMDMyRUE1NyJ9.d_kTBylQVybP8U1Q_Jqr5accqEdMwGbDF5-upu_ghhbQ01iX3zuX3T47F-qQfXRm4uHbL6Nz4wBGvE8rv0nm0hVcfPIprrX97rMtdLmlbjwcLraH5CKUwuwexO1v5I_nm52d5U0sbd_s1H_0gP8Py4ZTttvqbP0xDzRwMa5sztyVFd1vCnmDk8kM2RHDteN4t2aA2O2YWz3kJOIadRv-q5_hY3dXfsafIpkQVdKgoKyf5ejPPzX89TTRa-iVkDFVxHlQO6mno7ds-jVZLc0acKC5ufVEEzv12wQcOtOIbbShFOJsJm5gTwD73oc7pLQ-GuYIcjoHxq4IQ_fCn6pwUQ
        `, userData: this.primaryMockAdminUser});
    }
    
    logoutAdminUser(): Observable<void> {
        const path = APIRoutes.adminUserRoutes(this.baseUrl).authRoutes.logout();
        return this.http.authedRequest(this.getAccessToken(), this.auth.authHeader, HTTPMethod.POST, path, null, this.auth.addDeviceIdHeader());
    }

    refreshAdminUserToken(request: Model.RefreshAdminUserTokenRequest): Observable<PlatformAuth.Model.AuthedUserResponse<Model.AdminUserResponse>> {
        return of({accessToken: 'fe168146453f8e18c6ff16e6bca9', refreshToken: 'fe453fxx8e18c6ff16e6bca9', userData: this.primaryMockAdminUser});
    }
    
    createAdminUserEmail(adminUserId: string, request: Model.CreateAdminUserEmailRequest): Observable<Model.AdminUserEmailResponse> {
        return of(this.mockAdminUserEmailResponse);
    }
    
    getAdminUserEmail(emailId: string): Observable<Model.AdminUserEmailResponse> {
        return of(this.mockAdminUserEmailResponse);
    }

    listAdminUserEmails(adminUserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserEmailResponse>>>): Observable<PaginatedResponse<Model.AdminUserEmailResponse>> {
        return of({results: this.allMockAdminEmailResponses, total: this.allMockAdminEmailResponses.length}); 
    }

    updateAdminUserEmail(emailId: string, request: Model.UpdateAdminUserEmailRequest): Observable<Model.AdminUserEmailResponse> {
        return of(this.mockAdminUserEmailResponse);
    }

    deleteAdminUserEmail(emailId: string): Observable<any> {
        const adminEmail = this.allMockAdminEmailResponses.find(user => user.emailAddressValue);
        return of(adminEmail);
    }

    createAdminUserCredential(adminUserId: string, request: Model.CreateAdminUserCredentialRequest): Observable<Model.AdminUserCredentialResponse> {
        const response = this.adminUserCredentialsMock.find(cred => cred.adminUserId === adminUserId);
        return of(response || this.adminUserCredentialsMock[0]);
    }

    getAdminUserCredential(credentialId: string): Observable<Model.AdminUserCredentialResponse> {
        const response = this.adminUserCredentialsMock.find(cred => cred.adminUserId === credentialId);
        return of(response || this.adminUserCredentialsMock[0]);
    }

    listAdminUserCredentials(adminUserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserCredentialResponse>>>): Observable<PaginatedResponse<Model.AdminUserCredentialResponse>> {
        let filteredCredentials = this.adminUserCredentialsMock;
        if (adminUserId) {
             filteredCredentials = filteredCredentials.filter(cred => cred.adminUserId === adminUserId);
        }

        const limit = filteredCredentials.length;
        const offset = pagination?.offset || 0;
        const paginatedData = filteredCredentials.slice(offset, offset + limit);

        const response: PaginatedResponse<Model.AdminUserCredentialResponse> = {
            results: paginatedData,
            total: filteredCredentials.length,
            
        };

        return of(response);
        
    }

    updateAdminUserCredential(credentialId: string, request: Model.UpdateAdminUserCredentialRequest): Observable<Model.AdminUserCredentialResponse> {
        return of(this.adminUserCredentialsMock[0]);
    }

    deleteAdminUserCredential(credentialId: string): Observable<void> {
        return of()
    }

    getAdminUserDevice(deviceId: string): Observable<Model.AdminUserDeviceResponse> {
        return of(mockAdminDeviceResponse[0]);
    }

    listAdminUserDevices(adminUserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserDeviceResponse>>>): Observable<PaginatedResponse<Model.AdminUserDeviceResponse>> {
        let filteredDevices = this.mockAdminDeviceResponse;
        if (adminUserId) {
             filteredDevices = filteredDevices.filter(device => device.adminUserId === adminUserId);
        }

        const limit = filteredDevices.length;
        const offset = pagination?.offset || 0;
        const paginatedData = filteredDevices.slice(offset, offset + limit);

        const response: PaginatedResponse<Model.AdminUserDeviceResponse> = {
            results: paginatedData,
            total: filteredDevices.length,
            
        };

        return of(response);
    }

    listAdminUserActivity(adminUserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<AuditEventResponse>>>): Observable<PaginatedResponse<AuditEventResponse>> {
        return of({results: this.mockAuditResponse, total: this.mockAuditResponse.length})
    }

    getAdminUserSession(sessionId: string): Observable<Model.AdminUserSessionResponse> {
        return of(this.mockAdminUserSessionResponse[0])
    }

    listAdminUserSessions(adminUserId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.AdminUserSessionResponse>>>): Observable<PaginatedResponse<Model.AdminUserSessionResponse>> {
        return of({results: this.mockAdminUserSessionResponse, total: this.mockAdminUserSessionResponse.length})
    }

    invalidateAdminUserSession(sessionId: string): Observable<Model.AdminUserSessionResponse> {
        return of(this.mockAdminUserSessionResponse[0])
    }

}