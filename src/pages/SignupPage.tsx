import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { FullPageSpinner } from "@/components/ui/loading-spinner";

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
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const userType = formData.get("userType") as "patient" | "association";
    const cpf = userType === "patient" ? formData.get("cpf") as string : "";
    const cnpj = userType === "association" ? formData.get("cnpj") as string : "";

    try {
      if (userType === "patient" && cpf) {
        const { data: cpfData } = await supabase
          .from('profiles')
          .select('id')
          .eq('cpf', cpf.replace(/\D/g, ''))
          .single();
          
        if (cpfData) {
          setError("Este CPF já está em uso");
          return;
        }
      }

      if (userType === "association" && cnpj) {
        const { data: cnpjData } = await supabase
          .from('profiles')
          .select('id')
          .eq('cnpj', cnpj.replace(/\D/g, ''))
          .single();
          
        if (cnpjData) {
          setError("Este CNPJ já está em uso");
          return;
        }
      }

      setIsLoading(true);
      setError(null);

      const { error } = await signUp(email, password, userType);
      if (error) {
        if (error.message.includes("already registered")) {
          setError("Este email já está em uso");
        } else {
          setError(error.message);
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
