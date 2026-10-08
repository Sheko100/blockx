import { Navigate } from 'react-router-dom';
import { useIIAuth } from '../context/InternetIdentityContext';

// ProtectedRoute component to protect routes that require authentication
// It checks if the user is authenticated and redirects to login if not
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useIIAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white" role="status">
        Checking your session…
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
