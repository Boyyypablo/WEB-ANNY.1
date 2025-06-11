import { useNavigate } from "react-router-dom";
import { Calendar, Pill, History, Tag, Heart, User, MessageSquare, ArrowRight, Settings, LogIn, HelpCircle, FileText, Info, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const userTypes = [{
    title: "Para Pacientes",
    description: "Acesso fácil, seguro e humano.\n\nEncontre associações credenciadas, escolha seu tratamento e tenha apoio para cuidar da sua saúde com tranquilidade.",
    action: () => navigate("/consultation"),
    buttonText: "Comece seu tratamento",
    backgroundClass: "bg-soft-green-50"
  }, {
    title: "Para Associações",
    description: "Gerencie seus pacientes, produtos e documentação em uma única plataforma.",
    action: () => navigate("/association-signup"),
    buttonText: "Cadastre sua associação",
    backgroundClass: "bg-soft-blue-50"
  }, {
    title: "Para Governos",
    description: "Acesse ferramentas de controle e rastreamento para garantir a segurança dos pacientes.",
    action: () => navigate("/government"),
    buttonText: "Conheça nossas soluções",
    backgroundClass: "bg-soft-orange-50"
  }];
  const primaryFeatures = [{
    icon: <Calendar className="h-6 w-6 text-anny-green" />,
    title: "Consultas Online",
    description: "Agende consultas com médicos especialistas em cannabis medicinal.",
    action: () => navigate("/consultation"),
    buttonText: "Agendar Consulta"
  }, {
    icon: <Pill className="h-6 w-6 text-anny-green" />,
    title: "Medicamentos",
    description: "Encontre produtos certificados e rastreados para seu tratamento.",
    action: () => navigate("/medications"),
    buttonText: "Ver Medicamentos"
  }, {
    icon: <History className="h-6 w-6 text-anny-green" />,
    title: "Histórico Médico",
    description: "Acompanhe seu histórico de consultas, exames e tratamentos.",
    action: () => navigate("/history"),
    buttonText: "Meu Histórico"
  }];
  const secondaryFeatures = [
    {
      icon: <Tag className="h-5 w-5 text-anny-green" />,
      title: "Promoções",
      description: "Ofertas especiais em produtos e consultas.",
      action: () => navigate("/promotions")
    }, {
      icon: <Heart className="h-5 w-5 text-anny-green" />,
      title: "Favoritos",
      description: "Seus produtos e médicos favoritos.",
      action: () => navigate("/favorites")
    }, {
      icon: <Settings className="h-5 w-5 text-anny-green" />,
      title: "Diário de Sintomas",
      description: "Registre e acompanhe seus sintomas.",
      action: () => navigate("/symptoms")
    }, {
      icon: <User className="h-5 w-5 text-anny-green" />,
      title: "Médicos",
      description: "Conheça nossa rede de especialistas.",
      action: () => navigate("/doctors")
    }
  ];
  
  const institutionalLinks = [
    {
      icon: <Info className="h-5 w-5 text-anny-green" />,
      title: "Sobre Nós",
      description: "Conheça nossa história e missão",
      action: () => navigate("/about")
    },
    {
      icon: <Mail className="h-5 w-5 text-anny-green" />,
      title: "Contato",
      description: "Fale conosco por e-mail ou telefone",
      action: () => navigate("/contact")
    },
    {
      icon: <HelpCircle className="h-5 w-5 text-anny-green" />,
      title: "FAQ",
      description: "Respostas às dúvidas frequentes",
      action: () => navigate("/faq")
    },
    {
      icon: <FileText className="h-5 w-5 text-anny-green" />,
      title: "Políticas",
      description: "Termos e condições de uso",
      action: () => navigate("/policies")
    }
  ];

  return (
    <div className="flex flex-col gap-6 pb-10">
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
          <p className="text-lg md:text-xl mb-6">
            Bem-vindo ao Projeto Anny! Aqui, pacientes, associações e o setor público se encontram para tornar o acesso à cannabis medicinal mais fácil, seguro e acessível. Tudo em um só lugar, com responsabilidade, informação e cuidado.
          </p>
          <Button onClick={() => navigate("/about")} className="bg-white text-anny-green hover:bg-white/90 text-lg px-8 py-6 rounded-full">
            Conheça Nossa História
          </Button>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-8">Comece Aqui</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userTypes.map((type, index) => <div key={index} className={`${type.backgroundClass} rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow`}>
              <h3 className="text-xl font-semibold mb-3 text-anny-green">{type.title}</h3>
              <p className="text-gray-600 mb-6 whitespace-pre-line">{type.description}</p>
              <Button onClick={type.action} className="w-full bg-anny-green hover:bg-anny-green/90 text-white">
                {type.buttonText} <ArrowRight className="ml-2" />
              </Button>
            </div>)}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {primaryFeatures.map((feature, index) => <div key={index} className="anny-card flex flex-col items-center text-center">
            <div className="mb-4 p-3 bg-anny-green-light rounded-full">
              {feature.icon}
            </div>
            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-anny-green/80 mb-4">{feature.description}</p>
            <button onClick={feature.action} className="anny-btn-primary mt-auto">
              {feature.buttonText}
            </button>
          </div>)}
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Mais serviços para você</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {secondaryFeatures.map((feature, index) => <div key={index} className="anny-card hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center text-center p-4" onClick={feature.action}>
              <div className="mb-3 p-2 bg-anny-green-light rounded-full">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-anny-green/80 text-sm">{feature.description}</p>
            </div>)}
        </div>
      </section>
      
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Informações Institucionais</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {institutionalLinks.map((item, index) => <div key={index} className="anny-card hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center text-center p-4" onClick={item.action}>
              <div className="mb-3 p-2 bg-anny-green-light rounded-full">
                {item.icon}
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-anny-green/80 text-sm">{item.description}</p>
            </div>)}
        </div>
      </section>
    </div>
  );
};

export default Index;
