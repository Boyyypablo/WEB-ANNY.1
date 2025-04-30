
export const useProductDelivery = () => {
  // Calcula prazo de entrega estimado (simulação)
  const deliveryEstimate = () => {
    const today = new Date();
    const minDays = 3;
    const maxDays = 7;
    
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + minDays);
    
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + maxDays);
    
    const formatOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    return {
      min: minDate.toLocaleDateString('pt-BR', formatOptions),
      max: maxDate.toLocaleDateString('pt-BR', formatOptions)
    };
  };

  // Função para calcular o custo de frete baseado no CEP (simulação)
  const calculateShipping = (zipCode: string, totalWeight: number = 1): number => {
    if (!zipCode || zipCode.length < 5) return 0;
    
    // Simulação - baseada nos primeiros dígitos do CEP e peso
    const regionCode = parseInt(zipCode.substring(0, 2));
    let baseRate = 10.99;
    
    // Ajuste por região (simulação)
    if (regionCode < 20) baseRate = 12.99; // Sul/Sudeste
    else if (regionCode < 50) baseRate = 15.99; // Centro-Oeste/Nordeste
    else baseRate = 19.99; // Norte
    
    // Ajuste por peso
    const weightFactor = Math.max(1, Math.min(totalWeight / 2, 3));
    
    return baseRate * weightFactor;
  };

  return { 
    deliveryEstimate,
    calculateShipping
  };
};
