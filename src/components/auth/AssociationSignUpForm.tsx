
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ValidationErrors } from "@/types/auth";

interface AssociationFormProps {
  validationErrors: ValidationErrors;
  onValidation: (field: string, value: string) => void;
}

export const AssociationSignUpForm = ({ validationErrors, onValidation }: AssociationFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cnpj">CNPJ</Label>
        <Input
          id="cnpj"
          name="cnpj"
          type="text"
          onChange={(e) => onValidation('cnpj', e.target.value)}
          required
        />
        {validationErrors.cnpj && (
          <p className="text-sm text-red-500">{validationErrors.cnpj}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="institutionName">Nome da Instituição</Label>
        <Input
          id="institutionName"
          name="institutionName"
          type="text"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="position">Cargo ou Função</Label>
        <Input
          id="position"
          name="position"
          type="text"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="areaOfActivity">Área de Atuação</Label>
        <Input
          id="areaOfActivity"
          name="areaOfActivity"
          type="text"
          required
        />
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
