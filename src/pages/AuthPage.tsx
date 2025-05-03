
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";

export default function AuthPage() {
  const navigate = useNavigate();
  const { signIn, signUp, session, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session && !loading) {
      navigate("/home");
    }
  }, [session, loading, navigate]);

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

  const handleSignUp = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const userType = formData.get("userType") as "patient" | "association";

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
          <h2 className="text-2xl font-bold text-anny-green">Bem-vindo ao Projeto Anny</h2>
          <p className="text-anny-green/80">Sua plataforma de gestão de cannabis medicinal</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Acesse sua conta</CardTitle>
            <CardDescription>Escolha seu tipo de acesso abaixo</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Cadastro</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" name="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Senha</Label>
                    <Input id="login-password" name="password" type="password" required />
                  </div>
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                  
                  <SocialLoginButtons isLoading={isLoading} view="login" />
                </form>
              </TabsContent>

              <TabsContent value="register">
                <SignUpForm 
                  onSubmit={handleSignUp} 
                  error={error}
                  isLoading={isLoading} 
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
