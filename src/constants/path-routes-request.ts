export const PathRoutesRequest = {
  AUTH: {
    LOGIN: "/oauth2/token",
    REGISTER: "/users",
    FORGETPASSWORD: "/auth/recover-token",
    NEWPASSWORD: "/auth/new-password",
  },
  USER: {
    PROFILE: "/users/profile",
  },
} as const;
