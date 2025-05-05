import { Button } from "@/components/ui/button";
interface SocialLoginButtonsProps {
  isLoading: boolean;
  view: "login" | "signup";
}
export const SocialLoginButtons = ({
  isLoading,
  view
}: SocialLoginButtonsProps) => {
  return <div className="space-y-2">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        
      </div>
    </div>;
};