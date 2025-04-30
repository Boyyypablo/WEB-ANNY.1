
import React from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const AboutUsPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-3xl font-bold text-center text-anny-green mb-6">Sobre o Projeto Anny</h1>
      
      <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
        <img 
          src="/logo.png" 
          alt="Projeto Anny Logo" 
          className="h-48 w-auto"
        />
        <div>
          <h2 className="text-2xl font-semibold mb-3">Nossa História</h2>
          <p className="mb-4 text-gray-700">
            O Projeto Anny nasceu da necessidade de tornar a cannabis medicinal acessível, segura e rastreável para pacientes no Brasil. 
            Fundado em 2023 por um grupo de profissionais de saúde, tecnologia e advocacia, o projeto busca preencher a lacuna entre 
            pacientes que precisam de tratamento e o acesso regulamentado aos produtos derivados da cannabis.
          </p>
          <p className="text-gray-700">
            O nome "Anny" é uma homenagem à pequena Anny Fischer, uma das primeiras crianças brasileiras a receber 
            autorização judicial para importar medicamentos à base de cannabis para tratamento de epilepsia refratária em 2014, 
            caso que ganhou notoriedade nacional e ajudou a abrir caminho para muitos outros pacientes.
          </p>
        </div>
      </div>

      <Separator className="my-8" />
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Nossa Missão, Visão e Valores</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-soft-green-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium text-anny-green mb-3">Missão</h3>
            <p className="text-gray-700">
              Facilitar o acesso seguro e rastreável à cannabis medicinal para pacientes, conectando-os a 
              médicos especializados e produtos certificados, enquanto promovemos informação baseada em evidências.
            </p>
          </div>
          <div className="bg-soft-blue-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium text-anny-green mb-3">Visão</h3>
            <p className="text-gray-700">
              Ser a principal plataforma integrada de cannabis medicinal no Brasil, reconhecida pela segurança, 
              qualidade e transparência, contribuindo para a evolução da regulamentação e o avanço da pesquisa científica.
            </p>
          </div>
          <div className="bg-soft-orange-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium text-anny-green mb-3">Valores</h3>
            <p className="text-gray-700">
              - Segurança do paciente em primeiro lugar<br />
              - Transparência e rastreabilidade<br />
              - Informação baseada em ciência<br />
              - Acessibilidade e inclusão<br />
              - Inovação responsável
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-8" />
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Nosso Compromisso</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-medium text-anny-green mb-3">Com os Pacientes</h3>
            <p className="text-gray-700">
              Garantimos que cada paciente tenha acesso a informações claras, produtos seguros e um 
              acompanhamento médico adequado. Nossa plataforma facilita todo o processo: da primeira 
              consulta médica ao recebimento do medicamento, de forma integrada e segura.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-anny-green mb-3">Com a Sociedade</h3>
            <p className="text-gray-700">
              Trabalhamos para desmistificar o uso medicinal da cannabis através da educação e informação 
              baseada em evidências científicas. Contribuímos para a evolução da regulamentação e para o 
              avanço da pesquisa científica no Brasil.
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <div>
        <h2 className="text-2xl font-semibold mb-6">Perguntas Frequentes</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              O que faz o Projeto Anny diferente das outras plataformas?
            </AccordionTrigger>
            <AccordionContent>
              O Projeto Anny é a única plataforma que integra consultas com médicos especializados, 
              acesso a medicamentos rastreáveis e certificados, e um sistema completo de acompanhamento 
              do paciente. Oferecemos uma solução completa que garante segurança e qualidade em todas as etapas.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">
              Como o Projeto Anny garante a qualidade dos produtos?
            </AccordionTrigger>
            <AccordionContent>
              Todos os produtos disponibilizados em nossa plataforma são certificados e rastreáveis. 
              Trabalhamos apenas com associações e produtores que seguem rigorosos protocolos de controle 
              de qualidade, com testes laboratoriais independentes para garantir pureza e potência.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">
              Como o Projeto Anny contribui para a pesquisa científica?
            </AccordionTrigger>
            <AccordionContent>
              Colaboramos com instituições de pesquisa e universidades, compartilhando dados anônimos 
              (sempre com consentimento dos pacientes) sobre eficácia de tratamentos e perfis de pacientes. 
              Também patrocinamos estudos científicos sobre cannabis medicinal no Brasil.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default AboutUsPage;
