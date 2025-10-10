import { ROLE_CLAIM, UserRole } from "@/middleware/config";

export interface DecodedToken {
  role: UserRole;
  exp: number; 
}

function base64UrlDecode(input: string): string {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  const b64 = (input.replace(/-/g, "+").replace(/_/g, "/")) + pad;
  return typeof atob === "function"
    ? atob(b64)
    : Buffer.from(b64, "base64").toString("binary");
}

export function decodeJwt(token: string): DecodedToken | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payloadJson = base64UrlDecode(parts[1]);
    const payload = JSON.parse(payloadJson);

    const rawRole = payload[ROLE_CLAIM];

    let role: UserRole = UserRole.UNKNOWN;
    if (Array.isArray(rawRole)) {
      if (rawRole.includes(UserRole.ADMIN)) role = UserRole.ADMIN;
      else if (rawRole.includes(UserRole.CLIENT)) role = UserRole.CLIENT;
      else role = UserRole.UNKNOWN;
    } else if (typeof rawRole === "string") {
      if (Object.values(UserRole).includes(rawRole as UserRole)) {
        role = rawRole as UserRole;
      }
    }

    return {
      role,
      exp: Number(payload.exp),
    };
  } catch {
    return null;
  }
}
