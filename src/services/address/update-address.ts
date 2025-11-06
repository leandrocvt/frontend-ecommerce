import axiosInstance from "@/config/axios.config";
import { PathRoutesRequest } from "@/constants";
import { AddressUserProfile } from "@/types/user";

export async function putUpdateAddress(
  addressId: number,
  data: Omit<AddressUserProfile, "id">
) {
  const url = PathRoutesRequest.ADDRESS.UPDATE_ADDRESS.replace(
    "{addressId}",
    String(addressId)
  );
  const response = await axiosInstance.put(url, data);
  return response.data;
}
