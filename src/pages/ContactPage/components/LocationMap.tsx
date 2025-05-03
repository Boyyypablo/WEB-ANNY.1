
import React from "react";

const LocationMap = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-center">Nossa Localização</h2>
      <p className="text-center text-gray-700 mb-6">
        Av. Paulista, 1000 - Bela Vista<br />
        São Paulo - SP, 01310-100<br />
        Brasil
      </p>
      
      <div className="aspect-video bg-gray-200 rounded-lg">
        {/* Placeholder for map - would be replaced with an actual map component */}
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-gray-500">Mapa do Google será exibido aqui</p>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
