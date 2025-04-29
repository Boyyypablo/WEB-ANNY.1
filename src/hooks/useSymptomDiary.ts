
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { debouncedToast } from "@/components/ui/sonner";
import { SymptomEntry, symptomTypes } from "@/types/symptoms";
import { useAuth } from "@/contexts/AuthContext";

export function useSymptomDiary() {
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
      resetForm();
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
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      symptom_type: symptomTypes[0],
      intensity: 5,
      notes: "",
    });
    setEditingEntry(null);
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

  return {
    entries,
    loading,
    formData,
    editingEntry,
    submitting,
    handleInputChange,
    handleSubmit,
    startEditing,
    cancelEditing,
    deleteEntry
  };
}
