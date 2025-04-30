
interface ProductDescriptionProps {
  description: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  return (
    <div>
      <h3 className="font-semibold mb-2">Descrição do Produto</h3>
      <p className="text-anny-green/70">{description}</p>
      <p className="mt-4">
        Os produtos à base de Cannabis têm demonstrado resultados promissores no tratamento de diversas condições 
        de saúde. Este produto é indicado para uso sob orientação médica e pode auxiliar no controle de sintomas 
        como dores crônicas, ansiedade, insônia e outras condições neurológicas.
      </p>
      <p className="mt-4">
        Importante: Este é um medicamento controlado e só pode ser adquirido mediante apresentação de prescrição médica.
      </p>
    </div>
  );
};

export default ProductDescription;
