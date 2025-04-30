
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { ValidationErrors } from "@/types/auth";
import { toast } from "sonner";

interface PasswordFieldsProps {
  validationErrors: ValidationErrors;
  onValidation: (field: string, value: string) => void;
}

export const PasswordFields = ({ validationErrors, onValidation }: PasswordFieldsProps) => {
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [lastPasswordCheck, setLastPasswordCheck] = useState<Date | null>(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  // Check if passwords match every 5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      if (passwordValue && confirmPasswordValue) {
        const doPasswordsMatch = passwordValue === confirmPasswordValue;
        
        // Only update state and show toast if match state has changed
        if (passwordsMatch !== doPasswordsMatch) {
          setPasswordsMatch(doPasswordsMatch);
          
          if (doPasswordsMatch) {
            toast.success("Senhas coincidem!");
          } else {
            toast.error("Senhas não coincidem!");
          }
        }
        
        // Update validation errors via the parent component's handler
        onValidation('passwordConfirmation', confirmPasswordValue);
        
        setLastPasswordCheck(new Date());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [passwordValue, confirmPasswordValue, passwordsMatch, onValidation]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordValue(value);
    onValidation('password', value);
    
    // Re-validate confirmation if it exists
    if (confirmPasswordValue) {
      onValidation('passwordConfirmation', confirmPasswordValue);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPasswordValue(value);
    onValidation('passwordConfirmation', value);
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Senha</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="signup-password"
            name="password"
            type="password"
            className="pl-10"
            value={passwordValue}
            onChange={handlePasswordChange}
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
            value={confirmPasswordValue}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        {validationErrors.passwordConfirmation && (
          <p className="text-sm text-red-500">{validationErrors.passwordConfirmation}</p>
        )}
        {lastPasswordCheck && (
          <p className="text-xs text-gray-500">
            Última verificação: {lastPasswordCheck.toLocaleTimeString()}
          </p>
        )}
      </div>
    </>
  );
};
