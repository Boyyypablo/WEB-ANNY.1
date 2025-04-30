
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "E-mail inválido" }),
  subject: z.string().min(5, { message: "Assunto deve ter pelo menos 5 caracteres" }),
  message: z.string().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" }),
});

type FormData = z.infer<typeof formSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Form submitted:", data);
      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      form.reset();
    } catch (error) {
      toast.error("Erro ao enviar mensagem. Por favor, tente novamente.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-3xl font-bold text-center text-anny-green mb-6">Entre em Contato</h1>
      <p className="text-center text-gray-700 mb-8">
        Estamos aqui para ajudar! Preencha o formulário abaixo ou utilize um dos nossos canais de contato.
      </p>
      
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
      
      <Separator className="my-8" />
      
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Formulário de Contato</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="seu.email@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assunto</FormLabel>
                  <FormControl>
                    <Input placeholder="Assunto da sua mensagem" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva detalhadamente como podemos ajudar..." 
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Seja específico para que possamos ajudar da melhor forma possível.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-anny-green hover:bg-anny-green/90" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
            </Button>
          </form>
        </Form>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-center">Nossa Localização</h2>
        <p className="text-center text-gray-700 mb-6">
          Av. Paulista, 1000 - Bela Vista<br />
          São Paulo - SP, 01310-100<br />
          Brasil
        </p>
        
        <div className="aspect-video bg-gray-200 rounded-lg">
          {/* Placeholder for map - would be replaced with an actual map component */}
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500">Mapa do Google será exibido aqui</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
