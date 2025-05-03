
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="bg-anny-green text-white rounded-xl shadow-md p-8 mb-4 bg-green-800 relative">
      <div className="absolute top-2 right-2">
        <Button
          onClick={() => navigate("/auth")}
          variant="outline"
          className="bg-white text-anny-green hover:bg-white/90 gap-2"
        >
          <LogIn className="h-4 w-4" />
          Entre com sua conta
        </Button>
      </div>
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center items-center mb-8">
          <img src="/logo.png" alt="Projeto Anny" className="h-32 md:h-40 w-auto" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Bem-vindo ao Projeto Anny
        </h1>
        <p className="text-lg md:text-xl mb-6">Bem-vindo ao Projeto Anny!
Aqui, pacientes, associações e o setor público se encontram para tornar o acesso à cannabis medicinal mais fácil, seguro e acessível.
Tudo em um só lugar, com responsabilidade, informação e cuidado.</p>
        <Button onClick={() => navigate("/about")} className="bg-white text-anny-green hover:bg-white/90 text-lg px-8 py-6 rounded-full">
          Conheça Nossa História
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
