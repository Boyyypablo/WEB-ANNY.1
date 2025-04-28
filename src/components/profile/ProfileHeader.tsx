
import React from "react";
import { UserRound } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  email: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email }) => {
  return (
    <div className="anny-card flex flex-col md:flex-row items-center gap-6">
      <div className="w-24 h-24 rounded-full bg-anny-green-light flex items-center justify-center">
        <UserRound size={48} className="text-anny-green" />
      </div>
      <div className="text-center md:text-left">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-anny-green/70">{email}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
