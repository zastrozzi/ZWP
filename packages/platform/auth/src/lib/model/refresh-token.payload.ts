export interface RefreshTokenPayload {
    userId: string; // UUID
    deviceId: string; // UUID
    sessionId: string; // UUID
    iat: number; // TimeInterval
    exp: number; // TimeInterval
}