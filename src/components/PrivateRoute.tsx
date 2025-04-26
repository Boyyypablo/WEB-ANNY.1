
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { session, loading } = useAuth();

  if (loading) {
    // Exibir um estado de carregamento enquanto verificamos a autenticação
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-anny-green"></div>
      </div>
    );
  }

  if (!session) {
    // Redirecionar para a página de login se não estiver autenticado
    return <Navigate to="/auth" replace />;
  }

  // Renderizar o conteúdo protegido se estiver autenticado
  return <>{children}</>;
};

export default PrivateRoute;
