
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Mail, Phone, MessageSquare } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const faqItems: FAQItem[] = [
    {
      id: "product-1",
      question: "Quais tipos de produtos à base de cannabis são oferecidos?",
      answer: "Oferecemos diversos produtos de cannabis medicinal, incluindo óleos, extratos, flores secas, cápsulas e tópicos. Todos os produtos são certificados por laboratórios independentes e possuem rastreabilidade completa.",
      category: "produtos"
    },
    {
      id: "product-2",
      question: "Como posso saber qual produto é mais adequado para mim?",
      answer: "A escolha do produto ideal depende da sua condição médica, histórico de saúde e necessidades específicas. Recomendamos sempre consultar um de nossos médicos especialistas que poderá prescrever o tratamento mais adequado para você.",
      category: "produtos"
    },
    {
      id: "product-3",
      question: "Os produtos têm efeito psicoativo?",
      answer: "Nem todos os produtos têm efeitos psicoativos. Produtos ricos em CBD e com baixo teor de THC geralmente não causam alterações psicoativas significativas. Já produtos com maior concentração de THC podem ter efeitos psicoativos. Nossos médicos orientam sobre as diferentes opções e seus efeitos.",
      category: "produtos"
    },
    {
      id: "payment-1",
      question: "Quais formas de pagamento são aceitas?",
      answer: "Aceitamos pagamentos via cartão de crédito, PIX, boleto bancário e transferência bancária. Para pedidos recorrentes, é possível configurar pagamentos automáticos com cartão de crédito.",
      category: "pagamento"
    },
    {
      id: "payment-2",
      question: "É possível parcelar as compras?",
      answer: "Sim, oferecemos parcelamento em até 12x no cartão de crédito. Para consultas médicas, o parcelamento é de até 6x. As condições exatas podem variar conforme o valor da compra e a bandeira do cartão.",
      category: "pagamento"
    },
    {
      id: "payment-3",
      question: "Há um programa de fidelidade ou descontos?",
      answer: "Sim, temos um programa de fidelidade onde os pacientes acumulam pontos que podem ser trocados por descontos em produtos e consultas. Também oferecemos descontos para compras recorrentes e para pacientes de baixa renda mediante comprovação.",
      category: "pagamento"
    },
    {
      id: "shipping-1",
      question: "Quanto tempo leva para receber meu pedido?",
      answer: "O prazo de entrega varia de 3 a 7 dias úteis, dependendo da sua localização. Após a aprovação do pagamento, você receberá um código de rastreamento para acompanhar seu pedido.",
      category: "envio"
    },
    {
      id: "shipping-2",
      question: "Para quais regiões vocês entregam?",
      answer: "Entregamos para todo o Brasil. Para algumas localidades remotas, o prazo de entrega pode ser estendido. Consulte o cálculo de frete na página de checkout para informações específicas para seu CEP.",
      category: "envio"
    },
    {
      id: "shipping-3",
      question: "Como é feita a embalagem dos produtos?",
      answer: "Todos os nossos produtos são enviados em embalagens discretas, sem identificação externa do conteúdo, garantindo sua privacidade. Utilizamos materiais que asseguram a proteção e integridade dos produtos durante o transporte.",
      category: "envio"
    },
    {
      id: "legal-1",
      question: "É legal usar cannabis medicinal no Brasil?",
      answer: "Sim, o uso medicinal da cannabis é legal no Brasil desde que sob prescrição médica e seguindo as regulamentações da Anvisa. Nossa plataforma opera em conformidade com todas as normas legais vigentes.",
      category: "legal"
    },
    {
      id: "legal-2",
      question: "Preciso de receita médica para comprar?",
      answer: "Sim, todos os produtos à base de cannabis em nossa plataforma requerem receita médica. Oferecemos consultas com médicos especializados que podem avaliar sua condição e fornecer a prescrição adequada.",
      category: "legal"
    },
    {
      id: "return-1",
      question: "Qual é a política de devolução?",
      answer: "Aceitamos devoluções em até 7 dias após o recebimento do produto, desde que o mesmo esteja lacrado e em perfeitas condições. Para medicamentos, a devolução só é aceita em casos de defeitos ou erros no envio, conforme legislação vigente.",
      category: "devolucoes"
    },
    {
      id: "return-2",
      question: "Como solicitar troca ou devolução?",
      answer: "Para solicitar uma troca ou devolução, acesse sua conta, vá para o histórico de pedidos e selecione a opção 'Solicitar devolução' no pedido específico. Você receberá instruções sobre como proceder com o envio do produto de volta.",
      category: "devolucoes"
    }
  ];
  
  const filteredFAQs = faqItems.filter(
    item => item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
            item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const categories = ["todos", "produtos", "pagamento", "envio", "legal", "devolucoes"];
  
  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-3xl font-bold text-center text-anny-green mb-6">Perguntas Frequentes</h1>
      <p className="text-center text-gray-700 mb-8">
        Encontre respostas rápidas para as dúvidas mais comuns sobre nossos produtos e serviços.
      </p>
      
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input 
          placeholder="Buscar perguntas frequentes..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Tabs defaultValue="todos" className="mb-8">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="capitalize"
            >
              {category === "todos" ? "Todos" : 
               category === "produtos" ? "Produtos" :
               category === "pagamento" ? "Pagamento" :
               category === "envio" ? "Envio" :
               category === "legal" ? "Legal" :
               category === "devolucoes" ? "Devoluções" : category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map(category => (
          <TabsContent key={category} value={category}>
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQs
                .filter(item => category === "todos" || item.category === category)
                .map(item => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
            
            {filteredFAQs.filter(item => category === "todos" || item.category === category).length === 0 && (
              <p className="text-center py-8 text-gray-500">
                Nenhuma pergunta encontrada nesta categoria com os termos de busca atuais.
              </p>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="bg-anny-green-light p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-anny-green">Não encontrou o que procurava?</h2>
        <p className="mb-4 text-gray-700">
          Entre em contato com nossa equipe de suporte. Estamos disponíveis de segunda a sexta, das 9h às 18h.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="/contato" className="text-anny-green font-medium hover:underline flex items-center">
            <Mail className="mr-2 h-4 w-4" /> E-mail
          </a>
          <a href="/contato" className="text-anny-green font-medium hover:underline flex items-center">
            <Phone className="mr-2 h-4 w-4" /> Telefone
          </a>
          <a href="/contato" className="text-anny-green font-medium hover:underline flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" /> Chat Online
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
