import axios from "axios";
import { PathRoutesRequest } from "@/constants";
import { SignUpPayload, SignUpSchemaFormValues } from "@/types/auth";

export async function postDataSignUp(data: SignUpPayload) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_APP_URL_BASE}${PathRoutesRequest.AUTH.REGISTER}`,
    data
  );
  return response.data;
}

export function toSignUpPayload(data: SignUpSchemaFormValues): SignUpPayload {
  return {
    firstName: data.first_name?.trim() ?? "",
    lastName: data.last_name?.trim() ?? "",
    email: data.email?.trim() ?? "",
    password: data.password,
    phone: data.phone?.replace(/\D/g, "") ?? "",
    cpf: data.cpf?.replace(/\D/g, "") ?? "",
    birthDate: data.birth_date,
    address: {
      alias: data.address?.alias?.trim() ?? "",
      road: data.address?.road?.trim() ?? "",
      neighborhood: data.address?.neighborhood?.trim() ?? "",
      city: data.address?.city?.trim() ?? "",
      state: data.address?.state?.trim() ?? "",
      zipCode: data.address?.zip_code?.replace(/\D/g, "") ?? "",
      number: data.address?.number?.trim() ?? "",
      complement: data.address?.complement ?? "",
    },
  };
}


