
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
    // Extract form data with proper casting to prevent type inference issues
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const userTypeValue = formData.get("userType");
    
    // Explicitly validate userType to prevent type issues
    const userType: UserType = 
      userTypeValue === "patient" || userTypeValue === "association" 
        ? userTypeValue 
        : "patient"; // Default to patient if invalid
    
    // Only get CPF/CNPJ when needed based on validated userType
    const cpf = userType === "patient" ? String(formData.get("cpf") || "") : "";
    const cnpj = userType === "association" ? String(formData.get("cnpj") || "") : "";

    try {
      if (userType === "patient" && cpf) {
        // Define an explicit type for the query result to avoid excessive type inference
        type ProfileQueryResult = { data: { id: string } | null, error: any };
        
        const result: ProfileQueryResult = await supabase
          .from('profiles')
          .select('id')
          .eq('cpf', cpf.replace(/\D/g, ''))
          .single();
          
        if (result.data) {
          setError("Este CPF já está em uso");
          return;
        }
      }

      if (userType === "association" && cnpj) {
        // Use the same explicit type approach for CNPJ query
        type ProfileQueryResult = { data: { id: string } | null, error: any };
        
        const result: ProfileQueryResult = await supabase
          .from('profiles')
          .select('id')
          .eq('cnpj', cnpj.replace(/\D/g, ''))
          .single();
          
        if (result.data) {
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
      }
    } catch (error: any) {
      if (error.message.includes("already registered") || error.message.includes("User already exists")) {
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
