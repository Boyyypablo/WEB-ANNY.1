
import { useParams, useNavigate } from "react-router-dom";
import { Activity, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ExamDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Simulando dados do exame - em uma aplicação real, isso viria de uma API
  const examData = {
    id: 1,
    name: "Hemograma Completo",
    date: "20/03/2025",
    doctor: "Dra. Ana Souza",
    status: "Normal",
    details: {
      redBloodCells: "4.8 milhões/µL",
      whiteBloodCells: "7.500/µL",
      platelets: "250.000/µL",
      hemoglobin: "14 g/dL",
      hematocrit: "42%"
    }
  };

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
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-anny-green-light p-3 rounded-lg">
            <Activity size={24} className="text-anny-green" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{examData.name}</h1>
            <p className="text-anny-green/70">Dr. {examData.doctor}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Data do Exame</p>
            <p>{examData.date}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Status</p>
            <span className={`text-sm px-2 py-0.5 rounded-full ${
              examData.status === 'Normal' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-amber-100 text-amber-800'
            }`}>
              {examData.status}
            </span>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-4">Resultados</h2>
            <div className="space-y-4">
              {Object.entries(examData.details).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetailsPage;
