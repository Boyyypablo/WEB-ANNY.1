
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { SymptomEntry } from "@/types/symptoms";

interface SymptomEntryListProps {
  entries: SymptomEntry[];
  loading: boolean;
  editingEntry: SymptomEntry | null;
  startEditing: (entry: SymptomEntry) => void;
  deleteEntry: (id: string) => Promise<void>;
}

export function SymptomEntryList({
  entries,
  loading,
  editingEntry,
  startEditing,
  deleteEntry,
}: SymptomEntryListProps) {
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
  );
}
