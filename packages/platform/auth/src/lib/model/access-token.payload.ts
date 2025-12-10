export enum PlatformUserRole {
    enduser = "enduser",
    adminUser = "adminUser"
}

export interface AccessTokenPayload {
    u: string;
    d: string;
    s: string;
    r: string;
    p: PlatformUserRole;
    st: number;
    iat: number;
    exp: number;
}