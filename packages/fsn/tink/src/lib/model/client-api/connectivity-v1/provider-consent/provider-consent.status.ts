import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum ProviderConsentStatus {
    created = "CREATED",
    authenticating = "AUTHENTICATING",
    awaitingMobileBankIdAuthentication = "AWAITING_MOBILE_BANKID_AUTHENTICATION",
    awaitingSupplementalInformation = "AWAITING_SUPPLEMENTAL_INFORMATION",
    updating = "UPDATING",
    updated = "UPDATED",
    authenticationError = "AUTHENTICATION_ERROR",
    temporaryError = "TEMPORARY_ERROR",
    permanentError = "PERMANENT_ERROR",
    awaitingThirdPartyAppAuthentication = "AWAITING_THIRD_PARTY_APP_AUTHENTICATION",
    deleted = "DELETED",
    sessionExpired = "SESSION_EXPIRED"
}

export enum ProviderConsentStatusLabel {
    created = "Created",
    authenticating = "Authenticating",
    awaitingMobileBankIdAuthentication = "Awaiting Mobile BankID Authentication",
    awaitingSupplementalInformation = "Awaiting Supplemental Information",
    updating = "Updating",
    updated = "Updated",
    authenticationError = "Authentication Error",
    temporaryError = "Temporary Error",
    permanentError = "Permanent Error",
    awaitingThirdPartyAppAuthentication = "Awaiting Third Party App Authentication",
    deleted = "Deleted",
    sessionExpired = "Session Expired"
}

export const providerConsentStatusLabelEnumPipe = makeTransformEnumPipeSignature(
    ProviderConsentStatus,
    ProviderConsentStatusLabel
)