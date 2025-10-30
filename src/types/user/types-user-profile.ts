export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  cpf: string;
  roles: { authority: string }[];
  addresses: AddressUserProfile[]
};

export interface AddressUserProfile{
    alias: string;
    road: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    number: string;
    complement: string;
}