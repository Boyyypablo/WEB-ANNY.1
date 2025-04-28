
import { useState } from "react";
import { Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const HealthDevicesPage = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [deviceData, setDeviceData] = useState<{
    heartRate?: number;
    temperature?: number;
    bloodPressure?: string;
  }>({});

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Simulated connection - in real implementation, we would use Web Bluetooth API
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDeviceData({
        heartRate: 75,
        temperature: 36.5,
        bloodPressure: "120/80"
      });
      toast.success("Dispositivo conectado com sucesso!");
    } catch (error) {
      toast.error("Erro ao conectar dispositivo");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Thermometer className="h-6 w-6 text-anny-green" />
        <h1 className="text-2xl font-bold">Dispositivos de Saúde</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="anny-card">
          <h2 className="text-xl font-bold mb-4">Conectar Dispositivo</h2>
          <Button 
            onClick={handleConnect} 
            disabled={isConnecting}
            className="w-full"
          >
            {isConnecting ? (
              <LoadingSpinner text="Conectando..." />
            ) : (
              "Conectar Dispositivo"
            )}
          </Button>
        </div>

        <div className="anny-card">
          <h2 className="text-xl font-bold mb-4">Dados do Dispositivo</h2>
          {Object.keys(deviceData).length > 0 ? (
            <div className="space-y-4">
              {deviceData.heartRate && (
                <div className="flex justify-between items-center">
                  <span className="font-medium">Frequência Cardíaca:</span>
                  <span>{deviceData.heartRate} bpm</span>
                </div>
              )}
              {deviceData.temperature && (
                <div className="flex justify-between items-center">
                  <span className="font-medium">Temperatura:</span>
                  <span>{deviceData.temperature}°C</span>
                </div>
              )}
              {deviceData.bloodPressure && (
                <div className="flex justify-between items-center">
                  <span className="font-medium">Pressão Arterial:</span>
                  <span>{deviceData.bloodPressure} mmHg</span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Nenhum dispositivo conectado
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthDevicesPage;
