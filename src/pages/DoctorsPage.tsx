
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Calendar, MapPin } from "lucide-react";
import { debouncedToast } from "@/components/ui/sonner";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  availability: string;
  address: string;
  bio: string;
}

const DoctorsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  
  // Dados de exemplo para médicos
  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dra. Fernanda Lima",
      specialty: "Neurologia",
      rating: 4.8,
      image: "/lovable-uploads/2bde0bd9-b878-4f46-95f9-abb77613dc6b.png",
      availability: "Seg-Sex, 8h-17h",
      address: "Av. Paulista, 1000 - São Paulo",
      bio: "Especialista em tratamentos com cannabis medicinal para doenças neurológicas."
    },
    {
      id: 2,
      name: "Dr. Ricardo Santos",
      specialty: "Psiquiatria",
      rating: 4.9,
      image: "/lovable-uploads/2bde0bd9-b878-4f46-95f9-abb77613dc6b.png",
      availability: "Ter-Qui, 9h-18h",
      address: "Rua Augusta, 500 - São Paulo",
      bio: "Psiquiatra com foco em tratamentos alternativos para ansiedade e depressão."
    },
    {
      id: 3,
      name: "Dra. Carolina Mendes",
      specialty: "Clínica Geral",
      rating: 4.7,
      image: "/lovable-uploads/2bde0bd9-b878-4f46-95f9-abb77613dc6b.png",
      availability: "Seg-Sáb, 8h-16h",
      address: "Av. Brasil, 1500 - Rio de Janeiro",
      bio: "Atendimento humanizado com especialização em medicina integrativa."
    }
  ];

  // Filtra médicos com base na pesquisa e especialidade
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === "all" || doctor.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  // Lista única de especialidades para o filtro
  const specialties = ["all", ...new Set(doctors.map(doctor => doctor.specialty))];

  const handleSchedule = (doctorId: number) => {
    debouncedToast.success("Redirecionando para agendamento de consulta");
    navigate("/consultation", { state: { doctorId } });
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

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Médicos e Especialistas</h1>
        
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar médico ou especialidade..."
            className="anny-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            className="anny-input"
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
          >
            <option value="all">Todas especialidades</option>
            {specialties.filter(s => s !== "all").map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="anny-card">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-16 h-16 object-cover rounded-full" 
                />
                <div>
                  <h3 className="font-semibold text-lg">{doctor.name}</h3>
                  <p className="text-anny-green/70">{doctor.specialty}</p>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 fill-anny-orange text-anny-orange" />
                    <span className="ml-1 text-sm">{doctor.rating}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm mb-3">{doctor.bio}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-anny-green" />
                  <span>{doctor.availability}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-anny-green" />
                  <span>{doctor.address}</span>
                </div>
              </div>
              
              <Button 
                className="w-full"
                onClick={() => handleSchedule(doctor.id)}
              >
                Agendar Consulta
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Nenhum médico encontrado</h3>
          <p className="mt-2 text-sm text-gray-500">
            Tente ajustar os filtros de busca.
          </p>
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
