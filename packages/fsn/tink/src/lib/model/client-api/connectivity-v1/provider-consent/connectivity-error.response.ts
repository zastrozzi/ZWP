import { ConnectivityErrorDetailsResponse } from './connectivity-error.details.response'
import { ConnectivityErrorType } from './connectivity-error.type'

export interface ConnectivityErrorResponse {
    details?: ConnectivityErrorDetailsResponse
    displayMessage?: string
    type?: ConnectivityErrorType
}