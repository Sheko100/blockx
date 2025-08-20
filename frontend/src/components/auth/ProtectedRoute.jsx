import { Navigate, useLocation } from 'react-router-dom';
//import { AuthContext } from '../../contexts/AuthContext'
import { useIIAuth } from '../../contexts/InternetIdentityContext';

export default function ProtectedRoute({ children }) {
  //const { user, loading } = useContext(AuthContext)
  const { isAuthenticated } = useIIAuth();
  const location = useLocation()

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}