
import { useNavigate } from "react-router-dom";
import { Tag, Heart, Settings, User } from "lucide-react";

const SecondaryFeaturesSection = () => {
  const navigate = useNavigate();
  
  const secondaryFeatures = [
    {
      icon: <Tag className="h-5 w-5 text-anny-green" />,
      title: "Promoções",
      description: "Ofertas especiais em produtos e consultas.",
      action: () => navigate("/promotions")
    }, 
    {
      icon: <Heart className="h-5 w-5 text-anny-green" />,
      title: "Favoritos",
      description: "Seus produtos e médicos favoritos.",
      action: () => navigate("/favorites")
    }, 
    {
      icon: <Settings className="h-5 w-5 text-anny-green" />,
      title: "Diário de Sintomas",
      description: "Registre e acompanhe seus sintomas.",
      action: () => navigate("/symptoms")
    }, 
    {
      icon: <User className="h-5 w-5 text-anny-green" />,
      title: "Médicos",
      description: "Conheça nossa rede de especialistas.",
      action: () => navigate("/doctors")
    }
  ];

  return (
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
  );
};

export default SecondaryFeaturesSection;
