import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { IconShieldLock, IconX, IconCloudNetwork } from '@tabler/icons-react';
import { motion } from "framer-motion"; 
import { useIIAuth } from './context/InternetIdentityContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { toast } from 'react-hot-toast'

const LoginPage = ({ onLoginSuccess, redirectAction }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showRedirectMessage, setShowRedirectMessage] = useState(!!redirectAction);
  const { principal,login, logout, loading } = useIIAuth();
  const navigate = useNavigate();

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const id = await login();
      //setAuthInfo(authInfo);
      toast.success("Logged in successfully");
    } catch (error) {
      console.error('error while logging in', error);
      toast.error('Failed to log in');
      return;
    } finally {
      setIsConnecting(false);
    }

    navigate('/dashboard');
;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-orange-900 text-white">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0
            }}
            animate={{
              x: [null, Math.random() * 100],
              y: [null, Math.random() * 100],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5
            }}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 10 + 2,
              height: Math.random() * 10 + 2,
              background: i % 2 === 0 ? 'rgba(59, 130, 246, 0.5)' : 'rgba(249, 115, 22, 0.5)'
            }}
          />
        ))}
      </div>

      {/* Animated Redirect Banner */}
      <AnimatePresence>
        {showRedirectMessage && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 shadow-md relative z-50"
          >
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center">
                <IconShieldLock className="mr-2" />
                <span>
                  {redirectAction === 'register' 
                    ? 'Please authenticate to register a new property' 
                    : 'Please authenticate to verify a property'}
                </span>
              </div>
              <button 
                onClick={() => setShowRedirectMessage(false)}
                className="p-1 rounded-full hover:bg-blue-800 transition-colors"
              >
                <IconX size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header showNav={false} showBtn={false}/>

      {/* Main Content - Centered Internet Identity Login */}
      <motion.main 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex-grow flex items-center justify-center py-12 px-4 relative z-10"
      >
        <motion.div 
          className="w-full max-w-md text-center"
        >
          {/* Decorative elements */}
          <motion.div 
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 4,
              repeat: Infinity
            }}
            className="mx-auto mb-8 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-orange-500/20 rounded-full flex items-center justify-center"
          >
            <IconCloudNetwork className="w-12 h-12 text-blue-400" />
          </motion.div>

          {/* Heading */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent mb-3">
              {redirectAction === 'register' 
                ? 'Register Your Digital Property' 
                : 'Verify Property Ownership'}
            </h2>
            <p className="text-gray-300">Securely authenticate with Internet Identity</p>
          </motion.div>

          {/* Internet Identity Login Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={handleConnect}
              disabled={isConnecting}
              className="mx-auto flex items-center justify-center p-5 rounded-xl hover:shadow-lg transition-all relative overflow-hidden group backdrop-blur-sm border-2 border-blue-400/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-orange-500/10 rounded-xl z-0" />
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white mb-4`}>
                  <IconCloudNetwork className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <div className="text-xl font-medium text-white">Internet Identity</div>
                  <div className="text-sm text-gray-300 mt-1">Decentralized authentication</div>
                </div>
              </div>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
              />
            </motion.button>
          </motion.div>

          {/* Connecting Animation */}
          <AnimatePresence>
            {isConnecting && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 p-4 bg-blue-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm max-w-xs mx-auto"
              >
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="rounded-full h-5 w-5 border-2 border-blue-400 border-t-transparent mr-3"
                />
                <span className="text-blue-400">Connecting to Internet Identity...</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Additional Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-sm text-gray-400"
          >
            <p>Internet Identity provides secure, anonymous authentication</p>
            <p className="mt-2">No personal information required</p>
          </motion.div>
        </motion.div>
      </motion.main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white/5 backdrop-blur-md py-6 border-t border-white/10 text-center text-sm text-gray-400 relative z-10"
      >
        <div className="container mx-auto px-4">
          By continuing, you agree to our <a href="#" className="text-blue-400 hover:underline">Terms</a> and <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>
        </div>
      </motion.footer>
    </div>
  );
};

export default LoginPage;