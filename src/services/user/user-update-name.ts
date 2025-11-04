import axiosInstance from "@/config/axios.config";
import { PathRoutesRequest } from "@/constants";
import { UpdateNamePayload } from "@/types/user/types-update-name";

export async function patchDataUpdateName(data: UpdateNamePayload) {
  const response = await axiosInstance.patch(
    PathRoutesRequest.USER.PROFILE,
    data
  );
  return response.data;
}
