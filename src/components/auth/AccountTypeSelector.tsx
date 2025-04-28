
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Building2, User } from "lucide-react";
import { UserType } from "@/types/auth";

interface AccountTypeSelectorProps {
  userType: UserType;
  onUserTypeChange: (type: UserType) => void;
}

export const AccountTypeSelector = ({ userType, onUserTypeChange }: AccountTypeSelectorProps) => {
  return (
    <div className="space-y-3">
      <Label>Tipo de Conta</Label>
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant={userType === "patient" ? "default" : "outline"}
          onClick={() => onUserTypeChange("patient")}
          className="space-x-2"
        >
          <User className="h-4 w-4" />
          <span>Paciente</span>
        </Button>
        <Button
          type="button"
          variant={userType === "association" ? "default" : "outline"}
          onClick={() => onUserTypeChange("association")}
          className="space-x-2"
        >
          <Building2 className="h-4 w-4" />
          <span>Associação</span>
        </Button>
      </div>
    </div>
  );
};
