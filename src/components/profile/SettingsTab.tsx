
import React from "react";

const SettingsTab = () => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Configurações</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Notificações por Email</h3>
            <p className="text-sm text-anny-green/70">
              Receba atualizações sobre consultas e medicamentos
            </p>
          </div>
          <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-anny-green/30">
            <span className="absolute h-4 w-4 rounded-full bg-white left-1"></span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Notificações no Celular</h3>
            <p className="text-sm text-anny-green/70">
              Receba alertas no seu dispositivo móvel
            </p>
          </div>
          <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-anny-green">
            <span className="absolute h-4 w-4 rounded-full bg-white translate-x-5"></span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Newsletter de Saúde</h3>
            <p className="text-sm text-anny-green/70">
              Receba dicas e novidades sobre saúde
            </p>
          </div>
          <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-anny-green/30">
            <span className="absolute h-4 w-4 rounded-full bg-white left-1"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsTab;
