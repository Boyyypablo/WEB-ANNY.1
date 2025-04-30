
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { ValidationErrors } from "@/types/auth";

interface EmailFieldProps {
  validationErrors: ValidationErrors;
  onValidation: (field: string, value: string) => void;
}

export const EmailField = ({ validationErrors, onValidation }: EmailFieldProps) => {
  const [emailValue, setEmailValue] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailValue(value);
    onValidation('email', value);
  };

  return (
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
          onChange={handleEmailChange}
          required
        />
      </div>
      {validationErrors.email && (
        <p className="text-sm text-red-500">{validationErrors.email}</p>
      )}
    </div>
  );
};
