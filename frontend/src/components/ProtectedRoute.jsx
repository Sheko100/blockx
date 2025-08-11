import { useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

// ProtectedRoute component to protect routes that require authentication
// It checks if the user is authenticated and redirects to login if not

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login', { state: { from: location } });
    return null;
  }

  return children;
};

export default ProtectedRoute;
