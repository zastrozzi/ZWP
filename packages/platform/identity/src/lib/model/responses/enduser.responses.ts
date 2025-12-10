import { AuditEventResponse, ZWPISO3166Alpha2 } from "@zwp/platform.common";
import { CredentialType, DeviceSystem, LoggableEnduserActionType, PhoneContactMethod, UserTitle } from "../enums";

export interface EnduserActionResponse {
    id: string;
    dbCreatedAt?: Date;
    dbUpdatedAt?: Date;
    dbDeletedAt?: Date;
    type: LoggableEnduserActionType;
    props?: Record<string, string>;
    sessionId: string;
}

export interface EnduserAddressResponse {
    id: string;
    dbCreatedAt?: Date;
    dbUpdatedAt?: Date;
    dbDeletedAt?: Date;
    refinement?: string;
    number?: string;
    street?: string;
    city?: string;
    region?: string;
    postalCode: string;
    country: ZWPISO3166Alpha2;
    enduserId: string;
}

export interface EnduserCredentialResponse {
    id: string;
    dbCreatedAt?: Date;
    dbUpdatedAt?: Date;
    dbDeletedAt?: Date;
    credentialType: CredentialType;
    isValid: boolean;
    enduserId: string;
}

export interface EnduserDeviceResponse {
    id: string;
    dbCreatedAt?: Date;
    dbUpdatedAt?: Date;
    dbDeletedAt?: Date;
    userAgent: string;
    system: DeviceSystem;
    osVersion?: string;
    apnsPushToken?: string;
    fcmPushToken?: string;
    channels?: string;
    localDeviceIdentifier?: string;
    lastSeenAt: Date;
    enduserId: string;
}

export interface EnduserEmailResponse {
    id: string;
    dbCreatedAt?: Date;
    dbUpdatedAt?: Date;
    dbDeletedAt?: Date;
    emailAddressValue: string;
    isVerified: boolean;
    enduserId: string;
}

export interface EnduserPhoneResponse {
    id: string;
    dbCreatedAt?: Date;
    dbUpdatedAt?: Date;
    dbDeletedAt?: Date;
    phoneNumberValue: string;
    isWhatsapp: boolean;
    isSMS: boolean;
    isVoice: boolean;
    isWhatsappVerified: boolean;
    isSMSVerified: boolean;
    isVoiceVerified: boolean;
    preferredContactMethod: PhoneContactMethod;
    enduserId: string;
}

export interface EnduserResponse {
    id: string;
    dbCreatedAt?: Date;
    dbUpdatedAt?: Date;
    dbDeletedAt?: Date;
    firstName: string;
    lastName: string;
    dateOfBirth?: Date;
    nino?: string;
    title?: UserTitle;
}

export interface EnduserSessionResponse {
    id: string;
    dbCreatedAt?: Date;
    dbUpdatedAt?: Date;
    dbDeletedAt?: Date;
    isActive: boolean;
    enduserId: string;
    deviceId: string;
}

export interface EnduserActivityWithEnduserResponse {
    activity: AuditEventResponse
    enduser: EnduserResponse
    description: string
}