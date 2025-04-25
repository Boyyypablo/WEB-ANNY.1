import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ExamDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // In a real app, we would fetch the exam details using the ID
  const examDetails = null;

  if (!examDetails) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-anny-green hover:text-anny-green/90"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>

        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Exame não encontrado</h3>
          <p className="mt-2 text-sm text-gray-500">
            Não foi possível encontrar os detalhes deste exame.
          </p>
          <Button 
            className="mt-4"
            onClick={() => navigate("/history")}
          >
            Ver Todos os Exames
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        className="flex items-center gap-2 text-anny-green hover:text-anny-green/90"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Button>

      <div className="anny-card">
        <h1 className="text-2xl font-bold mb-6">Detalhes do Exame #{id}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Informações Gerais</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Data do Exame</p>
                <p className="font-medium">15/04/2025</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Médico Responsável</p>
                <p className="font-medium">Dr. Carlos Mendes</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Especialidade</p>
                <p className="font-medium">Neurologia</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tipo de Exame</p>
                <p className="font-medium">Eletroencefalograma (EEG)</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Resultados</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium text-green-600">Concluído</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Laudo</p>
                <p className="font-medium">
                  Exame de eletroencefalograma realizado em vigília e sono induzido. 
                  Não foram observadas anormalidades na atividade elétrica cerebral. 
                  Ritmo de base normal para a idade.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Observações Adicionais</h2>
          <p>
            Paciente compareceu ao exame em boas condições. Não houve intercorrências 
            durante a realização do procedimento. Recomenda-se acompanhamento regular 
            com o neurologista.
          </p>
        </div>
        
        <div className="mt-8 flex gap-4">
          <Button>Baixar Laudo (PDF)</Button>
          <Button variant="outline">Compartilhar</Button>
        </div>
      </div>
    </div>
  );
};

export default ExamDetailsPage;
