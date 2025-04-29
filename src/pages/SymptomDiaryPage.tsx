
import { SymptomForm } from "@/components/symptoms/SymptomForm";
import { SymptomEntryList } from "@/components/symptoms/SymptomEntryList";
import { useSymptomDiary } from "@/hooks/useSymptomDiary";

export default function SymptomDiaryPage() {
  const {
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
  } = useSymptomDiary();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-bold font-poppins">Diário de Sintomas</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SymptomForm
            formData={formData}
            editingEntry={editingEntry}
            submitting={submitting}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            cancelEditing={cancelEditing}
          />
        </div>
        
        <div className="lg:col-span-2">
          <SymptomEntryList
            entries={entries}
            loading={loading}
            editingEntry={editingEntry}
            startEditing={startEditing}
            deleteEntry={deleteEntry}
          />
        </div>
      </div>
    </div>
  );
}
