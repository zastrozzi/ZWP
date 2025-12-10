export enum CredentialsStatus {
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