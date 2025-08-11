import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconUpload, IconCertificate, IconShieldLock, IconArrowRight } from '@tabler/icons-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileName(selectedFile ? selectedFile.name : '');
  };
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white"
    >
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div 
            onClick={() => navigate('/')}
            className="flex items-center cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <span className="ml-3 text-xl font-bold text-gray-800">PropLicense</span>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Already registered? Sign In
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Register Your <span className="text-blue-500">Digital</span> Ownership
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Secure your creative work on the blockchain with immutable proof of ownership
            </p>
          </div>

          {/* Registration Steps */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            {/* Step 1: Upload */}
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-start mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <IconUpload className="text-blue-500 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload Your Work</h3>
                  <p className="text-gray-600">Supported formats: PDF, JPG, PNG, MP4, MP3 (Max 50MB)</p>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <IconUpload className="w-10 h-10 text-gray-400 mb-3" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      {fileName || "No file selected"}
                    </p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            {/* Step 2: Details */}
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-start mb-6">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <IconCertificate className="text-orange-500 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Ownership Details</h3>
                  <p className="text-gray-600">Provide information about your work</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="My Digital Artwork"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Art</option>
                    <option>Music</option>
                    <option>Video</option>
                    <option>Document</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your work..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Step 3: Register */}
            <div className="p-8">
              <div className="flex items-start mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <IconShieldLock className="text-blue-500 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Registration</h3>
                  <p className="text-gray-600">Your work will be permanently recorded on the blockchain</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center mt-8">
                <div className="flex items-center mb-4 sm:mb-0">
                  <input
                    id="terms-checkbox"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="terms-checkbox" className="ml-2 text-sm text-gray-700">
                    I agree to the <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>
                  </label>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center"
                >
                  Register Ownership
                  <IconArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RegistrationPage;