import axiosInstance from "@/config/axios.config";
import { PathRoutesRequest } from "@/constants";
import { UpdatePhonePayload } from "@/types/user/types-update-phone";

export async function patchDataUpdatePhone(data: UpdatePhonePayload) {
  const response = await axiosInstance.patch(
    PathRoutesRequest.USER.PROFILE,
    data
  );
  return response.data;
}
