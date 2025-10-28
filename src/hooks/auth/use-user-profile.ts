"use client";

import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import axios from "axios";
import { PathRoutesRequest } from "@/constants";

export function useUserProfile() {
  const token = Cookies.get("token");

  const fetchProfile = async () => {
    if (!token) throw new Error("Token não encontrado");

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URL_BASE}${PathRoutesRequest.USER.PROFILE}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchProfile,
    enabled: !!token,
    retry: false, // 🔹 evita re-tentar caso o token esteja inválido
  });

  return {
    user: data,
    isLoading,
    isError,
    isLoggedIn: !!data,
  };
}
