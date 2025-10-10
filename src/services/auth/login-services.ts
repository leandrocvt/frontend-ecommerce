import axios from "axios";
import { PathRoutesRequest } from "@/enums";
import { LoginFormValues } from "@/types/auth";

export async function postDataLogin(data: LoginFormValues) {
  const body = new URLSearchParams();
  body.append("grant_type", "password");
  body.append("username", data.email);
  body.append("password", data.password);

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_APP_URL_BASE}${PathRoutesRequest.AUTH.LOGIN}`,
    body,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(
            `${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`
          ),
      },
    }
  );

  return response.data.access_token; 
}
