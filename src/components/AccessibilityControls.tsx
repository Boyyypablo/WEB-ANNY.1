
import { useState } from "react";
import { Settings, Headphones, ALargeSmall } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

const AccessibilityControls = () => {
  const [fontSize, setFontSize] = useState(16);

  const adjustFontSize = (increment: number) => {
    const newSize = fontSize + increment;
    if (newSize >= 12 && newSize <= 24) {
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}px`;
    }
  };

  const enableScreenReader = () => {
    // This is a simplified example. In a real implementation,
    // we would integrate with actual screen reader APIs
    document.body.setAttribute("role", "application");
    document.body.setAttribute("aria-label", "Anny Health Hub");
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80" align="end">
        <div className="space-y-4">
          <h3 className="font-medium">Acessibilidade</h3>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ALargeSmall className="h-4 w-4" />
              <span className="text-sm">Tamanho da Fonte</span>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => adjustFontSize(-1)}
              >
                A-
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => adjustFontSize(1)}
              >
                A+
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              <span className="text-sm">Leitor de Tela</span>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={enableScreenReader}
            >
              Ativar Leitor de Tela
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AccessibilityControls;
