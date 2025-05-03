
import { useNavigate } from "react-router-dom";
import { Calendar, Pill, History } from "lucide-react";

const PrimaryFeaturesSection = () => {
  const navigate = useNavigate();
  
  const primaryFeatures = [
    {
      icon: <Calendar className="h-6 w-6 text-anny-green" />,
      title: "Consultas Online",
      description: "Agende consultas com médicos especialistas em cannabis medicinal.",
      action: () => navigate("/consultation"),
      buttonText: "Agendar Consulta"
    }, 
    {
      icon: <Pill className="h-6 w-6 text-anny-green" />,
      title: "Medicamentos",
      description: "Encontre produtos certificados e rastreados para seu tratamento.",
      action: () => navigate("/medications"),
      buttonText: "Ver Medicamentos"
    }, 
    {
      icon: <History className="h-6 w-6 text-anny-green" />,
      title: "Histórico Médico",
      description: "Acompanhe seu histórico de consultas, exames e tratamentos.",
      action: () => navigate("/history"),
      buttonText: "Meu Histórico"
    }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {primaryFeatures.map((feature, index) => (
        <div key={index} className="anny-card flex flex-col items-center text-center">
          <div className="mb-4 p-3 bg-anny-green-light rounded-full">
            {feature.icon}
          </div>
          <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
          <p className="text-anny-green/80 mb-4">{feature.description}</p>
          <button onClick={feature.action} className="anny-btn-primary mt-auto">
            {feature.buttonText}
          </button>
        </div>
      ))}
    </section>
  );
};

export default PrimaryFeaturesSection;
