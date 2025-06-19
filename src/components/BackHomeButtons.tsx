import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackHomeButtons = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        className="flex items-center gap-1 text-anny-green hover:text-anny-green/90"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Button>
      <Button asChild variant="ghost" className="flex items-center gap-1 text-anny-green hover:text-anny-green/90">
        <Link to="/home">
          <HomeIcon className="w-4 h-4" /> Home
        </Link>
      </Button>
    </div>
  );
};

export default BackHomeButtons;
