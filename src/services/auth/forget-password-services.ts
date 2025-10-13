import axios from "axios";
import { PathRoutesRequest } from "@/enums";
import { ForgetPasswordFormValues } from "@/types/auth";

export async function postDataForgetPassword(data: ForgetPasswordFormValues) {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL_BASE}${PathRoutesRequest.AUTH.FORGETPASSWORD}`, data);
  return response.data;
}
