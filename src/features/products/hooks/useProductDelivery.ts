
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

  return { deliveryEstimate };
};
