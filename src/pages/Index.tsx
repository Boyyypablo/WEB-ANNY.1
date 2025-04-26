import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, Pill, History, Tag, Heart, User, MessageSquare, ArrowRight, Settings } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 pb-10">
      <section className="bg-anny-green text-white rounded-xl shadow-md p-8 mb-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center md:items-start md:w-2/3 space-y-4">
          <img 
            src="/logo.png" 
            alt="Projeto Anny Logo" 
            className="h-24 w-auto mb-4 md:mb-6 animate-fade-in"
          />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left mb-4">
            Bem-vindo ao Projeto Anny
          </h1>
          <p className="text-lg md:text-xl mb-6 text-center md:text-left">
            Somos a primeira plataforma integrada de gestão e rastreamento de cannabis medicinal no Brasil,
            conectando pacientes, associações e governo para garantir acesso seguro ao tratamento.
          </p>
          <Button
            onClick={() => navigate("/about")}
            className="bg-white text-anny-green hover:bg-white/90 text-lg px-8 py-6 rounded-full"
          >
            Conheça Nossa História
          </Button>
        </div>
        <div className="hidden md:block md:w-1/3 flex justify-center">
          <img 
            src="/logo.png" 
            alt="Projeto Anny Logo" 
            className="h-64 w-auto object-contain animate-fade-in-slow"
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-8">Comece Aqui</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userTypes.map((type, index) => (
            <div 
              key={index} 
              className={`${type.backgroundClass} rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow`}
            >
              <h3 className="text-xl font-semibold mb-3 text-anny-green">{type.title}</h3>
              <p className="text-gray-600 mb-6">{type.description}</p>
              <Button
                onClick={type.action}
                className="w-full bg-anny-green hover:bg-anny-green/90 text-white"
              >
                {type.buttonText} <ArrowRight className="ml-2" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {primaryFeatures.map((feature, index) => (
          <div key={index} className="anny-card flex flex-col items-center text-center">
            <div className="mb-4 p-3 bg-anny-green-light rounded-full">
              {feature.icon}
            </div>
            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-anny-green/80 mb-4">{feature.description}</p>
            <button
              onClick={feature.action}
              className="anny-btn-primary mt-auto"
            >
              {feature.buttonText}
            </button>
          </div>
        ))}
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Mais serviços para você</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {secondaryFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="anny-card hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center text-center p-4"
              onClick={feature.action}
            >
              <div className="mb-3 p-2 bg-anny-green-light rounded-full">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-anny-green/80 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-center mb-6">O que nossos pacientes dizem</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="anny-card">
            <p className="italic text-anny-green/80">
              "O Projeto Anny revolucionou a forma como cuido da minha saúde. Consigo agendar consultas e comprar medicamentos sem sair de casa!"
            </p>
            <p className="font-semibold mt-4">Maria Silva</p>
          </div>
          <div className="anny-card">
            <p className="italic text-anny-green/80">
              "Os médicos são excelentes e o atendimento é sempre rápido e eficiente. Recomendo a todos!"
            </p>
            <p className="font-semibold mt-4">João Santos</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
