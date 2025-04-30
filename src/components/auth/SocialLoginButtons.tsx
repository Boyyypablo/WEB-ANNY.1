
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Google } from "lucide-react";

interface SocialLoginButtonsProps {
  isLoading: boolean;
  view: "login" | "signup";
}

export const SocialLoginButtons = ({ isLoading, view }: SocialLoginButtonsProps) => {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth`
      }
    });
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-2 text-gray-500">
            {view === "login" ? "ou entre com" : "ou cadastre-se com"}
          </span>
        </div>
      </div>
      <Button 
        type="button" 
        variant="outline" 
        onClick={handleGoogleLogin} 
        disabled={isLoading} 
        className="w-full"
      >
        <Google className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
};
