
import { useNavigate } from "react-router-dom";
import { Info, Mail, HelpCircle, FileText } from "lucide-react";

const InstitutionalLinksSection = () => {
  const navigate = useNavigate();
  
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
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Informações Institucionais</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {institutionalLinks.map((item, index) => (
          <div 
            key={index} 
            className="anny-card hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center text-center p-4" 
            onClick={item.action}
          >
            <div className="mb-3 p-2 bg-anny-green-light rounded-full">
              {item.icon}
            </div>
            <h3 className="font-semibold mb-1">{item.title}</h3>
            <p className="text-anny-green/80 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstitutionalLinksSection;
