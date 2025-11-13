'use server';

import { cookies } from "next/headers";
import { COOKIE_AUTH, UserRole } from "@/middleware/config";
import { isTokenExpired } from "@/lib/auth/token-utils";
import { decodeJwt } from "@/lib/auth/decode-jwt";

export interface AuthUser {
  role: UserRole;
  exp: number;
  isAuthenticated: boolean;
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies(); 
  return cookieStore.get(COOKIE_AUTH)?.value || null;
}

export async function getAuthenticatedUser(): Promise<AuthUser> {
  const token = await getAuthToken();

  if (!token) {
    return { role: UserRole.UNKNOWN, exp: 0, isAuthenticated: false };
  }

  const decoded = decodeJwt(token);
  if (!decoded || isTokenExpired(decoded.exp)) {
    return { role: UserRole.UNKNOWN, exp: decoded?.exp ?? 0, isAuthenticated: false };
  }

  return { role: decoded.role, exp: decoded.exp, isAuthenticated: true };
}
