
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { ValidationErrors } from "@/types/auth";

// Validation schemas
const emailSchema = z.string().email("Email inválido");
const passwordSchema = z.string().min(6, "A senha deve ter pelo menos 6 caracteres");
const cnpjSchema = z.string().regex(/^\d{14}$/, "CNPJ inválido");
const cpfSchema = z.string().regex(/^\d{11}$/, "CPF inválido");

export const validateField = async (
  field: string,
  value: string,
  passwordValue?: string
): Promise<ValidationErrors> => {
  const newErrors: ValidationErrors = {};

  try {
    switch (field) {
      case 'email':
        emailSchema.parse(value);
        if (value) {
          const { error: signInError } = await supabase.auth.signInWithOtp({
            email: value,
          });
          
          if (!signInError || signInError.message.includes("Email rate limit")) {
            newErrors.email = "Este email já está em uso";
            break;
          }
        }
        break;
        
      case 'password':
        passwordSchema.parse(value);
        break;
        
      case 'passwordConfirmation':
        if (value !== passwordValue) {
          newErrors.passwordConfirmation = "As senhas não coincidem";
        }
        break;
        
      case 'cpf':
        if (value) {
          cpfSchema.parse(value.replace(/\D/g, ''));
        }
        break;
        
      case 'cnpj':
        if (value) {
          cnpjSchema.parse(value.replace(/\D/g, ''));
        }
        break;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      newErrors[field as keyof ValidationErrors] = error.errors[0].message;
    }
  }

  return newErrors;
};
