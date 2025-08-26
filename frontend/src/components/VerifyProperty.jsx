import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { verifyAsset } from '../controller/controller';
import { Listbox } from "@headlessui/react";
import { 
  IconSearch, 
  IconShieldCheck, 
  IconFileCertificate, 
  IconArrowRight,
  IconInfoCircle,
  IconX,
  IconBox,
  IconDeviceLaptop
} from '@tabler/icons-react';

const VerifyProperty = () => {
  const navigate = useNavigate();
  const [assetHash, setAssetHash] = useState('');
  const [assetCategory, setAssetCategory] = useState(''); // 'digital' or 'physical'
  const [showResult, setShowResult] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const categories = [
    { value: "", label: "Select a category" },
    { value: "RealEstate", label: "Real Estate" },
    { value: "Vehicle", label: "Vehicle" },
    { value: "ValuableItem", label: "Valuable Item" },
    { value: "Equipment", label: "Equipment" },
    { value: "DigitalAsset", label: "Digital Asset" },
    { value: "IntellectualProperty", label: "Intellectual Property" },
  ];

  const [selected, setSelected] = useState(categories[0]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    let isVerified = false;
    setShowResult(false);
    try {
       isVerified = await verifyAsset(assetHash, selected.value);
        setShowResult(true);
        setIsValid(isVerified);
    } catch (error) {
        toast.error()
        console.error("Couldn't verify the asset:", error);
    }

    setIsVerifying(false);
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

      {/* Glass Morphic Header */}
      <Header showNav={false} showBtn={true}/>

      {/* Main Content */}
      <motion.main
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex-grow flex items-center justify-center py-12 px-4 relative z-10"
      >
        <div className="w-full max-w-3xl mx-auto">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              Verify Asset Ownership
            </h1>
            <p className="text-xl text-gray-300">
              Check the authenticity and ownership of any registered asset
            </p>
          </motion.div>

          {/* Verification Form */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/5 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/10 relative"
          >
            {/* Decorative line */}
            <motion.div 
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"
            />

            <div className="p-8">
              <form onSubmit={handleVerify}>
                {/* Asset Category Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white mb-3">
                    Asset Category
                  </label>
                  <div className="w-full">
                    <Listbox value={selected} onChange={setSelected}>
                      <Listbox.Button className="w-full py-3 px-4 rounded-lg bg-white/10 border border-white/20 text-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm">
                        {selected.label}
                      </Listbox.Button>
                      <Listbox.Options className="mt-1 rounded-lg bg-white/20 border border-white/30 backdrop-blur-sm text-white shadow-lg">
                        {categories.map((category) => (
                          <Listbox.Option
                            key={category.value}
                            value={category}
                            className={({ active }) =>
                              `cursor-pointer px-4 py-2 ${
                                active ? "bg-blue-500 text-white" : "bg-transparent"
                              }`
                            }
                          >
                            {category.label}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Listbox>
                  </div>
                </div>

                {/* Asset Hash/ID Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white mb-2">
                    Asset Hash / ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IconSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={assetHash}
                      onChange={(e) => setAssetHash(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white backdrop-blur-sm"
                      placeholder="Enter asset hash or identifier"
                      required
                    />
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 15px -5px rgba(37, 99, 235, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isVerifying ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="inline-block mr-2"
                        >
                          <IconInfoCircle className="w-5 h-5" />
                        </motion.span>
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify Ownership
                        <IconArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.button>
              </form>
            </div>
          </motion.div>


          {/* Verification Results */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-8 bg-white/5 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/10"
              >
                <div className="p-6 border-b border-white/10 bg-blue-500/20">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <IconShieldCheck className="text-blue-400 mr-2" />
                    Verification Results
                    <span className="ml-2 text-sm font-normal bg-blue-700/30 px-2 py-1 rounded-md">
                      {assetCategory === 'DigitalAsset'
                      && assetCategory === 'IntellectualProperty'
                       ? 'Non-Physical Asset' : 'Physical Asset'}
                    </span>
                  </h3>
                </div>

                <div className="p-6">
                  <div className={`mb-4 p-4 rounded-lg ${isValid ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    <div className="flex items-center">
                      <IconShieldCheck className="mr-2" />
                      <span className="font-medium">
                        {isValid
                          ? 'Valid Ownership Record Found' 
                          : 'No Valid Ownership Record'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white/5 backdrop-blur-md py-6 border-t border-white/10 text-center text-sm text-gray-400 relative z-10"
      >
        <div className="container mx-auto px-4">
          © {new Date().getFullYear()} PropLicense. All rights reserved.
        </div>
      </motion.footer>
    </div>
  );
};

export default VerifyProperty;