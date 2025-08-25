import { motion } from "framer-motion";
import { useState } from 'react';
import { IconSquareAsterisk } from '@tabler/icons-react';
import { useIIAuth } from './context/InternetIdentityContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const Header = ({showNav=true, showBtn=true, showAuth=false}) => {
  const { principal, isAuthenticated, logout } = useIIAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      console.log('error while logging out:', error);
      toast.error("Failed to log out");
    }
  }

  const authBtn = () =>{
    return isAuthenticated ? (
        <div className="flex items-center space-x-4">
          <span className="text-sm bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
            ID: {principal?.slice(0, 8)}...{principal?.slice(-4)}
          </span>
          <motion.button 
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm bg-gradient-to-r from-blue-500/70 to-orange-500/70 hover:from-blue-600/70 hover:to-orange-600/70 px-4 py-2 rounded-md transition-all"
          >
            Sign Out
          </motion.button>
        </div>
      ) : (
        <motion.button 
          onClick={() => navigate('/login')}
          className="text-blue-400 hover:text-blue-300 font-medium"
          whileHover={{ scale: 1.05 }}
        >
          Already registered? Sign In
        </motion.button>
      );
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

	return (
	  <motion.header
	    initial={{ opacity: 0, y: -20 }}
	    animate={{ opacity: 1, y: 0 }}
	    transition={{ duration: 0.5 }}
	    className="bg-white/5 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-white/10"
	  >
	    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
	      <motion.div
	        whileHover={{ scale: 1.05 }}
	        className="flex items-center cursor-pointer"
          onClick={() => navigate('/')}
	      >
	        <motion.div
	          animate={{ rotate: [0, 360] }}
	          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
	          className="w-10 h-10 bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl"
	        >
	          <IconSquareAsterisk className="w-8 h-8" />
	        </motion.div>
	        <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
	          Verisys
	        </span>
	      </motion.div>

	      {showNav && (
	        <nav className="hidden md:flex space-x-8">
	          <Link to="/#features" className="text-gray-300 hover:text-white relative group">
	            Features
	            <motion.span
	              className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-orange-400 w-0"
	              whileHover={{ width: "100%" }}
	              transition={{ duration: 0.3 }}
	            />
	          </Link>
	          <Link to="/#how-it-works" className="text-gray-300 hover:text-white relative group">
	            How It Works
	            <motion.span
	              className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-orange-400 w-0"
	              whileHover={{ width: "100%" }}
	              transition={{ duration: 0.3 }}
	            />
	          </Link>
	          <Link to="/about" className="text-gray-300 hover:text-white relative group">
	            About
	            <motion.span
	              className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-orange-400 w-0"
	              whileHover={{ width: "100%" }}
	              transition={{ duration: 0.3 }}
	            />
	          </Link>
	        </nav>
	      )}

        {/* Mobile menu button */}
        {showNav && (
          <button 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={toggleMobileMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        )}

	      {showBtn && (
	        <motion.button
	          className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all overflow-hidden group"
	          whileHover={{ scale: 1.05 }}
	          whileTap={{ scale: 0.95 }}
	          onClick={() => isAuthenticated ? navigate("/dashboard") : navigate("/login")}
	        >
	          <span className="relative z-10">
	            {isAuthenticated ? "Dashboard" : "Connect"}
	          </span>
	          <motion.span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
	          <motion.span
	            className="absolute top-0 left-0 w-1/2 h-full bg-white/30 skew-x-[-20deg]"
	            initial={{ x: "-150%" }}
	            animate={{
	              x: ["-150%", "200%"],
	            }}
	            transition={{
	              duration: 2,
	              repeat: Infinity,
	              repeatDelay: 3,
	            }}
	          />
	        </motion.button>
	      )}

        { showAuth && authBtn()}

	    </div>

      {/* Mobile menu */}
      {showNav && isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-800/95 backdrop-blur-md border-t border-white/10"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/#features" 
              className="block text-gray-300 hover:text-white py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/#how-it-works" 
              className="block text-gray-300 hover:text-white py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/about" 
              className="block text-gray-300 hover:text-white py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </motion.div>
      )}
	  </motion.header>
	);
}

export default Header;