
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Lock, Loader2 } from "lucide-react";
import { AccountTypeSelector } from "./AccountTypeSelector";
import { validateField } from "@/utils/validation";
import { ValidationErrors, UserType } from "@/types/auth";
import { PatientSignUpForm } from "./PatientSignUpForm";
import { AssociationSignUpForm } from "./AssociationSignUpForm";

interface SignUpFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

export const SignUpForm = ({ onSubmit, error, isLoading }: SignUpFormProps) => {
  const [userType, setUserType] = useState<UserType>("patient");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [emailValue, setEmailValue] = useState("");

  const handleValidation = async (field: string, value: string) => {
    if (field === 'email') {
      setEmailValue(value);
    }
    const passwordInput = document.querySelector('[name="password"]') as HTMLInputElement;
    const newErrors = await validateField(field, value, passwordInput?.value);
    setValidationErrors(prev => ({ ...prev, ...newErrors }));
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      onSubmit(formData);
    }} className="space-y-6">
      <input type="hidden" name="userType" value={userType} />
      
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
            value={emailValue}
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
            onChange={(e) => handleValidation('passwordConfirmation', e.target.value)}
            required
          />
        </div>
        {validationErrors.passwordConfirmation && (
          <p className="text-sm text-red-500">{validationErrors.passwordConfirmation}</p>
        )}
      </div>

      {userType === "patient" ? (
        <PatientSignUpForm 
          validationErrors={validationErrors} 
          onValidation={handleValidation}
        />
      ) : (
        <AssociationSignUpForm 
          validationErrors={validationErrors} 
          onValidation={handleValidation}
        />
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
              <span>Cadastrando...</span>
            </>
          ) : (
            'Cadastrar'
          )}
        </Button>
      </div>
    </form>
  );
};
