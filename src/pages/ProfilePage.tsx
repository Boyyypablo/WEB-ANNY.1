
import { useState } from "react";
import { useAuth } from "@/contexts/auth";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileNavigation from "@/components/profile/ProfileNavigation";
import PersonalInfoTab from "@/components/profile/PersonalInfoTab";
import SecurityTab from "@/components/profile/SecurityTab";
import PaymentTab from "@/components/profile/PaymentTab";
import SettingsTab from "@/components/profile/SettingsTab";
import { FullPageSpinner } from "@/components/ui/loading-spinner";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const { loading } = useAuth();
  
  if (loading) {
    return <FullPageSpinner />;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-bold">Meu Perfil</h1>
      
      <ProfileHeader />
      
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
