import { CredentialType, PhoneContactMethod } from "../enums";

export interface CreateAdminUserPhoneRequest {
    phoneNumberValue: string;
    isWhatsapp: boolean;
    isSMS: boolean;
    isVoice: boolean;
    isWhatsappVerified: boolean;
    isSMSVerified: boolean;
    isVoiceVerified: boolean;
    preferredContactMethod: PhoneContactMethod;
    adminUserId: string; // UUID in TypeScript is generally represented as a string
}

export interface CreateAdminUserRequest {
    firstName: string;
    lastName: string;
    role: string;
}

export interface LoginAdminUserEmailPasswordRequest {
    email: string;
    password: string;
}

export interface RefreshAdminUserTokenRequest {
    refreshToken: string;
}

export interface RegisterAdminUserRequest {
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    password: string;
}

export interface CreateAdminUserCredentialRequest {
    credentialType: CredentialType;
    oidcUserIdentifier?: string;
    password?: string;
}

export interface CreateAdminUserDeviceRequest {
    localDeviceIdentifier: string;
}

export interface CreateAdminUserEmailRequest {
    emailAddressValue: string;
    isVerified: boolean;
}

export interface UpdateAdminUserDeviceRequest {
    localDeviceIdentifier?: string;
}

export interface UpdateAdminUserEmailRequest {
    emailAddressValue?: string;
    isVerified?: boolean;
    adminUserId?: string; // UUID in TypeScript can be represented as a string
}

export interface UpdateAdminUserPasswordRequest {
    password: string;
}

export interface UpdateAdminUserCredentialRequest {
    isValid: boolean;
}

export interface UpdateAdminUserPhoneRequest {
    phoneNumberValue?: string;
    isWhatsapp?: boolean;
    isSMS?: boolean;
    isVoice?: boolean;
    isWhatsappVerified?: boolean;
    isSMSVerified?: boolean;
    isVoiceVerified?: boolean;
    preferredContactMethod?: PhoneContactMethod; // Assuming PhoneContactMethod is defined elsewhere
}

export interface UpdateAdminUserRequest {
    firstName?: string;
    lastName?: string;
    role?: string;
}

export interface VerifyAdminUserEmailRequest {
    emailAddressId: string; // UUID in TypeScript can be represented as a string
}


