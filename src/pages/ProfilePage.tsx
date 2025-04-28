
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileNavigation from "@/components/profile/ProfileNavigation";
import PersonalInfoTab from "@/components/profile/PersonalInfoTab";
import SecurityTab from "@/components/profile/SecurityTab";
import PaymentTab from "@/components/profile/PaymentTab";
import SettingsTab from "@/components/profile/SettingsTab";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const { user, profile } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: profile?.email?.split('@')[0] || "Usuário",
        email: user.email || "",
      }));
    }
  }, [user, profile]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-bold">Meu Perfil</h1>
      
      <ProfileHeader name={formData.name} email={formData.email} />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ProfileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="anny-card md:col-span-3">
          {activeTab === "personal" && <PersonalInfoTab />}
          {activeTab === "security" && <SecurityTab />}
          {activeTab === "payment" && <PaymentTab />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
