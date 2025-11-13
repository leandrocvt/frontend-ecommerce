"use client";

import { getUserProfile } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import { UserProfile } from "@/types/user";
import Cookies from "js-cookie";
import { decodeJwt } from "@/lib";
import { COOKIE_AUTH } from "@/middleware/config";

export function useUserProfileQuery() {
  const token = Cookies.get(COOKIE_AUTH);
  const decoded = token ? decodeJwt(token) : null;

  return useQuery<UserProfile & { role?: string }, Error>({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    enabled: !!token,
    refetchOnWindowFocus: false,
    staleTime: 24 * 60 * 60 * 1000,
    retry: false,
    select: (data) => ({
      ...data,
      role: decoded?.role, 
    }),
  });
}
