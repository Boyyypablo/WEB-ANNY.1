import React from "react";
import { UserRound } from "lucide-react";
import { useAuth } from "@/contexts/auth";

const ProfileHeader = () => {
  const { profile } = useAuth();
  
  const displayName = profile?.full_name || profile?.email?.split('@')[0] || "Usuário";
  const userType = profile?.user_type === 'master' 
    ? 'Administrador' 
    : profile?.user_type === 'association' 
      ? 'Associação' 
      : 'Paciente';

  return (
    <div className="anny-card flex flex-col md:flex-row items-center gap-6">
      <div className="w-24 h-24 rounded-full bg-anny-green-light flex items-center justify-center">
        <UserRound size={48} className="text-anny-green" />
      </div>
      <div className="text-center md:text-left">
        <h2 className="text-xl font-semibold">{displayName}</h2>
        <p className="text-anny-green/70">{profile?.email}</p>
        <p className="mt-1 text-sm text-gray-500">{userType}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
