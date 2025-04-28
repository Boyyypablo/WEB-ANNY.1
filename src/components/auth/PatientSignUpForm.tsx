
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PatientFormProps {
  validationErrors: Record<string, string>;
  onValidation: (field: string, value: string) => void;
}

export const PatientSignUpForm = ({ validationErrors, onValidation }: PatientFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cpf">CPF</Label>
        <Input
          id="cpf"
          name="cpf"
          type="text"
          onChange={(e) => onValidation('cpf', e.target.value)}
          required
        />
        {validationErrors.cpf && (
          <p className="text-sm text-red-500">{validationErrors.cpf}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Endereço Completo</Label>
        <Input
          id="address"
          name="address"
          type="text"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="zipCode">CEP</Label>
        <Input
          id="zipCode"
          name="zipCode"
          type="text"
          required
        />
      </div>
    </div>
  );
};
