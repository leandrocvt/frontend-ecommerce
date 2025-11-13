import { ROLE_CLAIM, UserRole } from "@/middleware/config";

export interface DecodedToken {
  role: UserRole;
  exp: number;
}

function base64UrlDecode(input: string): string {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/") + pad;
  return typeof atob === "function"
    ? atob(b64)
    : Buffer.from(b64, "base64").toString("binary");
}

export function decodeJwt(token: string): DecodedToken | null {
  try {
    const [, payloadBase64] = token.split(".");
    if (!payloadBase64) return null;

    const payloadJson = base64UrlDecode(payloadBase64);
    const payload = JSON.parse(payloadJson);

    const possibleClaims = [
      payload[ROLE_CLAIM],
      payload["roles"],
      payload["authorities"],
      payload["scope"],
    ].filter(Boolean) as unknown[];

    const rawRole: string[] = possibleClaims.flat().map(String);

    let role: UserRole = UserRole.UNKNOWN;

    if (rawRole.some((r) => r.includes(UserRole.ADMIN))) {
      role = UserRole.ADMIN;
    } else if (rawRole.some((r) => r.includes(UserRole.CLIENT))) {
      role = UserRole.CLIENT;
    }

    return { role, exp: Number(payload.exp) };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Erro ao decodificar token:", error);
    }
    return null;
  }
}
