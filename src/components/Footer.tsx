import React from "react";
import { Link } from "react-router-dom";
import { Mail, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Projeto Anny" className="h-10 w-auto" />
            </Link>
            <p className="text-gray-600 mb-4">
              Plataforma integrada de cannabis medicinal que conecta pacientes, associações e o setor público
              para tornar o acesso mais fácil, seguro e acessível.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-gray-800">Institucional</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-anny-green hover:underline">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-anny-green hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-600 hover:text-anny-green hover:underline">
                  Médicos Parceiros
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-anny-green hover:underline">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-anny-green hover:underline">
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-gray-800">Políticas</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/policies" className="text-gray-600 hover:text-anny-green hover:underline">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/policies?tab=terms" className="text-gray-600 hover:text-anny-green hover:underline">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/policies?tab=returns" className="text-gray-600 hover:text-anny-green hover:underline">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link to="/policies?tab=shipping" className="text-gray-600 hover:text-anny-green hover:underline">
                  Política de Envio
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-gray-800">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-anny-green shrink-0 mt-0.5" />
                <span className="text-gray-600">contato@projetoanny.com.br</span>
              </li>
              <li className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-anny-green shrink-0 mt-0.5" />
                <span className="text-gray-600">
                  Chat Online<br />
                  <span className="text-sm">Segunda a sexta, 9h às 18h</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Projeto Anny. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-4">
            <img 
              src="/placeholder.svg" 
              alt="Certificado de Segurança" 
              className="h-8 w-auto"
            />
            <img 
              src="/placeholder.svg" 
              alt="SSL" 
              className="h-8 w-auto"
            />
            <img 
              src="/placeholder.svg" 
              alt="Pagamentos Seguros" 
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
