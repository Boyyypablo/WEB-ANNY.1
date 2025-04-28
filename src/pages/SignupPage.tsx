
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Mail, Lock, Loader2, Building2, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

// Validation schemas
const emailSchema = z.string().email("Email inválido");
const passwordSchema = z.string().min(6, "A senha deve ter pelo menos 6 caracteres");
const cnpjSchema = z.string().regex(/^\d{14}$/, "CNPJ inválido");
const cpfSchema = z.string().regex(/^\d{11}$/, "CPF inválido");

export default function SignupPage() {
  const navigate = useNavigate();
  const { signUp, session, loading } = useAuth();
  const [userType, setUserType] = useState<"patient" | "association">("patient");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
    cpf?: string;
    cnpj?: string;
  }>({});

  // Redirect if already logged in
  if (session && !loading) {
    navigate("/home");
    return null;
  }

  const validateField = (field: string, value: string) => {
    const newErrors = { ...validationErrors };
    try {
      switch (field) {
        case 'email':
          emailSchema.parse(value);
          delete newErrors.email;
          break;
        case 'password':
          passwordSchema.parse(value);
          delete newErrors.password;
          break;
        case 'cpf':
          if (value) {
            cpfSchema.parse(value.replace(/\D/g, ''));
            delete newErrors.cpf;
          }
          break;
        case 'cnpj':
          if (value) {
            cnpjSchema.parse(value.replace(/\D/g, ''));
            delete newErrors.cnpj;
          }
          break;
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        newErrors[field as keyof typeof validationErrors] = error.errors[0].message;
      }
    }
    setValidationErrors(newErrors);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { error } = await signUp(email, password, userType);
      if (error) {
        setError(error.message);
      }
    } catch (error: any) {
      setError(error.message);
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
            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="space-y-3">
                <Label>Tipo de Conta</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant={userType === "patient" ? "default" : "outline"}
                    onClick={() => setUserType("patient")}
                    className="space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>Paciente</span>
                  </Button>
                  <Button
                    type="button"
                    variant={userType === "association" ? "default" : "outline"}
                    onClick={() => setUserType("association")}
                    className="space-x-2"
                  >
                    <Building2 className="h-4 w-4" />
                    <span>Associação</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    className="pl-10"
                    onChange={(e) => validateField('email', e.target.value)}
                    required
                  />
                </div>
                {validationErrors.email && (
                  <p className="text-sm text-red-500">{validationErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    className="pl-10"
                    onChange={(e) => validateField('password', e.target.value)}
                    required
                  />
                </div>
                {validationErrors.password && (
                  <p className="text-sm text-red-500">{validationErrors.password}</p>
                )}
              </div>

              {userType === "patient" ? (
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    name="cpf"
                    type="text"
                    onChange={(e) => validateField('cpf', e.target.value)}
                    required
                  />
                  {validationErrors.cpf && (
                    <p className="text-sm text-red-500">{validationErrors.cpf}</p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    name="cnpj"
                    type="text"
                    onChange={(e) => validateField('cnpj', e.target.value)}
                    required
                  />
                  {validationErrors.cnpj && (
                    <p className="text-sm text-red-500">{validationErrors.cnpj}</p>
                  )}
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || Object.keys(validationErrors).length > 0}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cadastrando...
                    </>
                  ) : (
                    'Cadastrar'
                  )}
                </Button>

                <p className="text-center text-sm text-gray-600">
                  Já tem uma conta?{" "}
                  <Link to="/auth" className="text-anny-green hover:underline">
                    Fazer login
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
