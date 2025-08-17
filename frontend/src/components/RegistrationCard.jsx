import { motion } from 'framer-motion';
import { IconFileText, IconShieldCheck } from '@tabler/icons-react';

const RegistrationCard = ({ registration }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-4"
    >
      <div className="flex items-start">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <IconFileText className="text-blue-500 w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-800">{registration.title}</h3>
          <p className="text-sm text-gray-500 mb-2">{registration.type} • {registration.date}</p>
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-full text-xs ${
              registration.status === 'Verified' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {registration.status}
            </span>
            <button className="text-blue-500 hover:text-blue-700 text-sm">
              View details
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RegistrationCard;