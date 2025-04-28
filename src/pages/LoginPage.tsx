
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Mail, Lock, Loader2, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

// Email validation schema
const emailSchema = z.string().email("Email inválido");

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn, session, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  // Redirect if already logged in
  if (session && !loading) {
    navigate("/home");
    return null;
  }

  const validateEmail = (email: string) => {
    try {
      emailSchema.parse(email);
      setEmailError(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.errors[0].message);
      }
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { error } = await signIn(email, password);
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
          <h2 className="text-2xl font-bold text-anny-green">Bem-vindo ao Projeto Anny</h2>
          <p className="text-anny-green/80">Sua plataforma de gestão de cannabis medicinal</p>
        </div>

        <Card>
          <CardHeader className="space-y-3">
            <CardTitle>Entrar</CardTitle>
            <CardDescription>Digite suas credenciais para acessar sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      validateEmail(e.target.value);
                    }}
                    required
                  />
                </div>
                {emailError && (
                  <p className="text-sm text-red-500">{emailError}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading || !!emailError}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    'Entrar'
                  )}
                </Button>

                <p className="text-center text-sm text-gray-600">
                  Não tem uma conta?{" "}
                  <Link to="/signup" className="text-anny-green hover:underline">
                    Cadastre-se
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
