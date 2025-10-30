import Cookies from "js-cookie";
import axios, { AxiosHeaders } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  config.headers = AxiosHeaders.from(config.headers || {});

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token inválido ou sessão expirada.");

      Cookies.remove("token");

      if (typeof window !== "undefined") {
        window.location.href = "/"; 
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Erro: tempo de requisição esgotado.");
    } else {
      console.error(
        "Erro na requisição:",
        error.response?.data || error.message
      );
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
