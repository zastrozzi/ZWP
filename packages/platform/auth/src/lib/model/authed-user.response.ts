export interface AuthedUserResponse<UserData> {
    accessToken: string;
    refreshToken: string;
    userData: UserData;
}