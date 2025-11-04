import axiosInstance from "@/config/axios.config";
import { PathRoutesRequest } from "@/constants";

export async function putDataUpdatePassword({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) {
  const response = await axiosInstance.put(
    PathRoutesRequest.USER.UPDATE_PASSWORD,
    { currentPassword, newPassword }
  );
  return response.data;
}
