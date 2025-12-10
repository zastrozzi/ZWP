import { Model } from '../../../model';
import { ZWPISO3166Alpha2, AuditEventActionType, AuditEventResponse } from '@zwp/platform.common';

const primaryEnduser: Model.EnduserResponse = {
    id: '9d75d07f-6556-4b35-82e5-0803c5355b8e',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: new Date('1994-02-20'),
    nino: 'ATJPV773',
    title: Model.UserTitle.Mr
}

const allEndusers: Model.EnduserResponse[] = [
    primaryEnduser
]

const allEnduserAddresses:  Model.EnduserAddressResponse[] = [{
    id: '2f6e839f-ea7c-478d-b88a-121fe01a14cb',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    refinement: 'Apt 3A',
    number: '123',
    street: 'Main Street',
    city: 'New York',
    region: 'NY',
    postalCode: '10001',
    country: ZWPISO3166Alpha2.AL,
    enduserId: primaryEnduser.id
}];

const allEnduserEmails:  Model.EnduserEmailResponse[] = [{
    id: '8ceafc2f-a3fe-49fb-969b-b8710f25a949',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    emailAddressValue: 'johndoe@gmail.com',
    isVerified: true,
    enduserId: primaryEnduser.id
}];

const allEnduserCredentials: Model.EnduserCredentialResponse[] =[ {
    id: '99010431-9b7b-401e-9beb-eb1c64dc1fdf',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    credentialType: Model.CredentialType.googleOAuth,
    isValid: true,
    enduserId: primaryEnduser.id
}];

const allEnduserPhones: Model.EnduserPhoneResponse[] = [{
    id: 'bd329477-5a1c-431c-b55c-a5d93c82ce15',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    phoneNumberValue: '07909338291',
    isWhatsapp: false,
    isSMS: true,
    isVoice: true,
    isWhatsappVerified: false,
    isSMSVerified: true,
    isVoiceVerified: true,
    preferredContactMethod: Model.PhoneContactMethod.sms,
    enduserId: primaryEnduser.id
}];

const primaryEnduserDevice: Model.EnduserDeviceResponse = {
    id: 'a25d564a-39bb-438a-ace2-3d44d9dbf6e1',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X)',
    system: Model.DeviceSystem.iOS,
    osVersion: '15.4',
    apnsPushToken: 'f31d6000-65b0-11ed-bd60-0242ac120002',
    fcmPushToken: 'c-64b20f1e54c320f1',
    channels: 'push, email',
    localDeviceIdentifier: '0123456789abcdef',
    lastSeenAt: new Date('2024-01-15'),
    enduserId: primaryEnduser.id
}

const allEnduserDevices: Model.EnduserDeviceResponse[] = [
    {
        id: 'a25d564a-39bb-438a-ace2-3d44d9dbf6e1',
        dbCreatedAt: new Date('2023-11-15'),
        dbUpdatedAt: new Date('2023-12-15'),
        dbDeletedAt: new Date('2024-01-15'),
        userAgent: 'Mozilla/5.0 (Windows 10)',
        system: Model.DeviceSystem.android,
        osVersion: '15.4',
        apnsPushToken: 'f31d6000-65b0-11ed-bd60-07866120002',
        fcmPushToken: 'c-64b20f1e54c6576f1',
        channels: 'push, email',
        localDeviceIdentifier: '012345678977bdef',
        lastSeenAt: new Date('2024-01-15'),
        enduserId: primaryEnduser.id
    },
    primaryEnduserDevice
];


const allEnduserAuditEvents: AuditEventResponse[] = [{
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
    affectedId: 'audit13',
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


const allEnduserSessions: Model.EnduserSessionResponse[] = [{
    id: '6a840d82-d174-4d4d-9788-c3fc70c7845e',
    dbCreatedAt: new Date('2023-11-15'),
    dbUpdatedAt: new Date('2023-12-15'),
    dbDeletedAt: new Date('2024-01-15'),
    isActive: true,
    enduserId: primaryEnduser.id,
    deviceId: primaryEnduserDevice.id
}]

export const EnduserMockData = {
    primaryEnduser,
    allEndusers,
    allEnduserAddresses,
    allEnduserEmails,
    allEnduserCredentials,
    allEnduserPhones,
    primaryEnduserDevice,
    allEnduserDevices,
    allEnduserAuditEvents,
    allEnduserSessions
}