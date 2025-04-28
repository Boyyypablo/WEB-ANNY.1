
export type UserType = "patient" | "association";

export interface ValidationErrors {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  cpf?: string;
  cnpj?: string;
}

export interface SignUpFormData {
  email: string;
  password: string;
  passwordConfirmation: string;
  cpf?: string;
  cnpj?: string;
  userType: UserType;
}
