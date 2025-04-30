
interface ProductSpecificationsProps {
  specifications: Record<string, string>;
}

const ProductSpecifications = ({ specifications }: ProductSpecificationsProps) => {
  return (
    <div>
      <h3 className="font-semibold mb-4">Especificações Técnicas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(specifications).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <span className="text-sm text-muted-foreground">{key}</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSpecifications;
