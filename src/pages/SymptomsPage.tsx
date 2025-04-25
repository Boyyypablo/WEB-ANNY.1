
import { useState } from "react";
import { Activity } from "lucide-react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type SymptomEntry = {
  date: string;
  symptom: string;
  intensity: number;
  notes: string;
};

const SymptomsPage = () => {
  const [entries, setEntries] = useState<SymptomEntry[]>([]);
  const form = useForm<SymptomEntry>();

  const onSubmit = (data: SymptomEntry) => {
    setEntries([...entries, data]);
    form.reset();
    toast.success("Sintoma registrado com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Activity className="h-6 w-6 text-anny-green" />
        <h1 className="text-2xl font-bold">Diário de Sintomas</h1>
      </div>

      <div className="anny-card">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-medium">Data</label>
                <Input type="date" {...form.register("date")} />
              </div>
              <div className="space-y-2">
                <label className="font-medium">Sintoma</label>
                <Input {...form.register("symptom")} placeholder="Descreva o sintoma" />
              </div>
              <div className="space-y-2">
                <label className="font-medium">Intensidade (1-10)</label>
                <Input 
                  type="number" 
                  min="1" 
                  max="10" 
                  {...form.register("intensity")} 
                />
              </div>
              <div className="space-y-2">
                <label className="font-medium">Observações</label>
                <Input {...form.register("notes")} placeholder="Observações adicionais" />
              </div>
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Registrar Sintoma
            </Button>
          </form>
        </Form>
      </div>

      <div className="anny-card">
        <h2 className="text-xl font-bold mb-4">Histórico de Sintomas</h2>
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="grid grid-cols-2 gap-2">
                <p><span className="font-medium">Data:</span> {entry.date}</p>
                <p><span className="font-medium">Sintoma:</span> {entry.symptom}</p>
                <p><span className="font-medium">Intensidade:</span> {entry.intensity}</p>
                <p><span className="font-medium">Observações:</span> {entry.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SymptomsPage;
