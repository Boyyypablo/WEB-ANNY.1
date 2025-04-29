
import React, { useState, useEffect } from "react";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  
  // Redirect if already logged in
  useEffect(() => {
    if (session && !loading) {
      navigate("/home");
    }
  }, [session, loading, navigate]);

  const handleSignUp = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const userType = formData.get("userType") as "patient" | "association";
      
      // Create the user account
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            type: userType
          }
        }
      });

      if (signUpError) throw signUpError;

      if (data?.user) {
        // Create profile based on user type
        if (userType === "patient") {
          const { error: profileError } = await supabase.from("profiles").insert({
            id: data.user.id,
            email,
            user_type: userType,
            cpf: formData.get("cpf") as string,
            address: formData.get("address") as string,
            zip_code: formData.get("zipCode") as string,
          });

          if (profileError) throw profileError;
        } else {
          // Create association profile
          const { error: profileError } = await supabase.from("profiles").insert({
            id: data.user.id,
            email,
            user_type: userType,
            address: formData.get("address") as string,
            zip_code: formData.get("zipCode") as string,
            position: formData.get("position") as string,
          });

          if (profileError) throw profileError;

          // Create tenant for association
          const { error: tenantError } = await supabase.from("tenants").insert({
            cnpj: formData.get("cnpj") as string,
            institution_name: formData.get("institutionName") as string,
            area_of_activity: formData.get("areaOfActivity") as string,
            name: formData.get("institutionName") as string,
            type: userType,
          });

          if (tenantError) throw tenantError;
        }

        toast.success("Cadastro realizado com sucesso! Por favor, faça login.");
        navigate("/auth");
      }
    } catch (err: any) {
      console.error("Erro no cadastro:", err);
      setError(err.message || "Erro ao realizar cadastro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-anny-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-anny-green"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Criar Conta</h1>
          <p className="mt-2 text-gray-600">
            Preencha os campos abaixo para se cadastrar
          </p>
        </div>
        
        <SignUpForm 
          onSubmit={handleSignUp} 
          error={error}
          isLoading={isLoading} 
        />
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{" "}
            <a href="/auth" className="font-medium text-primary hover:text-primary/80">
              Faça login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
