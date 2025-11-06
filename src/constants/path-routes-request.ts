export const PathRoutesRequest = {
  AUTH: {
    LOGIN: "/oauth2/token",
    REGISTER: "/users",
    FORGET_PASSWORD: "/auth/recover-token",
    NEW_PASSWORD: "/auth/new-password",
  },
  USER: {
    PROFILE: "/users/profile",
    UPDATE_EMAIL: "/users/email",
    UPDATE_PASSWORD: "/users/password",
  },
  ADDRESS: {
    NEW_ADDRESS: "/address",
    UPDATE_ADDRESS: "/address/{addressId}",
    DELETE_ADDRESS: "/address/{addressId}",
  },
} as const;
