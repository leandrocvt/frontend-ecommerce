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
    "/account",
    "/catalog",
    "/overview",
  ],
  [RouteGroup.ADMIN]: [
    "/admin",
    "/admin/all-products",
  ],
};

export function homeByRole(role: UserRole): string {
  if (role === UserRole.ADMIN) return "/admin";
  if (role === UserRole.CLIENT) return "/client"; 
  return "/overview";
}