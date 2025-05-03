
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserTypeSection = () => {
  const navigate = useNavigate();
  
  const userTypes = [
    {
      title: "Para Pacientes",
      description: "Aqui você encontra associações seguras e produtos rastreados para seu tratamento.",
      action: () => navigate("/consultation"),
      buttonText: "Comece seu tratamento",
      backgroundClass: "bg-soft-green-50"
    }, 
    {
      title: "Para Associações",
      description: "Gerencie seus pacientes, produtos e documentação em uma única plataforma.",
      action: () => navigate("/association-signup"),
      buttonText: "Cadastre sua associação",
      backgroundClass: "bg-soft-blue-50"
    }, 
    {
      title: "Para Governos",
      description: "Acesse ferramentas de controle e rastreamento para garantir a segurança dos pacientes.",
      action: () => navigate("/government"),
      buttonText: "Conheça nossas soluções",
      backgroundClass: "bg-soft-orange-50"
    }
  ];

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-center mb-8">Comece Aqui</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {userTypes.map((type, index) => (
          <div key={index} className={`${type.backgroundClass} rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow`}>
            <h3 className="text-xl font-semibold mb-3 text-anny-green">{type.title}</h3>
            <p className="text-gray-600 mb-6">{type.description}</p>
            <Button onClick={type.action} className="w-full bg-anny-green hover:bg-anny-green/90 text-white">
              {type.buttonText} <ArrowRight className="ml-2" />
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserTypeSection;
