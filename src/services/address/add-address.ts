import axiosInstance from "@/config/axios.config";
import { PathRoutesRequest } from "@/constants";
import { AddressUserProfile } from "@/types/user";

export async function postAddAddress(data: AddressUserProfile) {
  const response = await axiosInstance.post(PathRoutesRequest.ADDRESS.NEW_ADDRESS, data);
  return response.data;
}
