import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/services/auth/auth.service";
import { routeGroups, RouteGroup, UserRole, homeByRole } from "./config";

export async function handleAuthMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getAuthenticatedUser();

  if (
    routeGroups[RouteGroup.PUBLIC].some((r) => pathname.startsWith(r)) ||
    routeGroups[RouteGroup.AUTH].some((r) => pathname.startsWith(r))
  ) {
    return NextResponse.next();
  }

  if (!user.isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (routeGroups[RouteGroup.ADMIN].some((r) => pathname.startsWith(r))) {
    if (user.role !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL(homeByRole(user.role), request.url));
    }
  }

  if (routeGroups[RouteGroup.CLIENT].some((r) => pathname.startsWith(r))) {
    if (![UserRole.ADMIN, UserRole.CLIENT].includes(user.role)) {
      return NextResponse.redirect(new URL(homeByRole(user.role), request.url));
    }
  }

  return NextResponse.next();
}
