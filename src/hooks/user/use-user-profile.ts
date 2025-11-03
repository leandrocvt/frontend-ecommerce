"use client";

import { getUserProfile } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import { UserProfile } from "@/types/user";
import Cookies from "js-cookie";

export function useUserProfileQuery() {
  const token = Cookies.get("token");

  return useQuery<UserProfile, Error>({
    queryKey: ["userProfile"], 
    queryFn: getUserProfile,
    enabled: !!token,
    refetchOnWindowFocus: false,
    staleTime: 24 * 60 * 60 * 1000,
    retry: false,
  });
}
