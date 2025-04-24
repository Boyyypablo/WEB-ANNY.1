import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { ChatDialog } from "@/components/ChatDialog";

const ConsultationPage = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatContext, setChatContext] = useState("");
  
  const doctors = [
    {
      id: 1,
      name: "Dra. Ana Souza",
      specialty: "Cardiologia",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Dr. Carlos Mendes",
      specialty: "Dermatologia",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2064&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Dra. Mariana Lima",
      specialty: "Pediatria",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2787&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Dr. Roberto Alves",
      specialty: "Ortopedia",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  const specialties = ["Cardiologia", "Dermatologia", "Pediatria", "Ortopedia", "Neurologia", "Oftalmologia"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data
    alert(`Agendamento para ${selectedSpecialty} em ${selectedDate} confirmado!`);
  };

  const openChat = (doctorName: string, specialty: string) => {
    setChatContext(`consulta com ${doctorName} (${specialty})`);
    setChatOpen(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <ChatDialog 
        open={chatOpen} 
        onOpenChange={setChatOpen}
        initialContext={chatContext}
      />
      
      <h1 className="text-2xl md:text-3xl font-bold">Agende sua Consulta Médica</h1>
      
      {/* Scheduling Form */}
      <section className="anny-card">
        <h2 className="text-xl font-semibold mb-4">Formulário de Agendamento</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="specialty" className="font-medium">Especialidade</label>
            <select 
              id="specialty"
              className="anny-input"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              required
            >
              <option value="">Selecione uma especialidade</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="font-medium">Data da Consulta</label>
            <input 
              id="date"
              type="date" 
              className="anny-input"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>
          
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="notes" className="font-medium">Observações</label>
            <textarea 
              id="notes"
              className="anny-input min-h-24"
              placeholder="Descreva brevemente o motivo da consulta (opcional)"
            />
          </div>
          
          <div className="md:col-span-2">
            <button type="submit" className="anny-btn-primary w-full">
              Confirmar Agendamento
            </button>
          </div>
        </form>
      </section>
      
      {/* Doctors List */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Nossos Especialistas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="anny-card">
              <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <h3 className="font-semibold text-lg">{doctor.name}</h3>
                  <p className="text-anny-green/70 mb-4">{doctor.specialty}</p>
                  <button 
                    className="anny-btn-primary flex items-center gap-2"
                    onClick={() => openChat(doctor.name, doctor.specialty)}
                  >
                    <MessageCircle size={16} />
                    Iniciar Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ConsultationPage;
