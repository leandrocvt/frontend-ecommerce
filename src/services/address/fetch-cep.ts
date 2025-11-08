import axios from "axios";

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export async function fetchCep(zipCode: string): Promise<ViaCepResponse> {
  const cleanCep = zipCode.replace(/\D/g, "");
  if (cleanCep.length !== 8) throw new Error("CEP inválido.");

  const { data } = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);

  if (data.erro) throw new Error("CEP não encontrado.");

  return {
    cep: data.cep || "",
    logradouro: data.logradouro || "",
    complemento: data.complemento || "",
    bairro: data.bairro || "",
    localidade: data.localidade || "",
    uf: data.uf || "",
  };
}
