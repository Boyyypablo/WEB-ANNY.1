
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
}

export const SubmitButton = ({ isLoading, isDisabled }: SubmitButtonProps) => {
  return (
    <Button 
      type="submit" 
      className="w-full" 
      disabled={isLoading || isDisabled}
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
  );
};
