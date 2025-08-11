import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
//import { TablerIcon, IconWallet, IconPlug, IconShieldLock, IconBrandInternetComputer, IconX, IconArrowRight } from '@tabler/icons-react';
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col"
    >
      {/* Animated Redirect Banner */}
      <AnimatePresence>
        {showRedirectMessage && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-blue-500 text-white py-3 px-4 shadow-md"
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
                className="p-1 rounded-full hover:bg-blue-600 transition-colors"
              >
                <IconX size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white shadow-sm py-4"
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <span className="ml-3 text-xl font-bold text-gray-800">PropLicense</span>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex-grow flex items-center justify-center py-12 px-4"
      >
        <motion.div 
          whileHover={{ y: -5 }}
          className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 relative"
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
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {redirectAction === 'register' 
                  ? 'Register Your Digital Property' 
                  : 'Verify Property Ownership'}
              </h2>
              <p className="text-gray-600">Authenticate to continue</p>
            </motion.div>

            {/* Tabs with animated underline */}
            <motion.div className="flex border-b border-gray-200 mb-6">
              {['wallet', 'email'].map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 font-medium text-sm relative ${activeTab === tab ? 'text-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
                  whileHover={{ scale: 1.03 }}
                >
                  {tab === 'wallet' ? 'Web3 Wallets' : 'Email'}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="authTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
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
                    className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all relative overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${provider.color} rounded-full flex items-center justify-center text-white mr-4 z-10`}>
                      {provider.icon}
                    </div>
                    <div className="text-left z-10">
                      <div className="font-medium text-gray-800">{provider.name}</div>
                      <div className="text-xs text-gray-500">Secure decentralized login</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0"></div>
                  </motion.button>
                ))}

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="pt-2 text-center text-sm text-gray-500"
                >
                  New to Web3? <button 
                    onClick={() => setActiveTab('email')}
                    className="text-blue-500 hover:underline font-medium"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </motion.button>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-4 text-center text-sm text-gray-500"
                >
                  Prefer Web3? <button 
                    onClick={() => setActiveTab('wallet')}
                    className="text-blue-500 hover:underline font-medium"
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
                  className="mt-6 p-4 bg-blue-50 rounded-lg flex items-center"
                >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent mr-3"
                  />
                  <span className="text-blue-500">
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
        className="bg-white py-6 border-t border-gray-200 text-center text-sm text-gray-500"
      >
        <div className="container mx-auto px-4">
          By continuing, you agree to our <a href="#" className="text-blue-500 hover:underline">Terms</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default LoginPage;