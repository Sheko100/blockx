import { Navigate } from 'react-router-dom';
import { useIIAuth } from './context/InternetIdentityContext';

const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading } = useIIAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white" role="status">
        Checking your session…
      </div>
    );
  }

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default GuestRoute;
