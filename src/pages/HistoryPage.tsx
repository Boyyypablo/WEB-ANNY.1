import { Calendar, Clock, Activity, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const HistoryPage = () => {
  const appointments = [
    {
      id: 1,
      doctor: "Dra. Ana Souza",
      specialty: "Cardiologia",
      date: "15/04/2025",
      time: "10:30",
      status: "Concluído"
    },
    {
      id: 2,
      doctor: "Dr. Roberto Alves",
      specialty: "Ortopedia",
      date: "27/03/2025",
      time: "14:00",
      status: "Concluído"
    },
    {
      id: 3,
      doctor: "Dra. Mariana Lima",
      specialty: "Pediatria",
      date: "10/05/2025",
      time: "09:15",
      status: "Agendado"
    }
  ];
  
  const medications = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      prescription: "Dr. Carlos Mendes",
      date: "22/03/2025",
      instructions: "1 comprimido a cada 8 horas por 5 dias"
    },
    {
      id: 2,
      name: "Ibuprofeno 400mg",
      prescription: "Dra. Ana Souza",
      date: "15/04/2025",
      instructions: "1 comprimido a cada 12 horas por 3 dias"
    }
  ];
  
  const examResults = [
    {
      id: 1,
      name: "Hemograma Completo",
      date: "20/03/2025",
      doctor: "Dra. Ana Souza",
      status: "Normal",
      hasDetails: true
    },
    {
      id: 2,
      name: "Raio-X Joelho Direito",
      date: "27/03/2025",
      doctor: "Dr. Roberto Alves",
      status: "Alterado",
      hasDetails: false
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl md:text-3xl font-bold">Histórico Médico</h1>
      
      {/* Appointments History */}
      <section className="anny-card">
        <h2 className="text-xl font-semibold mb-4">Consultas</h2>
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map(appointment => (
              <div key={appointment.id} className="flex items-center gap-4 border-b border-gray-100 pb-4">
                <div className="bg-anny-green-light p-3 rounded-lg">
                  <Calendar size={24} className="text-anny-green" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{appointment.doctor}</h3>
                  <p className="text-sm text-anny-green/70">{appointment.specialty}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Clock size={14} />
                    <p className="text-sm">{appointment.date} às {appointment.time}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    appointment.status === 'Concluído' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-anny-green/70 text-center py-4">Nenhuma consulta em seu histórico</p>
        )}
      </section>
      
      {/* Medications History */}
      <section className="anny-card">
        <h2 className="text-xl font-semibold mb-4">Medicamentos Prescritos</h2>
        {medications.length > 0 ? (
          <div className="space-y-4">
            {medications.map(medication => (
              <div key={medication.id} className="border-b border-gray-100 pb-4">
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold">{medication.name}</h3>
                  <p className="text-sm">{medication.date}</p>
                </div>
                <p className="text-sm mb-1">Prescrito por: {medication.prescription}</p>
                <p className="text-sm text-anny-green/70">{medication.instructions}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-anny-green/70 text-center py-4">Nenhuma medicação em seu histórico</p>
        )}
      </section>
      
      {/* Exam Results */}
      <section className="anny-card">
        <h2 className="text-xl font-semibold mb-4">Resultados de Exames</h2>
        {examResults.length > 0 ? (
          <div className="space-y-4">
            {examResults.map(exam => (
              <div key={exam.id} className="flex items-center gap-4 border-b border-gray-100 pb-4">
                <div className="bg-anny-green-light p-3 rounded-lg">
                  <Activity size={24} className="text-anny-green" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{exam.name}</h3>
                  <p className="text-sm text-anny-green/70">Dr. {exam.doctor}</p>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <p className="text-sm">{exam.date}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      exam.status === 'Normal' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {exam.status}
                    </span>
                    {exam.hasDetails && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 p-0 h-auto"
                        onClick={() => window.location.href = `/history/exam/${exam.id}`}
                      >
                        <Info className="w-4 h-4 mr-1" />
                        + detalhes
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-anny-green/70 text-center py-4">Nenhum resultado de exame em seu histórico</p>
        )}
      </section>
    </div>
  );
};

export default HistoryPage;
