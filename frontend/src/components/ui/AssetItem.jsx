import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getStringDate } from '../../utils';
import { IconArrowDown } from '@tabler/icons-react';
import DownloadCertBtn from './DownloadCertBtn';

export default function AssetItem({asset}) {
	const [showDetails, setShowDetails] = useState(false);

	return (
	  <motion.div>
	    <motion.div 
	      initial={{ opacity: 0 }}
	      animate={{ opacity: 1 }}
	      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.07)' }}
	      className="p-6 flex flex-col md:flex-row md:items-center justify-between"
	    >
	      <div className="mb-4 md:mb-0">
	        <h3 className="font-medium">{asset.details.name}</h3>
	        <p className="text-sm text-gray-300">{asset.category} • {getStringDate(asset.created_at)}</p>
	      </div>
	      
	      <div className="flex items-center space-x-4">
	       {/*<span className={`px-3 py-1 rounded-full text-sm backdrop-blur-sm ${
	        reg.status === 'Verified' 
	            ? 'bg-green-500/20 text-green-400' 
	            : 'bg-orange-500/20 text-orange-400'
	            'bg-green-500/20 text-green-400' 
	        }`}>
	          Verified
	        </span>*/}

	        <span className={'px-3 py-1 rounded-full text-sm backdrop-blur-sm bg-green-500/20 text-green-400'}>
	          Verified
	        </span>
	        
	        <motion.button 
	          whileHover={{ x: 5 }}
	          className="flex items-center text-blue-400 hover:text-blue-300"
	          onClick={() => setShowDetails(!showDetails)}
	        >
	          <span>Details</span>
	          <IconArrowDown className="ml-1 w-4 h-4" />
	        </motion.button>
	      </div>
	    </motion.div>
	    {showDetails && <AnimatePresence>
	      <motion.div
	        initial={{ opacity: 0, height: 0 }}
	        animate={{ opacity: 1, height: "auto" }}
	        exit={{ opacity: 0, height: 0 }}
	        transition={{ duration: 0.3 }}
	        className="w-full col-span-full bg-gray-900 rounded-b-xl p-4"
	      >
	      {Object.keys(asset.details).filter((label) => label !== 'files' && asset.details[label] !== '').map((label) => {

	      		const capitalLabel = label.charAt(0).toUpperCase() + label.substring(1);
		      	return (
		      		<p className="p-1 text-gray-300 text-sm">
		      			<strong>{capitalLabel}:</strong>
		      			<span className="pl-3" >{asset.details[label]}</span>
		      		</p>
		      	);
	      	})}
	      <p className="p-1 text-gray-300 text-sm">
		      <strong>Asset ID::</strong>
		    	<span className="pl-3" >0x{asset.hash}</span>
		    </p>
	      <div className="mt-2 flex">
	      	<DownloadCertBtn asset={asset} assetId={asset.hash ? asset.hash : '0'}textSize='text-sm'/>
	      </div>
	      </motion.div>
	    </AnimatePresence>
	  }
	  </motion.div>
	);
}