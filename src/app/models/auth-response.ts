export interface AuthResponse {
    data: AuthActions
}

interface AuthActions {
    login: AuthTokens
    register: AuthTokens
}

interface AuthTokens {
    access_token: string
    refresh_token: string
}
