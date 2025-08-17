import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { IconWallet, IconPlug, IconShieldLock, IconCloudNetwork, IconX, IconArrowRight, IconBrandDocker, IconCloud } from '@tabler/icons-react';
import { motion } from "framer-motion"; 

const LoginPage = ({ onLoginSuccess, redirectAction }) => {
  const [activeTab, setActiveTab] = useState('wallet');
  const [isConnecting, setIsConnecting] = useState(false);
  const [email, setEmail] = useState('');
  const [showRedirectMessage, setShowRedirectMessage] = useState(!!redirectAction);

  const walletProviders = [
    {
      id: 'internet-identity',
      name: 'Internet Identity',
      icon: <IconCloudNetwork className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'plug',
      name: 'Plug Wallet',
      icon: <IconPlug className="w-5 h-5" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'Binance',
      name: 'Binance Wallet',
      icon: <IconWallet className="w-5 h-5" />,
      color: 'from-green-500 to-green-600'
    }
  ];

  const handleConnect = (provider) => {
    setIsConnecting(true);
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false);
      onLoginSuccess({
        principal: "2vxsx-fae...", // truncated principal
        provider
      });
    }, 1500);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setIsConnecting(true);
    // Simulate email login
    setTimeout(() => {
      setIsConnecting(false);
      onLoginSuccess({
        principal: "email-user",
        provider: "email"
      });
    }, 1500);
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

      {/* Glass Morphic Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-white/10"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
            className="flex items-center cursor-pointer"
          >
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl"
            >
              P
            </motion.div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">PropLicense</span>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex-grow flex items-center justify-center py-12 px-4 relative z-10"
      >
        <motion.div 
          whileHover={{ y: -5 }}
          className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/10 relative"
        >
          {/* Decorative elements */}
          <motion.div 
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"
          />
          
          <div className="p-8">
            {/* Heading with action context */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent mb-2">
                {redirectAction === 'register' 
                  ? 'Register Your Digital Property' 
                  : 'Verify Property Ownership'}
              </h2>
              <p className="text-gray-300">Authenticate to continue</p>
            </motion.div>

            {/* Tabs with animated underline */}
            <motion.div className="flex border-b border-white/20 mb-6">
              {['wallet', 'email'].map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 font-medium text-sm relative ${
                    activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.03 }}
                >
                  {tab === 'wallet' ? 'Web3 Wallets' : 'Email'}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="authTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-orange-400"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* Wallet Providers */}
            {activeTab === 'wallet' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                {walletProviders.map((provider, index) => (
                  <motion.button
                    key={provider.id}
                    onClick={() => handleConnect(provider.id)}
                    disabled={isConnecting}
                    className="w-full flex items-center p-4 border border-white/20 rounded-lg hover:shadow-lg transition-all relative overflow-hidden group backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${provider.color} rounded-full flex items-center justify-center text-white mr-4 z-10`}>
                      {provider.icon}
                    </div>
                    <div className="text-left z-10">
                      <div className="font-medium text-white">{provider.name}</div>
                      <div className="text-xs text-gray-400">Secure decentralized login</div>
                    </div>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0"
                      whileHover={{ opacity: 0.1 }}
                    />
                  </motion.button>
                ))}

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="pt-2 text-center text-sm text-gray-400"
                >
                  New to Web3? <button 
                    onClick={() => setActiveTab('email')}
                    className="text-blue-400 hover:underline font-medium"
                  >
                    Use email instead
                  </button>
                </motion.div>
              </motion.div>
            )}

            {/* Email Login */}
            {activeTab === 'email' && (
              <motion.form
                onSubmit={handleEmailSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-4"
                >
                  <label className="block text-sm font-medium text-white mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white backdrop-blur-sm"
                    placeholder="your@email.com"
                    required
                  />
                </motion.div>
                
                <motion.button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-md font-medium transition-all relative overflow-hidden group"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 4px 15px -5px rgba(37, 99, 235, 0.5)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Send Magic Link
                    <IconArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0"
                    whileHover={{ opacity: 1 }}
                  />
                </motion.button>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-4 text-center text-sm text-gray-400"
                >
                  Prefer Web3? <button 
                    onClick={() => setActiveTab('wallet')}
                    className="text-blue-400 hover:underline font-medium"
                  >
                    Connect wallet instead
                  </button>
                </motion.p>
              </motion.form>
            )}

            {/* Connecting Animation */}
            <AnimatePresence>
              {isConnecting && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 p-4 bg-blue-500/20 rounded-lg flex items-center backdrop-blur-sm"
                >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="rounded-full h-5 w-5 border-2 border-blue-400 border-t-transparent mr-3"
                  />
                  <span className="text-blue-400">
                    {activeTab === 'email' 
                      ? 'Sending magic link...' 
                      : 'Connecting wallet...'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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