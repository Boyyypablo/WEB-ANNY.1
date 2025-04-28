
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { FullPageSpinner } from "@/components/ui/loading-spinner";
import { UserType } from "@/types/auth";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signUp, session, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (session && !loading) {
    navigate("/home");
    return null;
  }

  if (loading) {
    return <FullPageSpinner />;
  }

  const handleSignUp = async (formData: FormData) => {
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const userTypeValue = formData.get("userType");
    const userType: UserType = userTypeValue === "patient" || userTypeValue === "association" 
      ? userTypeValue 
      : "patient";

    const address = String(formData.get("address") || "");
    const zipCode = String(formData.get("zipCode") || "");
    const position = String(formData.get("position") || "");
    const areaOfActivity = String(formData.get("areaOfActivity") || "");
    const institutionName = String(formData.get("institutionName") || "");
    const cpf = userType === "patient" ? String(formData.get("cpf") || "") : "";
    const cnpj = userType === "association" ? String(formData.get("cnpj") || "") : "";

    try {
      // Check for existing CPF (if patient)
      if (userType === "patient" && cpf) {
        const { data, error: cpfError } = await supabase
          .from('profiles')
          .select('id')
          .eq('cpf', cpf.replace(/\D/g, ''))
          .limit(1);
          
        if (cpfError) {
          console.error("Error checking CPF:", cpfError);
        }
          
        if (data && data.length > 0) {
          setError("Este CPF já está em uso");
          return;
        }
      }

      // Check for existing CNPJ (if association)
      if (userType === "association" && cnpj) {
        const { data, error: cnpjError } = await supabase
          .from('profiles')
          .select('id')
          .eq('cnpj', cnpj.replace(/\D/g, ''))
          .limit(1);
        
        if (cnpjError) {
          console.error("Error checking CNPJ:", cnpjError);
        }
          
        if (data && data.length > 0) {
          setError("Este CNPJ já está em uso");
          return;
        }
      }

      setIsLoading(true);
      setError(null);

      const { error: signUpError } = await signUp(email, password, userType);
      
      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          setError("Este email já está em uso");
        } else {
          setError(signUpError.message);
        }
        return;
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          address,
          zip_code: zipCode,
          position,
          cpf: userType === "patient" ? cpf : null,
          cnpj: userType === "association" ? cnpj : null,
          area_of_activity: areaOfActivity || null,
          institution_name: institutionName || null,
        })
        .eq('email', email);

      if (updateError) {
        console.error("Error updating profile:", updateError);
        setError("Erro ao atualizar informações do perfil");
      }

    } catch (error: any) {
      if (error.message.includes("already registered")) {
        setError("Este email já está em uso");
      } else {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-anny-bg px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center relative">
          <Button 
            variant="ghost" 
            className="absolute left-0 top-0" 
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-6 w-6 text-anny-green" />
          </Button>
          <img src="/logo.png" alt="Projeto Anny" className="h-24 w-auto mb-6" />
          <h2 className="text-2xl font-bold text-anny-green">Cadastre-se no Projeto Anny</h2>
          <p className="text-anny-green/80">Crie sua conta para começar</p>
        </div>

        <Card>
          <CardHeader className="space-y-3">
            <CardTitle>Criar conta</CardTitle>
            <CardDescription>Escolha seu tipo de conta e preencha seus dados</CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm
              onSubmit={handleSignUp}
              error={error}
              isLoading={isLoading}
            />
            
            <p className="text-center text-sm text-gray-600 mt-6">
              Já tem uma conta?{" "}
              <Link to="/auth" className="text-anny-green hover:underline">
                Fazer login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
