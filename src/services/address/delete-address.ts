import axiosInstance from "@/config/axios.config";
import { PathRoutesRequest } from "@/constants";

export async function deleteAddress(addressId: number) {
  const url = PathRoutesRequest.ADDRESS.DELETE_ADDRESS.replace("{addressId}", String(addressId));
  const response = await axiosInstance.delete(url);
  return response.data;
}
