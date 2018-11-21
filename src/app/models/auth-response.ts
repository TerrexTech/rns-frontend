export interface AuthResponse {
    data: AuthActions
}

interface AuthActions {
    login: AuthTokens
    register: AuthTokens
}

interface AuthTokens {
    accessToken: string
    refreshToken: string
}
