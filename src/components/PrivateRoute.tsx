
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { FullPageSpinner } from '@/components/ui/loading-spinner';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { session, loading } = useAuth();
  
  // Exibe o spinner de carregamento por no máximo 10 segundos
  // para evitar que o usuário fique preso em um loading infinito
  const [timeoutLoading, setTimeoutLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutLoading(false);
    }, 10000); // 10 segundos de timeout
    
    return () => clearTimeout(timer);
  }, []);

  if (loading && timeoutLoading) {
    return <FullPageSpinner />;
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
