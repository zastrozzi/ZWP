import { Model } from "../../../model"
import { CredentialType, DeviceSystem  } from "../../../model/enums";
import { PaginatedQueryParams, AuditEventResponse, AuditEventActionType } from '@zwp/platform.common';

export const primaryMockAdminUser: Model.AdminUserResponse = {
    id : '4f08a94b-7181-4e56-bd2e-1d1ecbc9c883',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    firstName: 'John',
    lastName: 'Wicks',
    role: 'Admin User'
}

export const allMockAdminUsers: Model.AdminUserResponse[] = [
    {
        id : 'fe168146-3ab5-453f-8e18-c6ff16e6bca9',
        dbCreatedAt: new Date('2021-11-15') ,
        dbUpdatedAt: new Date('2021-12-15'),
        dbDeletedAt: new Date('2021-01-15'),
        firstName: 'Luke',
        lastName: 'Doe',
        role: 'Admin User'
    }, {
        id : 'b2316a49-44aa-4098-af1e-ff5c750b1bfe',
        dbCreatedAt: new Date('2022-11-15') ,
        dbUpdatedAt: new Date('2022-12-15'),
        dbDeletedAt: new Date('2022-01-15'),
        firstName: 'John',
        lastName: 'Samson',
        role: 'Admin User'
    }, primaryMockAdminUser]

export const mockAdminUserEmailResponse: Model.AdminUserEmailResponse = {
    id: '76de4285-95a7-459a-9888-e307622255b8',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    emailAddressValue: 'johndoe@abc.com',
    isVerified: true,
    adminUserId: '4f08a94b-7181-4e56-bd2e-1d1ecbc9c883'
}

export const allMockAdminEmailResponses: Model.AdminUserEmailResponse[] = [
    {
        id: '76de4285-95a7-459a-9888-e307622277b8',
        dbCreatedAt: new Date('2023-11-15'),
        dbUpdatedAt: new Date('2023-12-15'),
        dbDeletedAt: new Date('2024-01-15'),
        emailAddressValue: 'johndoe12@abc.com',
        isVerified: true,
        adminUserId: '4f08a94b-7181-4e56-bd2e-1d1ecbc9c883'
    },
    {
        id: '76de4285-9587-4599-2888-e307622255b8',
        dbCreatedAt: new Date('2023-11-15'),
        dbUpdatedAt: new Date('2023-12-15'),
        dbDeletedAt: new Date('2024-01-15'),
        emailAddressValue: 'johndoe123@abc.com',
        isVerified: true,
        adminUserId: '4f08a94b-7181-4e56-bd2e-1d1ecbc9c883'
    }, mockAdminUserEmailResponse
]

// export const paginationQueryParams: PaginatedQueryParams = {
//     limit: 2,
//     offset: 0,
//     order: 'asc',
//     orderBy: 'id',
//     includeDeleted: false,
//   };


export const adminUserCredentialsMock: Model.AdminUserCredentialResponse[] = [{
    id: '76de4285-9587-4599-2888-e307622255b9',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    credentialType: CredentialType.emailPassword,
    isValid: true,
    adminUserId: '4f08a94b-7181-4e56-bd2e-1d1ecbc9c883'
},
{
    id: '76de4285-9587-4599-2888-e3076277779',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    credentialType: CredentialType.googleOAuth,
    isValid: true,
    adminUserId: '4f08a94b-7181-4e56-bd2e-1d1ecbc9c883'
}];

export const mockAdminDeviceResponse: Model.AdminUserDeviceResponse[] = [{
    id: 'aa6169ae-299f-4046-9b35-217de7fbbb47',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    userAgent: 'John Dos',
    system: DeviceSystem.iOS,
    osVersion: 'OS X',
    apnsPushToken: '740f4707 bebcf74f 9b7c25d4 8e335894 5f6aa01d a5ddb387 462c7eaf 61bb78ad',
    fcmPushToken: '740f4707 bebcf74f 9b7c25d4',
    channels: 'any',
    localDeviceIdentifier: 'OS 9.0+',
    lastSeenAt: new Date('2024-02-15'),
    adminUserId: '4f08a94b-7181-4e56-bd2e-1d1ecbc9c883'
},
{
    id: 'aa6169ae-299f-4046-9b35-217de7fbbb47',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    userAgent: 'John Das',
    system: DeviceSystem.android,
    osVersion: 'Windows 10',
    apnsPushToken: '740f4707 bebcf74f 9b7c25d4 8e335894 5f6aa01d a5ddb387 462c7eaf 61bb78ad',
    fcmPushToken: '740f4707 bebcf74f 9b7c5765',
    channels: 'any',
    localDeviceIdentifier: 'OS 9.0+',
    lastSeenAt: new Date('2024-02-15'),
    adminUserId: '4f08a94b-7181-4e56-bd2e-1d1ecbc9c883'
}]


export const mockAuditResponse: AuditEventResponse[] = [{
    id: '92ac786d-96db-404a-a2c3-f62adf3e9dd8',
    dbCreatedAt: new Date('2023-11-15'),
    schema: '',
    table: '',
    affectedId: 'audit12',
    eventType: AuditEventActionType.create,
    eventData: {
        field1: {
          previous: 'old value',
          next: 'new value'
        },
        field2: {
          previous: 123,
          next: 456
        }
    },
    platformActorType: 'user',
    platformActorId: 'user_456'
},{
    id: '92ac786d-96db-404a-a2c3-f62adf3e9ee8',
    dbCreatedAt: new Date('2023-11-15'),
    schema: '',
    table: '',
    affectedId: 'audit12',
    eventType: AuditEventActionType.update,
    eventData: {
        field1: {
          previous: 'old value1',
          next: 'new value1'
        },
        field2: {
          previous: 124,
          next: 457
        }
    },
    platformActorType: 'user1',
    platformActorId: 'user_457'
} ];

export const mockAdminUserSessionResponse:  Model.AdminUserSessionResponse[] = [{
    id: '06e4465f-8320-4deb-9dcd-f40600dee971',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    isActive: true,
    adminUserId: '4f08a94b-7181-4e56-bd2e-1d1ecbc9c883',
    deviceId: '1233'
},
{
    id: '06e4465f-8320-4deb-9dcd-f40600ddd972',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    isActive: true,
    adminUserId: '4f08a94b-7181-4e56-bd2e-1d1ecbc9c883',
    deviceId: '1211'
}]

