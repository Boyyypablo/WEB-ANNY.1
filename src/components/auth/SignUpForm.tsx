
import { useState } from "react";
import { ValidationErrors, UserType } from "@/types/auth";
import { validateField } from "@/utils/validation";
import { PatientSignUpForm } from "./PatientSignUpForm";
import { AssociationSignUpForm } from "./AssociationSignUpForm";
import { AccountTypeSelector } from "./AccountTypeSelector";
import { EmailField } from "./EmailField";
import { PasswordFields } from "./PasswordFields";
import { FormError } from "./FormError";
import { SubmitButton } from "./SubmitButton";
import { SocialLoginButtons } from "./SocialLoginButtons";

interface SignUpFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

export const SignUpForm = ({ onSubmit, error, isLoading }: SignUpFormProps) => {
  const [userType, setUserType] = useState<UserType>("patient");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Validate field when input changes
  const handleValidation = async (field: string, value: string) => {
    // If field is empty and it's not a required validation check, remove any existing errors
    if (!value && field !== 'passwordConfirmation') {
      setValidationErrors(prev => {
        const updated = {...prev};
        delete updated[field];
        return updated;
      });
      return;
    }

    // For non-empty fields or password confirmation, validate
    const newErrors = await validateField(field, value, field === 'passwordConfirmation' ? value : undefined);
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
      
      <EmailField 
        validationErrors={validationErrors} 
        onValidation={handleValidation} 
      />

      <PasswordFields 
        validationErrors={validationErrors} 
        onValidation={handleValidation} 
      />

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

      <FormError error={error} />

      <div className="space-y-4">
        <SubmitButton 
          isLoading={isLoading} 
          isDisabled={Object.keys(validationErrors).length > 0} 
        />
        
        <SocialLoginButtons isLoading={isLoading} view="signup" />
      </div>
    </form>
  );
};
