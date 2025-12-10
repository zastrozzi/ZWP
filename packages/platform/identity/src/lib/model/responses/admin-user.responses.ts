import { AuditEventResponse, Nullable } from "@zwp/platform.common"
import { CredentialType, DeviceSystem, LoggableAdminUserActionType, PhoneContactMethod } from "../enums"

export interface AdminUserActionResponse {
    id: string
        
    dbCreatedAt?: Date
    dbUpdatedAt?: Date
    dbDeletedAt?: Date
        
    type: LoggableAdminUserActionType
    props?: Record<string, string>;
    sessionId: string
}

export interface AdminUserCredentialResponse {
    id: string;
    dbCreatedAt?: Date;
    dbUpdatedAt?: Date;
    dbDeletedAt?: Date;
    credentialType: CredentialType;
    isValid: boolean;
    adminUserId: string;
}

export interface AdminUserDeviceResponse {
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
    adminUserId: string;
}


export interface AdminUserEmailResponse {
    id: string;
    dbCreatedAt?: Date;
    dbUpdatedAt?: Date;
    dbDeletedAt?: Date;
    emailAddressValue: string;
    isVerified: boolean;
    adminUserId: string;
}

export interface AdminUserPhoneResponse {
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
    adminUserId: string;
}

export interface AdminUserResponse {
    id: string;
    
    dbCreatedAt?: Date;
    dbUpdatedAt?: Date;
    dbDeletedAt?: Date;
    
    firstName: string;
    lastName: string;
    role: string;
}

export interface AdminUserSessionResponse {
    id: string;
    
    dbCreatedAt?: Date;
    dbUpdatedAt?: Date;
    dbDeletedAt?: Date;
    
    isActive: boolean;
    adminUserId: string;
    deviceId: string;
}

export interface AdminUserActivityWithAdminUserResponse {
    activity: AuditEventResponse
    adminUser: AdminUserResponse
    description: string
}