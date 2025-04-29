
export interface SymptomEntry {
  id?: string;
  user_id?: string;
  symptom_type: string;
  intensity: number;
  notes: string;
  created_at?: string;
}

export const symptomTypes = [
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
