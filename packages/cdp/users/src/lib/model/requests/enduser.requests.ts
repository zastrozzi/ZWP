import { CredentialType, PhoneContactMethod, UserTitle } from "../enums";
import { ZWPISO3166Alpha2 } from '@zwp/platform.common'

export interface CreateEnduserAddressRequest {
    refinement?: string;
    number?: string;
    street?: string;
    city?: string;
    region?: string;
    postalCode: string;
    country: ZWPISO3166Alpha2;
}

export interface CreateEnduserCredentialRequest {
    credentialType: CredentialType;
    oidcUserIdentifier?: string;
    password?: string;
}

export interface CreateEnduserDeviceRequest {
    localDeviceIdentifier: string;
}

export interface CreateEnduserEmailRequest {
    emailAddressValue: string;
    isVerified: boolean;
}

export interface CreateEnduserPhoneRequest {
    phoneNumberValue: string;
    isWhatsapp: boolean;
    isSMS: boolean;
    isVoice: boolean;
    isWhatsappVerified: boolean;
    isSMSVerified: boolean;
    isVoiceVerified: boolean;
    preferredContactMethod: PhoneContactMethod;
    enduserId: string; // UUID in TypeScript can be represented as a string
}

export interface CreateEnduserRequest {
    firstName: string;
    lastName: string;
    dateOfBirth?: Date;
    nino?: string;
    title?: UserTitle;
}

export interface LoginEnduserEmailPasswordRequest {
    email: string;
    password: string;
}

export interface RefreshEnduserTokenRequest {
    refreshToken: string;
}

export interface UpdateEnduserAddressRequest {
    refinement?: string;
    number?: string;
    street?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: ZWPISO3166Alpha2;
}

export interface UpdateEnduserCredentialRequest {
    isValid: boolean;
}

export interface UpdateEnduserDeviceRequest {
    localDeviceIdentifier?: string;
}

export interface UpdateEnduserEmailRequest {
    emailAddressValue?: string;
    isVerified?: boolean;
    enduserId?: string; // UUID in TypeScript can be represented as a string
}

export interface UpdateEnduserPhoneRequest {
    phoneNumberValue?: string;
    isWhatsapp?: boolean;
    isSMS?: boolean;
    isVoice?: boolean;
    isWhatsappVerified?: boolean;
    isSMSVerified?: boolean;
    isVoiceVerified?: boolean;
    preferredContactMethod?: PhoneContactMethod;
}

export interface UpdateEnduserRequest {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    nino?: string;
    title?: UserTitle;
}


