import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './context/AuthContext';
import { IconFileText, IconClock, IconShieldCheck, IconArrowRight, IconX } from '@tabler/icons-react';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  
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
      <motion.header 
        className="bg-white/5 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
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
          
          <div className="flex items-center space-x-4">
            <span className="text-sm bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
              {user?.principal?.slice(0, 8)}...{user?.principal?.slice(-4)}
            </span>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="text-sm bg-gradient-to-r from-blue-500/70 to-orange-500/70 hover:from-blue-600/70 hover:to-orange-600/70 px-4 py-2 rounded-md transition-all"
            >
              Sign Out
            </motion.button>
          </div>
        </div>
      </motion.header>

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
            Welcome back, <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">User</span>
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
                <p className="text-2xl font-bold">12</p>
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
                <p className="text-2xl font-bold">8</p>
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
                <p className="text-2xl font-bold">4</p>
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
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold">Your Registrations</h2>
          </div>

          <div className="divide-y divide-white/10">
            {registrations.map((reg) => (
              <motion.div 
                key={reg.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.07)' }}
                className="p-6 flex flex-col md:flex-row md:items-center justify-between"
              >
                <div className="mb-4 md:mb-0">
                  <h3 className="font-medium">{reg.title}</h3>
                  <p className="text-sm text-gray-300">{reg.type} • {reg.date}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm backdrop-blur-sm ${
                    reg.status === 'Verified' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {reg.status}
                  </span>
                  
                  <motion.button 
                    whileHover={{ x: 5 }}
                    className="flex items-center text-blue-400 hover:text-blue-300"
                  >
                    <span>Details</span>
                    <IconArrowRight className="ml-1 w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
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
          © 2023 PropLicense. All rights reserved.
        </div>
      </motion.footer>
    </div>
  );
};

export default DashboardPage;