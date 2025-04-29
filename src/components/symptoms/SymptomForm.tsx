
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import { Edit, PlusCircle } from "lucide-react";
import { SymptomEntry, symptomTypes } from "@/types/symptoms";

interface SymptomFormProps {
  formData: SymptomEntry;
  editingEntry: SymptomEntry | null;
  submitting: boolean;
  handleInputChange: (field: keyof SymptomEntry, value: any) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  cancelEditing: () => void;
}

export function SymptomForm({
  formData,
  editingEntry,
  submitting,
  handleInputChange,
  handleSubmit,
  cancelEditing,
}: SymptomFormProps) {
  const getIntensityLabel = (intensity: number) => {
    if (intensity <= 2) return "Leve";
    if (intensity <= 5) return "Moderado";
    if (intensity <= 8) return "Intenso";
    return "Severo";
  };

  return (
    <Card>
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
  );
}
