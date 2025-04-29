
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { debouncedToast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, CircleCheck, Edit, PlusCircle, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Define the interface to match our database schema
interface SymptomEntry {
  id?: string;
  user_id?: string;
  symptom_type: string;
  intensity: number;
  notes: string;
  created_at?: string;
}

const symptomTypes = [
  "Dor de cabeça", 
  "Dor muscular", 
  "Ansiedade", 
  "Insônia", 
  "Náusea",
  "Fadiga",
  "Dor crônica",
  "Espasmo muscular",
  "Convulsão",
  "Outro"
];

export default function SymptomDiaryPage() {
  const { session } = useAuth();
  const [entries, setEntries] = useState<SymptomEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingEntry, setEditingEntry] = useState<SymptomEntry | null>(null);
  
  const [formData, setFormData] = useState<SymptomEntry>({
    symptom_type: symptomTypes[0],
    intensity: 5,
    notes: "",
  });

  useEffect(() => {
    fetchEntries();
  }, [session]);

  async function fetchEntries() {
    try {
      if (!session?.user) return;

      const { data, error } = await supabase
        .from('symptom_diary')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching symptom diary entries:', error);
      debouncedToast.error("Erro ao carregar registros do diário");
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (field: keyof SymptomEntry, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user) {
      debouncedToast.error("Você precisa estar logado para registrar sintomas");
      return;
    }
    
    try {
      setSubmitting(true);
      
      if (editingEntry?.id) {
        // Update existing entry
        const { error } = await supabase
          .from('symptom_diary')
          .update({
            symptom_type: formData.symptom_type,
            intensity: formData.intensity,
            notes: formData.notes,
          })
          .eq('id', editingEntry.id);

        if (error) throw error;
        debouncedToast.success("Registro atualizado com sucesso!");
      } else {
        // Create new entry
        const { error } = await supabase
          .from('symptom_diary')
          .insert([
            {
              user_id: session.user.id,
              symptom_type: formData.symptom_type,
              intensity: formData.intensity,
              notes: formData.notes,
            }
          ]);

        if (error) throw error;
        debouncedToast.success("Sintoma registrado com sucesso!");
      }
      
      // Reset form and fetch updated entries
      setFormData({
        symptom_type: symptomTypes[0],
        intensity: 5,
        notes: "",
      });
      setEditingEntry(null);
      fetchEntries();
      
    } catch (error) {
      console.error('Error saving symptom entry:', error);
      debouncedToast.error("Erro ao salvar registro");
    } finally {
      setSubmitting(false);
    }
  };

  const startEditing = (entry: SymptomEntry) => {
    setEditingEntry(entry);
    setFormData({
      symptom_type: entry.symptom_type,
      intensity: entry.intensity,
      notes: entry.notes,
    });
  };

  const cancelEditing = () => {
    setEditingEntry(null);
    setFormData({
      symptom_type: symptomTypes[0],
      intensity: 5,
      notes: "",
    });
  };

  const deleteEntry = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este registro?")) return;
    
    try {
      const { error } = await supabase
        .from('symptom_diary')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      debouncedToast.success("Registro excluído com sucesso");
      fetchEntries();
      
      if (editingEntry?.id === id) {
        cancelEditing();
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
      debouncedToast.error("Erro ao excluir registro");
    }
  };

  const getIntensityLabel = (intensity: number) => {
    if (intensity <= 2) return "Leve";
    if (intensity <= 5) return "Moderado";
    if (intensity <= 8) return "Intenso";
    return "Severo";
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity <= 2) return "bg-green-500";
    if (intensity <= 5) return "bg-yellow-500";
    if (intensity <= 8) return "bg-orange-500";
    return "bg-red-500";
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d 'de' MMMM 'às' HH:mm", { locale: ptBR });
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-bold font-poppins">Diário de Sintomas</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {editingEntry ? (
                <>
                  <Edit className="h-5 w-5" />
                  Editar Registro
                </>
              ) : (
                <>
                  <PlusCircle className="h-5 w-5" />
                  Novo Registro
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="symptomType">Tipo de Sintoma</Label>
                <Select 
                  value={formData.symptom_type} 
                  onValueChange={(value) => handleInputChange('symptom_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um sintoma" />
                  </SelectTrigger>
                  <SelectContent>
                    {symptomTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="intensity">Intensidade</Label>
                  <span className="text-sm font-medium">
                    {formData.intensity} - {getIntensityLabel(formData.intensity)}
                  </span>
                </div>
                <Slider
                  id="intensity"
                  min={1}
                  max={10}
                  step={1}
                  value={[formData.intensity]}
                  onValueChange={(values) => handleInputChange('intensity', values[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Leve</span>
                  <span>Moderado</span>
                  <span>Severo</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  placeholder="Descreva mais detalhes sobre o que está sentindo..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={submitting}
                >
                  {submitting ? "Salvando..." : editingEntry ? "Atualizar" : "Registrar"}
                </Button>
                
                {editingEntry && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={cancelEditing}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Histórico de Registros
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-anny-green mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-500">Carregando registros...</p>
                </div>
              ) : entries.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <Calendar className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Nenhum registro encontrado</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Registre seus sintomas para começar a acompanhar sua saúde.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {entries.map((entry) => (
                    <div 
                      key={entry.id} 
                      className={`p-4 rounded-lg border ${
                        editingEntry?.id === entry.id 
                          ? 'border-anny-green border-2' 
                          : 'border-gray-100'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className={`w-3 h-12 ${getIntensityColor(entry.intensity)} rounded-full`} 
                          />
                          <div>
                            <h3 className="font-medium">{entry.symptom_type}</h3>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {entry.created_at && formatDate(entry.created_at)}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-500"
                            onClick={() => startEditing(entry)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-500"
                            onClick={() => entry.id && deleteEntry(entry.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Excluir</span>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex items-center gap-2">
                        <div className="bg-gray-100 px-2 py-1 rounded text-xs">
                          Intensidade: {entry.intensity}/10 - {getIntensityLabel(entry.intensity)}
                        </div>
                      </div>
                      
                      {entry.notes && (
                        <p className="mt-3 text-sm text-gray-700">
                          {entry.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
