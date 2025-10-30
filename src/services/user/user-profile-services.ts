import { PathRoutesRequest } from "@/constants";
import axiosInstance from "@/config/axios.config";
import { UserProfile } from "@/types/user/types-user-profile";

export async function getUserProfile() {
  const response = await axiosInstance.get<UserProfile>(PathRoutesRequest.USER.PROFILE);
  return response.data;
}
