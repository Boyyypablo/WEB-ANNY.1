
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  text: string;
  sender: string;
  timestamp: Date;
}

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialContext?: string;
}

export function ChatDialog({ open, onOpenChange, initialContext }: ChatDialogProps) {
  const [userName, setUserName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setNameSubmitted(true);
      if (initialContext) {
        setMessages([
          {
            text: `Olá ${userName}! Como posso ajudar você em relação a ${initialContext}?`,
            sender: "atendente",
            timestamp: new Date(),
          },
        ]);
      } else {
        setMessages([
          {
            text: `Olá ${userName}! Como posso ajudar você hoje?`,
            sender: "atendente",
            timestamp: new Date(),
          },
        ]);
      }
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          text: currentMessage,
          sender: userName,
          timestamp: new Date(),
        },
      ]);
      setCurrentMessage("");
    }
  };

  if (!open) return null;

  return isMinimized ? (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 cursor-pointer z-50" onClick={() => setIsMinimized(false)}>
      <div className="flex items-center gap-2">
        <MessageCircle className="text-anny-green" size={24} />
        <span className="font-medium">Chat com Atendente</span>
        <Maximize2 size={20} className="text-gray-500" />
      </div>
    </div>
  ) : (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <div className="flex flex-col h-[500px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Chat de Atendimento</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(true)}
              className="hover:bg-gray-100"
            >
              <Minimize2 size={20} />
            </Button>
          </div>
          
          {!nameSubmitted ? (
            <form onSubmit={handleNameSubmit} className="flex flex-col gap-4 p-4">
              <h2 className="text-lg font-semibold">Bem-vindo ao chat de atendimento!</h2>
              <p>Por favor, digite seu nome para começar:</p>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Seu nome"
                required
              />
              <Button type="submit">Começar Chat</Button>
            </form>
          ) : (
            <>
              <ScrollArea className="flex-1 p-4">
                <div className="flex flex-col gap-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.sender === userName ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === userName
                            ? "bg-anny-green text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        <p className="text-sm font-semibold mb-1">{message.sender}</p>
                        <p>{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                  />
                  <Button type="submit">Enviar</Button>
                </div>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
