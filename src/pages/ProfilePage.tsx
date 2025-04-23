
import { useState } from "react";
import { UserRound, Lock, Settings, LogOut, CreditCard } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  
  const personalInfo = {
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "(11) 98765-4321",
    birthdate: "15/07/1985",
    address: "Av. Paulista, 1000, São Paulo - SP"
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Informações atualizadas com sucesso!");
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-bold">Meu Perfil</h1>
      
      {/* Profile Header */}
      <div className="anny-card flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-anny-green-light flex items-center justify-center">
          <UserRound size={48} className="text-anny-green" />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold">{personalInfo.name}</h2>
          <p className="text-anny-green/70">{personalInfo.email}</p>
        </div>
      </div>
      
      {/* Profile Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Tab Navigation */}
        <div className="anny-card p-0 overflow-hidden">
          <nav className="flex flex-col">
            <button
              className={`flex items-center gap-3 px-4 py-3 hover:bg-anny-green-light transition-colors ${activeTab === 'personal' ? 'bg-anny-green-light' : ''}`}
              onClick={() => setActiveTab("personal")}
            >
              <UserRound size={20} />
              <span>Dados Pessoais</span>
            </button>
            <button
              className={`flex items-center gap-3 px-4 py-3 hover:bg-anny-green-light transition-colors ${activeTab === 'security' ? 'bg-anny-green-light' : ''}`}
              onClick={() => setActiveTab("security")}
            >
              <Lock size={20} />
              <span>Segurança</span>
            </button>
            <button
              className={`flex items-center gap-3 px-4 py-3 hover:bg-anny-green-light transition-colors ${activeTab === 'payment' ? 'bg-anny-green-light' : ''}`}
              onClick={() => setActiveTab("payment")}
            >
              <CreditCard size={20} />
              <span>Pagamento</span>
            </button>
            <button
              className={`flex items-center gap-3 px-4 py-3 hover:bg-anny-green-light transition-colors ${activeTab === 'settings' ? 'bg-anny-green-light' : ''}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings size={20} />
              <span>Configurações</span>
            </button>
          </nav>
          <div className="border-t">
            <button
              className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors w-full"
              onClick={() => toast.info("Funcionalidade de logout em implementação")}
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="anny-card md:col-span-3">
          {activeTab === "personal" && (
            <>
              <h2 className="text-xl font-semibold mb-4">Dados Pessoais</h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-medium">Nome Completo</label>
                    <input 
                      id="name"
                      type="text" 
                      className="anny-input"
                      defaultValue={personalInfo.name}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-medium">Email</label>
                    <input 
                      id="email"
                      type="email" 
                      className="anny-input"
                      defaultValue={personalInfo.email}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="font-medium">Telefone</label>
                    <input 
                      id="phone"
                      type="tel" 
                      className="anny-input"
                      defaultValue={personalInfo.phone}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="birthdate" className="font-medium">Data de Nascimento</label>
                    <input 
                      id="birthdate"
                      type="text" 
                      className="anny-input"
                      defaultValue={personalInfo.birthdate}
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label htmlFor="address" className="font-medium">Endereço</label>
                    <input 
                      id="address"
                      type="text" 
                      className="anny-input"
                      defaultValue={personalInfo.address}
                    />
                  </div>
                </div>
                <button type="submit" className="anny-btn-primary mt-4">
                  Salvar Alterações
                </button>
              </form>
            </>
          )}
          
          {activeTab === "security" && (
            <>
              <h2 className="text-xl font-semibold mb-4">Segurança</h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="current-password" className="font-medium">Senha Atual</label>
                  <input 
                    id="current-password"
                    type="password" 
                    className="anny-input"
                    placeholder="Digite sua senha atual"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="new-password" className="font-medium">Nova Senha</label>
                  <input 
                    id="new-password"
                    type="password" 
                    className="anny-input"
                    placeholder="Digite sua nova senha"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="confirm-password" className="font-medium">Confirme a Nova Senha</label>
                  <input 
                    id="confirm-password"
                    type="password" 
                    className="anny-input"
                    placeholder="Confirme sua nova senha"
                  />
                </div>
                <button type="submit" className="anny-btn-primary mt-4">
                  Atualizar Senha
                </button>
              </form>
            </>
          )}
          
          {activeTab === "payment" && (
            <div className="flex flex-col items-center justify-center py-8">
              <CreditCard size={64} className="text-anny-green mb-4" />
              <h2 className="text-xl font-semibold mb-2">Métodos de Pagamento</h2>
              <p className="text-anny-green/70 mb-6">Adicione seus métodos de pagamento para facilitar suas compras</p>
              <button className="anny-btn-primary">
                Adicionar Método de Pagamento
              </button>
            </div>
          )}
          
          {activeTab === "settings" && (
            <>
              <h2 className="text-xl font-semibold mb-4">Configurações</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notificações por Email</h3>
                    <p className="text-sm text-anny-green/70">Receba atualizações sobre consultas e medicamentos</p>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-anny-green/30">
                    <span className="absolute h-4 w-4 rounded-full bg-white left-1"></span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notificações no Celular</h3>
                    <p className="text-sm text-anny-green/70">Receba alertas no seu dispositivo móvel</p>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-anny-green">
                    <span className="absolute h-4 w-4 rounded-full bg-white translate-x-5"></span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Newsletter de Saúde</h3>
                    <p className="text-sm text-anny-green/70">Receba dicas e novidades sobre saúde</p>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-anny-green/30">
                    <span className="absolute h-4 w-4 rounded-full bg-white left-1"></span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
