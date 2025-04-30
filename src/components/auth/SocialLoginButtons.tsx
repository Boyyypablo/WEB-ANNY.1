
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

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
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z"
          />
        </svg>
        Google
      </Button>
    </div>
  );
};
