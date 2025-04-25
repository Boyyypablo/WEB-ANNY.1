
import { useState } from "react";
import { FileScan, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PrescriptionScannerPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [scannedText, setScannedText] = useState<string>("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // In a real implementation, we would use OCR service here
      simulateScanning(file);
    }
  };

  const simulateScanning = (file: File) => {
    toast.info("Escaneando receita...");
    // Simulate OCR processing
    setTimeout(() => {
      setScannedText("Exemplo de texto escaneado da receita médica...");
      toast.success("Receita escaneada com sucesso!");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="h-6 w-6 text-anny-green" />
        <h1 className="text-2xl font-bold">Scanner de Receitas</h1>
      </div>

      <div className="anny-card">
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-anny-green-light">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FileScan className="w-10 h-10 mb-3 text-anny-green" />
                <p className="mb-2 text-sm text-anny-green">
                  <span className="font-semibold">Clique para selecionar</span> ou arraste a receita
                </p>
                <p className="text-xs text-anny-green/70">
                  PDF, PNG ou JPG
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileSelect}
              />
            </label>
          </div>

          {selectedFile && (
            <div className="p-4 border rounded-lg">
              <p className="font-medium">Arquivo selecionado:</p>
              <p>{selectedFile.name}</p>
            </div>
          )}

          {scannedText && (
            <div className="p-4 border rounded-lg">
              <p className="font-medium mb-2">Texto Escaneado:</p>
              <p className="whitespace-pre-wrap">{scannedText}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionScannerPage;
