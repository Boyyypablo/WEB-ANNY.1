
import React from "react";
import { Mail, Phone, MessageSquare } from "lucide-react";

const ContactInfoCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-10">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="p-3 bg-anny-green-light rounded-full mb-4">
          <Mail className="h-6 w-6 text-anny-green" />
        </div>
        <h3 className="text-lg font-medium mb-2">E-mail</h3>
        <p className="text-gray-700 mb-2">contato@projetoanny.com.br</p>
        <p className="text-gray-700">suporte@projetoanny.com.br</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="p-3 bg-anny-green-light rounded-full mb-4">
          <Phone className="h-6 w-6 text-anny-green" />
        </div>
        <h3 className="text-lg font-medium mb-2">Telefone</h3>
        <p className="text-gray-700 mb-2">(11) 3456-7890</p>
        <p className="text-gray-700">0800 123 4567</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="p-3 bg-anny-green-light rounded-full mb-4">
          <MessageSquare className="h-6 w-6 text-anny-green" />
        </div>
        <h3 className="text-lg font-medium mb-2">Chat Online</h3>
        <p className="text-gray-700 mb-2">Segunda a sexta</p>
        <p className="text-gray-700">9h às 18h</p>
      </div>
    </div>
  );
};

export default ContactInfoCards;
