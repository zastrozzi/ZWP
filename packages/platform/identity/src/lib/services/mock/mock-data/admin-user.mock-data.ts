import { Model } from "../../../model"
import { AuditEventResponse, AuditEventActionType } from '@zwp/platform.common';

const primaryAdminUser: Model.AdminUserResponse = {
    id : '4f08a94b-7181-4e56-bd2e-1d1ecbc9c883',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    firstName: 'John',
    lastName: 'Wicks',
    role: 'Admin User'
}

const allAdminUsers: Model.AdminUserResponse[] = [
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
    }, 
    primaryAdminUser
]

const primaryAdminUserEmail: Model.AdminUserEmailResponse = {
    id: '76de4285-95a7-459a-9888-e307622255b8',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    emailAddressValue: 'johndoe@abc.com',
    isVerified: true,
    adminUserId: primaryAdminUser.id
}

const allAdminUserEmails: Model.AdminUserEmailResponse[] = [
    {
        id: '76de4285-95a7-459a-9888-e307622277b8',
        dbCreatedAt: new Date('2023-11-15'),
        dbUpdatedAt: new Date('2023-12-15'),
        dbDeletedAt: new Date('2024-01-15'),
        emailAddressValue: 'johndoe12@abc.com',
        isVerified: true,
        adminUserId: primaryAdminUser.id
    },
    {
        id: '76de4285-9587-4599-2888-e307622255b8',
        dbCreatedAt: new Date('2023-11-15'),
        dbUpdatedAt: new Date('2023-12-15'),
        dbDeletedAt: new Date('2024-01-15'),
        emailAddressValue: 'johndoe123@abc.com',
        isVerified: true,
        adminUserId: primaryAdminUser.id
    }, 
    primaryAdminUserEmail
]

const allAdminUserCredentials: Model.AdminUserCredentialResponse[] = [{
    id: '76de4285-9587-4599-2888-e307622255b9',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    credentialType: Model.CredentialType.emailPassword,
    isValid: true,
    adminUserId: primaryAdminUser.id
},
{
    id: '76de4285-9587-4599-2888-e3076277779',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    credentialType: Model.CredentialType.googleOAuth,
    isValid: true,
    adminUserId: primaryAdminUser.id
}];

const primaryAdminUserDevice: Model.AdminUserDeviceResponse = {
    id: 'aa6169ae-299f-4046-9b35-217de7fbbb47',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    userAgent: 'Safari-like',
    system: Model.DeviceSystem.iOS,
    osVersion: 'OS X',
    apnsPushToken: '740f4707 bebcf74f 9b7c25d4 8e335894 5f6aa01d a5ddb387 462c7eaf 61bb78ad',
    fcmPushToken: '740f4707 bebcf74f 9b7c25d4',
    channels: 'any',
    localDeviceIdentifier: 'OS 9.0+',
    lastSeenAt: new Date('2024-02-15'),
    adminUserId: primaryAdminUser.id
}

const allAdminUserDevices: Model.AdminUserDeviceResponse[] = [
    {
        id: 'aa6169ae-299f-4046-9b35-217de7fbbb47',
        dbCreatedAt: new Date('2023-11-15'),
        dbUpdatedAt: new Date('2023-12-15'),
        dbDeletedAt: new Date('2024-01-15'),
        userAgent: 'John Das',
        system: Model.DeviceSystem.android,
        osVersion: 'Windows 10',
        apnsPushToken: '740f4707 bebcf74f 9b7c25d4 8e335894 5f6aa01d a5ddb387 462c7eaf 61bb78ad',
        fcmPushToken: '740f4707 bebcf74f 9b7c5765',
        channels: 'any',
        localDeviceIdentifier: 'OS 9.0+',
        lastSeenAt: new Date('2024-02-15'),
        adminUserId: primaryAdminUser.id
    },
    primaryAdminUserDevice
]


const allAdminUserAuditEvents: AuditEventResponse[] = [{
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

const allAdminUserSessions:  Model.AdminUserSessionResponse[] = [{
    id: '06e4465f-8320-4deb-9dcd-f40600dee971',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    isActive: true,
    adminUserId: primaryAdminUser.id,
    deviceId: primaryAdminUserDevice.id
},
{
    id: '06e4465f-8320-4deb-9dcd-f40600ddd972',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    isActive: true,
    adminUserId: primaryAdminUser.id,
    deviceId: primaryAdminUserDevice.id
}]

export const AdminUserMockData = {
    primaryAdminUser,
    allAdminUsers,
    primaryAdminUserEmail,
    allAdminUserEmails,
    allAdminUserCredentials,
    primaryAdminUserDevice,
    allAdminUserDevices,
    allAdminUserAuditEvents,
    allAdminUserSessions
}