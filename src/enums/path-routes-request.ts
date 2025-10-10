

export const PathRoutesRequest = {
    AUTH: {
    LOGIN: "/oauth2/token",
    REGISTER: "/users",
    FORGETPASSWORD: "/auth/recover-token",
    RESETPASSWORD: "/auth/new-password"
  }
} as const;