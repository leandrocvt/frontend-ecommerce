import axiosInstance from "@/config/axios.config";
import { PathRoutesRequest } from "@/constants";

export async function putDataUpdateEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await axiosInstance.put(
    PathRoutesRequest.USER.UPDATE_EMAIL,
    { email, password }
  );
  return response.data;
}

