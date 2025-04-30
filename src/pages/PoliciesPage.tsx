
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const PoliciesPage = () => {
  const [activeTab, setActiveTab] = useState("privacy");
  
  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-3xl font-bold text-center text-anny-green mb-6">Políticas e Termos</h1>
      <p className="text-center text-gray-700 mb-8">
        Conheça nossas políticas e termos de uso da plataforma. Ao utilizar nossos serviços,
        você concorda com todas as condições estabelecidas nestes documentos.
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="privacy">Privacidade</TabsTrigger>
          <TabsTrigger value="terms">Termos de Uso</TabsTrigger>
          <TabsTrigger value="returns">Trocas e Devoluções</TabsTrigger>
          <TabsTrigger value="shipping">Envio</TabsTrigger>
        </TabsList>
        
        {/* Privacy Policy */}
        <TabsContent value="privacy" className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4">Política de Privacidade</h2>
          <p className="text-gray-700 mb-4">
            Última atualização: 30 de abril de 2025
          </p>
          
          <Separator className="my-4" />
          
          <div className="prose max-w-none text-gray-700">
            <h3 className="text-xl font-medium mb-3 mt-6">1. Introdução</h3>
            <p>
              A presente Política de Privacidade tem por finalidade demonstrar o compromisso do 
              Projeto Anny com a privacidade e proteção dos dados pessoais coletados de seus usuários, 
              estabelecendo as regras sobre a coleta, registro, armazenamento, uso, compartilhamento e 
              eliminação dos dados coletados dentro do escopo dos serviços e funcionalidades do nosso site 
              e aplicativo, de acordo com as leis em vigor, com transparência e clareza junto ao usuário 
              e ao mercado em geral.
            </p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">2. Dados Coletados</h3>
            <p>
              Coletamos informações pessoais quando você se cadastra em nossa plataforma, realiza uma compra, 
              agenda uma consulta ou interage com nossos serviços. Os dados coletados podem incluir:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Informações de identificação pessoal (nome, CPF, data de nascimento)</li>
              <li>Informações de contato (endereço, e-mail, número de telefone)</li>
              <li>Informações médicas (histórico médico, condições de saúde, medicações em uso)</li>
              <li>Dados de pagamento (informações de cartão de crédito, dados bancários)</li>
              <li>Dados de navegação e uso da plataforma</li>
            </ul>
            
            <h3 className="text-xl font-medium mb-3 mt-6">3. Finalidade do Tratamento de Dados</h3>
            <p>
              Utilizamos seus dados pessoais para as seguintes finalidades:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Fornecer os serviços e produtos solicitados</li>
              <li>Processar pagamentos e pedidos</li>
              <li>Agendamento e gestão de consultas médicas</li>
              <li>Melhorar nossos serviços e desenvolver novos recursos</li>
              <li>Comunicação sobre seus pedidos, serviços e atualizações</li>
              <li>Enviar informações sobre produtos, serviços e promoções (mediante consentimento)</li>
              <li>Cumprir obrigações legais e regulatórias</li>
              <li>Proteger os direitos, propriedades e segurança do Projeto Anny e seus usuários</li>
            </ul>
            
            <h3 className="text-xl font-medium mb-3 mt-6">4. Compartilhamento de Dados</h3>
            <p>
              Podemos compartilhar suas informações pessoais com:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Profissionais de saúde envolvidos no seu atendimento</li>
              <li>Parceiros de logística para entrega de produtos</li>
              <li>Processadores de pagamento para finalizar transações</li>
              <li>Prestadores de serviços que nos auxiliam na operação da plataforma</li>
              <li>Autoridades governamentais, quando exigido por lei</li>
            </ul>
            <p>
              Não vendemos, alugamos ou negociamos suas informações pessoais para terceiros 
              para fins de marketing sem seu consentimento explícito.
            </p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">5. Seus Direitos</h3>
            <p>
              Como titular de dados pessoais, você tem os seguintes direitos:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários</li>
              <li>Revogar o consentimento para tratamento dos seus dados</li>
              <li>Solicitar a portabilidade dos dados</li>
              <li>Ser informado sobre as entidades com as quais seus dados foram compartilhados</li>
            </ul>
            
            <h3 className="text-xl font-medium mb-3 mt-6">6. Segurança dos Dados</h3>
            <p>
              Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados 
              pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Nossos 
              sistemas são regularmente auditados para garantir a contínua segurança das informações.
            </p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">7. Alterações na Política de Privacidade</h3>
            <p>
              Esta Política de Privacidade pode ser atualizada periodicamente. Notificaremos sobre 
              mudanças significativas através do nosso site ou por e-mail.
            </p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">8. Contato</h3>
            <p>
              Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, 
              entre em contato com nosso Encarregado de Proteção de Dados através do e-mail 
              privacidade@projetoanny.com.br ou pelo telefone (11) 3456-7890.
            </p>
          </div>
        </TabsContent>
        
        {/* Terms of Use */}
        <TabsContent value="terms" className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4">Termos de Uso</h2>
          <p className="text-gray-700 mb-4">
            Última atualização: 30 de abril de 2025
          </p>
          
          <Separator className="my-4" />
          
          <div className="prose max-w-none text-gray-700">
            <h3 className="text-xl font-medium mb-3 mt-6">1. Aceitação dos Termos</h3>
            <p>
              Ao acessar ou usar a plataforma do Projeto Anny, você concorda em cumprir e estar sujeito a estes Termos de Uso. 
              Se você não concordar com qualquer parte destes termos, não poderá acessar ou usar nossos serviços.
            </p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">2. Cadastro e Conta</h3>
            <p>
              Para utilizar nossa plataforma, é necessário criar uma conta. Você é responsável por manter a confidencialidade 
              das informações de sua conta, incluindo senha, e por todas as atividades realizadas com sua conta. Você deve 
              fornecer informações precisas, completas e atualizadas durante o processo de registro e manter essas informações 
              atualizadas.
            </p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">3. Serviços Médicos</h3>
            <p>
              Os serviços de telemedicina oferecidos através da plataforma do Projeto Anny são fornecidos por médicos 
              independentes e licenciados. A plataforma não substitui a relação médico-paciente tradicional e não deve 
              ser usada em situações de emergência médica.
            </p>
            <p>
              Os conteúdos disponíveis na plataforma têm caráter informativo e não substituem a consulta, exame ou 
              diagnóstico realizado por um profissional de saúde.
            </p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">4. Produtos</h3>
            <p>
              Todos os produtos à base de cannabis disponíveis em nossa plataforma requerem prescrição médica válida, 
              conforme regulamentação da Anvisa. Os produtos são destinados exclusivamente para uso medicinal e devem 
              ser utilizados conforme orientação médica.
            </p>
            <p>
              Nos esforçamos para apresentar descrições precisas dos produtos, mas não garantimos que todas as informações 
              estejam completas ou atualizadas. A disponibilidade e os preços dos produtos estão sujeitos a alterações 
              sem aviso prévio.
            </p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">5. Propriedade Intelectual</h3>
            <p>
              Todo o conteúdo disponível na plataforma do Projeto Anny, incluindo textos, gráficos, logotipos, ícones, 
              imagens, clipes de áudio, downloads digitais, compilações de dados e software, é de propriedade do 
              Projeto Anny ou de seus fornecedores de conteúdo e está protegido por leis de direitos autorais.
            </p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">6. Limitação de Responsabilidade</h3>
            <p>
              O Projeto Anny não será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais 
              ou punitivos, incluindo, mas não se limitando a, lucros cessantes, perda de dados ou outros danos intangíveis, 
              resultantes do uso ou da impossibilidade de usar nossos serviços.
            </p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">7. Modificações dos Termos</h3>
            <p>
              O Projeto Anny reserva-se o direito de modificar estes Termos de Uso a qualquer momento. As alterações 
              entrarão em vigor imediatamente após sua publicação na plataforma. O uso contínuo dos serviços após tais 
              alterações constitui sua aceitação dos novos termos.
            </p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">8. Lei Aplicável</h3>
            <p>
              Estes Termos de Uso são regidos e interpretados de acordo com as leis do Brasil. Qualquer disputa 
              decorrente ou relacionada a estes termos será submetida à jurisdição exclusiva dos tribunais brasileiros.
            </p>
          </div>
        </TabsContent>
        
        {/* Returns and Refunds Policy */}
        <TabsContent value="returns" className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4">Política de Trocas e Devoluções</h2>
          <p className="text-gray-700 mb-4">
            Última atualização: 30 de abril de 2025
          </p>
          
          <Separator className="my-4" />
          
          <div className="prose max-w-none text-gray-700">
            <h3 className="text-xl font-medium mb-3 mt-6">1. Prazo para Desistência da Compra</h3>
            <p>
              De acordo com o Código de Defesa do Consumidor, você tem até 7 (sete) dias corridos, contados a partir 
              da data de recebimento do produto, para desistir da compra realizada pela internet. A desistência deve 
              ser comunicada através do nosso Serviço de Atendimento ao Cliente.
            </p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">2. Condições para Devolução</h3>
            <p>
              Para produtos não-medicamentosos, a devolução será aceita quando:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>O produto estiver na embalagem original, sem indícios de uso</li>
              <li>Acompanhado de nota fiscal, manual e todos os acessórios</li>
              <li>Dentro do prazo de 7 dias após o recebimento</li>
            </ul>
            <p>
              Para medicamentos, devido à natureza do produto e conforme regulamentações sanitárias, só aceitamos 
              devoluções nos seguintes casos:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Produto entregue com lacre violado ou danificado</li>
              <li>Erro no envio (produto diferente do solicitado)</li>
              <li>Produto com defeito ou avaria</li>
              <li>Produto próximo ao vencimento (menos de 3 meses para expirar)</li>
            </ul>
            
            <h3 className="text-xl font-medium mb-3 mt-6">3. Procedimento para Devolução</h3>
            <p>
              Para solicitar uma devolução, siga estes passos:
            </p>
            <ol className="list-decimal pl-6 my-4">
              <li>Acesse sua conta na plataforma do Projeto Anny</li>
              <li>Vá para "Meus Pedidos" e localize o pedido em questão</li>
              <li>Clique em "Solicitar Devolução" e siga as instruções</li>
              <li>Após aprovação da solicitação, você receberá instruções para envio do produto</li>
              <li>Embale o produto adequadamente com todos os itens originais</li>
              <li>Envie o produto conforme as instruções fornecidas</li>
            </ol>
            <p>
              A devolução será processada após o recebimento e inspeção do produto devolvido.
            </p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">4. Reembolso</h3>
            <p>
              O reembolso será processado da seguinte forma:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Para pagamentos com cartão de crédito: o valor será estornado em até 2 faturas subsequentes, dependendo da data de fechamento da sua fatura</li>
              <li>Para pagamentos com PIX ou boleto: o valor será reembolsado via transferência bancária em até 10 dias úteis</li>
              <li>Para pagamentos parcelados: o estorno será realizado nas parcelas futuras, caso existam, ou nas parcelas já pagas</li>
            </ul>
            <p>
              O reembolso incluirá o valor do produto e do frete pago, caso a devolução ocorra por erro nosso ou defeito do produto.
            </p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">5. Trocas</h3>
            <p>
              Para solicitações de troca (por exemplo, por outro produto ou tamanho diferente), o procedimento é semelhante 
              ao da devolução, mas você deverá selecionar a opção "Solicitar Troca" em vez de "Solicitar Devolução" na 
              página do pedido.
            </p>
            <p>
              A disponibilidade para troca está sujeita ao estoque do produto desejado. Caso o produto escolhido para troca 
              tenha valor superior ao original, você deverá pagar a diferença. Se tiver valor inferior, o valor excedente 
              será reembolsado conforme as regras acima.
            </p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">6. Produtos Personalizados</h3>
            <p>
              Produtos personalizados ou preparados especificamente para o cliente (como formulações magistrais) não são 
              elegíveis para devolução ou troca, exceto em casos de defeito ou erro na preparação.
            </p>
          </div>
        </TabsContent>
        
        {/* Shipping Policy */}
        <TabsContent value="shipping" className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4">Política de Envio</h2>
          <p className="text-gray-700 mb-4">
            Última atualização: 30 de abril de 2025
          </p>
          
          <Separator className="my-4" />
          
          <div className="prose max-w-none text-gray-700">
            <h3 className="text-xl font-medium mb-3 mt-6">1. Prazos de Envio</h3>
            <p>
              Após a confirmação do pagamento, nossos pedidos são processados em até 24 horas úteis. 
              O prazo de entrega varia de acordo com a região e o tipo de frete escolhido:
            </p>
            
            <Collapsible className="w-full my-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gray-100 rounded-md">
                <span className="font-medium">Capitais e Regiões Metropolitanas</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-3 border-l border-r border-b rounded-b-md">
                <ul className="list-disc pl-6">
                  <li>Frete Expresso: 1 a 3 dias úteis</li>
                  <li>Frete Normal: 3 a 5 dias úteis</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible className="w-full my-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gray-100 rounded-md">
                <span className="font-medium">Interior dos Estados</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-3 border-l border-r border-b rounded-b-md">
                <ul className="list-disc pl-6">
                  <li>Frete Expresso: 2 a 4 dias úteis</li>
                  <li>Frete Normal: 4 a 7 dias úteis</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible className="w-full my-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gray-100 rounded-md">
                <span className="font-medium">Regiões Norte e Nordeste</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-3 border-l border-r border-b rounded-b-md">
                <ul className="list-disc pl-6">
                  <li>Frete Expresso: 3 a 5 dias úteis</li>
                  <li>Frete Normal: 5 a 10 dias úteis</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible className="w-full my-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gray-100 rounded-md">
                <span className="font-medium">Localidades de Difícil Acesso</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-3 border-l border-r border-b rounded-b-md">
                <p>
                  Para algumas localidades remotas ou de difícil acesso, o prazo pode ser estendido em até 5 dias úteis 
                  além do prazo normal. Essas regiões serão identificadas no momento do cálculo do frete durante o checkout.
                </p>
              </CollapsibleContent>
            </Collapsible>
            
            <h3 className="text-xl font-medium mb-3 mt-6">2. Formas de Envio</h3>
            <p>
              Trabalhamos com as seguintes transportadoras:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Correios (PAC e SEDEX)</li>
              <li>Transportadoras privadas para regiões específicas</li>
              <li>Entrega expressa local em algumas capitais</li>
            </ul>
            <p>
              A disponibilidade das opções de frete depende do seu CEP e será apresentada durante o checkout.
            </p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">3. Custo do Frete</h3>
            <p>
              O valor do frete é calculado com base no CEP de destino, peso, dimensões e valor dos produtos. 
              Para calcular o frete, basta informar seu CEP na página do produto ou no carrinho de compras.
            </p>
            <p>
              Oferecemos frete grátis para compras acima de R$ 300,00 para todo o Brasil 
              (exceto localidades de difícil acesso).
            </p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">4. Rastreamento</h3>
            <p>
              Todos os envios possuem código de rastreamento, que é enviado automaticamente para o e-mail cadastrado 
              assim que o pedido é despachado. Você também pode acompanhar seu pedido na área "Meus Pedidos" da 
              sua conta na plataforma.
            </p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">5. Entrega</h3>
            <p>
              No momento da entrega:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>É necessária a presença do destinatário ou de pessoa autorizada para receber o pedido</li>
              <li>Confira o estado da embalagem antes de assinar o recebimento</li>
              <li>Em caso de avarias visíveis na embalagem, recuse o recebimento e entre em contato com nosso suporte</li>
            </ul>
            <p>
              Após três tentativas de entrega sem sucesso, o pedido retornará para nosso centro de distribuição, 
              e entraremos em contato para reagendamento (custos adicionais podem ser aplicados).
            </p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">6. Embalagem</h3>
            <p>
              Todos os nossos produtos são enviados em embalagens discretas, sem identificação externa do conteúdo, 
              para garantir sua privacidade. Utilizamos materiais que asseguram a proteção e integridade dos produtos 
              durante o transporte, incluindo controle de temperatura quando necessário.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PoliciesPage;
