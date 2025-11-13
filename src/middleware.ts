import type { NextRequest } from "next/server";
import { handleAuthMiddleware } from "@/middleware/auth";

export async function middleware(request: NextRequest) {
  return handleAuthMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next|static|login|sign-up|reset-password|policy-privacy|terms-conditions).*)",
  ],
};
