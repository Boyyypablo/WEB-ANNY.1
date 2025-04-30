
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { medications, getRelatedProducts, calculateAverageRating } from "@/features/products/types";
import ProductImageGallery from "@/features/products/components/ProductImageGallery";
import ProductDescription from "@/features/products/components/ProductDescription";
import ProductSpecifications from "@/features/products/components/ProductSpecifications";
import ProductReviews from "@/features/products/components/ProductReviews";
import ProductDeliveryInfo from "@/features/products/components/ProductDeliveryInfo";
import ProductPurchaseCard from "@/features/products/components/ProductPurchaseCard";
import RelatedProducts from "@/features/products/components/RelatedProducts";
import { useProductDelivery } from "@/features/products/hooks/useProductDelivery";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deliveryEstimate } = useProductDelivery();
  const medication = medications.find(med => med.id === Number(id));
  
  if (!medication) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Produto não encontrado</p>
        <Button onClick={() => navigate('/medications')}>Voltar para Medicamentos</Button>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(medication.id);
  const averageRating = calculateAverageRating(medication.reviews);
  const reviewsCount = medication.reviews?.length || 0;
  const delivery = deliveryEstimate();

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="outline" 
        onClick={() => navigate('/medications')}
        className="mb-6"
      >
        Voltar para Medicamentos
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Seção de Imagens - Coluna 1 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Galeria de imagens */}
          <ProductImageGallery 
            images={medication.images || [medication.image]} 
            name={medication.name} 
          />
          
          {/* Abas para Informação Detalhada */}
          <Card className="mt-8">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="description">Descrição</TabsTrigger>
                <TabsTrigger value="specifications">Especificações</TabsTrigger>
                <TabsTrigger value="reviews">Avaliações</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="p-6">
                <ProductDescription description={medication.description} />
              </TabsContent>
              <TabsContent value="specifications" className="p-6">
                {medication.specifications && (
                  <ProductSpecifications specifications={medication.specifications} />
                )}
              </TabsContent>
              <TabsContent value="reviews" className="p-6">
                <ProductReviews 
                  reviews={medication.reviews} 
                  averageRating={averageRating} 
                />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        
        {/* Informações de Compra - Coluna 2 */}
        <div className="space-y-6">
          <ProductPurchaseCard 
            product={medication}
            averageRating={averageRating}
            reviewsCount={reviewsCount}
          />
          
          {/* Informações de Entrega */}
          <ProductDeliveryInfo delivery={delivery} />
        </div>
      </div>
      
      {/* Produtos Relacionados */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductDetailPage;
