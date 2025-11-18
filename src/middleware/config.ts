export enum UserRole {
  ADMIN = "ROLE_ADMIN",
  CLIENT = "ROLE_CLIENT",
  UNKNOWN = "unknown",
}

export enum RouteGroup {
  AUTH = "auth",
  ADMIN = "admin",
  PUBLIC = "public",
  CLIENT = "client",
}

export const HOME_BY_ROLE: Record<UserRole, string> = {
  [UserRole.ADMIN]: "/admin/dashboard",
  [UserRole.CLIENT]: "/",
  [UserRole.UNKNOWN]: "/",
};

export const COOKIE_AUTH = "token";
export const ROLE_CLAIM = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

export const routeGroups: Record<RouteGroup, string[]> = {
  [RouteGroup.PUBLIC]: [
    "/",
    "/policy-privacy",
    "/terms-conditions",
  ],
  [RouteGroup.AUTH]: [
    "/login",
    "/sign-up",
    "/reset-password",
  ],
  [RouteGroup.CLIENT]: [
    "/user", 
  ],
  [RouteGroup.ADMIN]: [
    "/admin",
  ],
};

export function homeByRole(role: UserRole): string {
  return HOME_BY_ROLE[role] ?? "/";
}