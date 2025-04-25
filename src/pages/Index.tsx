
import { useNavigate } from "react-router-dom";
import { Calendar, Pill, History, Tag, Heart, User, MessageSquare } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const primaryFeatures = [
    {
      icon: <Calendar size={32} className="text-anny-green" />,
      title: "Consultas Médicas",
      description: "Agende consultas com especialistas de forma rápida e conveniente.",
      action: () => navigate("/consultation"),
      buttonText: "Agendar Consulta"
    },
    {
      icon: <Pill size={32} className="text-anny-green" />,
      title: "Medicamentos",
      description: "Compre seus medicamentos com segurança e receba em sua casa.",
      action: () => navigate("/medications"),
      buttonText: "Ver Medicamentos"
    },
    {
      icon: <History size={32} className="text-anny-green" />,
      title: "Histórico Médico",
      description: "Acesse seu histórico médico e acompanhe sua saúde.",
      action: () => navigate("/history"),
      buttonText: "Ver Histórico"
    }
  ];

  const secondaryFeatures = [
    {
      icon: <User size={24} className="text-anny-green" />,
      title: "Médicos Especialistas",
      description: "Encontre os melhores especialistas em cannabis medicinal.",
      action: () => navigate("/doctors")
    },
    {
      icon: <Tag size={24} className="text-anny-green" />,
      title: "Promoções",
      description: "Descontos especiais em medicamentos selecionados.",
      action: () => navigate("/promotions")
    },
    {
      icon: <Heart size={24} className="text-anny-green" />,
      title: "Favoritos",
      description: "Acesse seus medicamentos favoritos.",
      action: () => navigate("/favorites")
    },
    {
      icon: <MessageSquare size={24} className="text-anny-green" />,
      title: "Blog de Saúde",
      description: "Artigos e conteúdos sobre saúde e bem-estar.",
      action: () => navigate("/blog")
    }
  ];

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Hero Section */}
      <section className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-4">
        <div className="flex flex-col md:flex-row gap-6 md:items-center">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-anny-green mb-4">
              Cuidado médico de qualidade ao seu alcance
            </h1>
            <p className="text-anny-green/80 mb-6 text-lg">
              Consultas médicas, compra de medicamentos e acompanhamento de saúde em um só lugar.
            </p>
            <button 
              onClick={() => navigate("/consultation")}
              className="anny-btn-primary text-lg px-6 py-3"
            >
              Agendar Consulta
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <img 
              src="/lovable-uploads/2bde0bd9-b878-4f46-95f9-abb77613dc6b.png" 
              alt="Profissional médico com jaleco branco e estetoscópio"
              className="rounded-lg max-h-64 object-cover" 
            />
          </div>
        </div>
      </section>

      {/* Primary Features Section */}
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

      {/* Secondary Features Section */}
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

      {/* Testimonials Section */}
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
