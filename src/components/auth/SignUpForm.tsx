
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Lock, Loader2 } from "lucide-react";
import { AccountTypeSelector } from "./AccountTypeSelector";
import { validateField } from "@/utils/validation";
import { ValidationErrors, UserType } from "@/types/auth";

interface SignUpFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

export const SignUpForm = ({ onSubmit, error, isLoading }: SignUpFormProps) => {
  const [userType, setUserType] = useState<UserType>("patient");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const handleValidation = async (field: string, value: string) => {
    const passwordInput = document.querySelector('[name="password"]') as HTMLInputElement;
    const newErrors = await validateField(
      field,
      value,
      passwordInput?.value,
      validationErrors
    );
    setValidationErrors(newErrors);
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(new FormData(e.currentTarget));
    }} className="space-y-6">
      <AccountTypeSelector userType={userType} onUserTypeChange={setUserType} />

      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="signup-email"
            name="email"
            type="email"
            className="pl-10"
            onChange={(e) => handleValidation('email', e.target.value)}
            required
          />
        </div>
        {validationErrors.email && (
          <p className="text-sm text-red-500">{validationErrors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password">Senha</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="signup-password"
            name="password"
            type="password"
            className="pl-10"
            onChange={(e) => handleValidation('password', e.target.value)}
            required
          />
        </div>
        {validationErrors.password && (
          <p className="text-sm text-red-500">{validationErrors.password}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password-confirmation">Confirmar Senha</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="signup-password-confirmation"
            name="passwordConfirmation"
            type="password"
            className="pl-10"
            onChange={(e) => handleValidation('passwordConfirmation', e.target.value, (document.querySelector('[name="password"]') as HTMLInputElement)?.value)}
            required
          />
        </div>
        {validationErrors.passwordConfirmation && (
          <p className="text-sm text-red-500">{validationErrors.passwordConfirmation}</p>
        )}
      </div>

      {userType === "patient" ? (
        <div className="space-y-2">
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            name="cpf"
            type="text"
            onChange={(e) => handleValidation('cpf', e.target.value)}
            required
          />
          {validationErrors.cpf && (
            <p className="text-sm text-red-500">{validationErrors.cpf}</p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input
            id="cnpj"
            name="cnpj"
            type="text"
            onChange={(e) => handleValidation('cnpj', e.target.value)}
            required
          />
          {validationErrors.cnpj && (
            <p className="text-sm text-red-500">{validationErrors.cnpj}</p>
          )}
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading || Object.keys(validationErrors).length > 0}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Cadastrando...
            </>
          ) : (
            'Cadastrar'
          )}
        </Button>
      </div>
    </form>
  );
};
