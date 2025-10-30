import axios from "axios";
import { PathRoutesRequest } from "@/constants";

export async function putDataResetPassword(data: { token: string; password: string }) {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_APP_URL_BASE}${PathRoutesRequest.AUTH.NEW_PASSWORD}`,
    data
  );
  return response.data;
}
