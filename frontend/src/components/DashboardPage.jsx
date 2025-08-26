import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
//import { useAuth } from './context/AuthContext';
import { useIIAuth } from './context/InternetIdentityContext';
import { IconFileText, IconClock, IconShieldCheck, IconArrowRight, IconX } from '@tabler/icons-react';
import Header from './Header';
import { getUserAssets } from '../controller/controller.js';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getStringDate } from '../utils';
import AssetItem from './ui/AssetItem';

const DashboardPage = () => {
  //const { user, logout } = useAuth();
  const [ assetsCount, setAssetsCount ] = useState(0);
  const [ registeredAssets, setRegisteredAssets ] = useState([]);
  const navigate = useNavigate();

  // Mock data - replace with actual API calls
  const registrations = [
    {
      id: 1,
      title: "Website Design",
      type: "Digital Art",
      date: "2023-06-15",
      status: "Verified",
      hash: "0x4a3b...8c2d"
    },
    {
      id: 2,
      title: "Ebook - Crypto Guide",
      type: "Document",
      date: "2023-06-10",
      status: "Pending",
      hash: "0x9f2e...1b4a"
    }
  ];

  useEffect(() => {

    async function getAssetsList() {
      let userAssets = [];

      try {
        userAssets = await getUserAssets();
      } catch (error) {
        console.error('Error during getting user assets:', error);
        toast.error('Failed to load assets. Please, refresh the page');
        return;
      }

      setRegisteredAssets(userAssets);
      setAssetsCount(userAssets.length);
    }

    getAssetsList();
  }, []);


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

      {/* Glass Morphic Header */}
      <Header showNav={false} showBtn={false} showAuth={true}/>

      {/* Main Content */}
      <motion.main 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex-grow container mx-auto px-4 py-8 relative z-10"
      >
        {/* Welcome Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/10 relative overflow-hidden"
        >
          {/* Decorative line */}
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
          
          <h1 className="text-2xl font-bold mb-2">
            Welcome back
          </h1>
          <p className="text-gray-300">
            Manage your digital property registrations and verifications
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 relative overflow-hidden"
          >
            <div className="flex items-center z-10 relative">
              <div className="bg-blue-500/20 p-3 rounded-full mr-4 backdrop-blur-sm">
                <IconFileText className="text-blue-400 w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-300">Total Registrations</p>
                <p className="text-2xl font-bold">{assetsCount}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -5 }}
            className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 relative overflow-hidden"
          >
            <div className="flex items-center z-10 relative">
              <div className="bg-green-500/20 p-3 rounded-full mr-4 backdrop-blur-sm">
                <IconShieldCheck className="text-green-400 w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-300">Verified</p>
                <p className="text-2xl font-bold">{assetsCount}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -5 }}
            className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 relative overflow-hidden"
          >
            <div className="flex items-center z-10 relative">
              <div className="bg-orange-500/20 p-3 rounded-full mr-4 backdrop-blur-sm">
                <IconClock className="text-orange-400 w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-300">Pending</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Registrations Table */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 backdrop-blur-md rounded-xl shadow-sm overflow-hidden border border-white/10"
        >
          <div className="flex justify-between p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold">Your Registrations</h2>

            <motion.button 
              onClick={() => navigate('/register')}
              className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-medium overflow-hidden group"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center">
                Add new 
              </span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              {/* Pulse animation */}
              <motion.span
                className="absolute inset-0 rounded-xl border-2 border-orange-400 opacity-0"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
            </motion.button>
          </div>

          <div className="divide-y divide-white/10">
            {registeredAssets.map((asset, i) => (
              <AssetItem asset={asset}/>
            ))}
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
          © 2025 Verisys. All rights reserved.
        </div>
      </motion.footer>
    </div>
  );
};

export default DashboardPage;