import CertificatePDF from '../CertificatePDF';
import { pdf } from '@react-pdf/renderer';
import { motion } from 'framer-motion';
import { getStringDate } from '../../utils';

export default function DownloadCertBtn ({asset, assetId, label="Download Certificate", textSize='text-md'}) {

  const downloadCert = async () => {
  // Create instance of PDF
  const creationDate = asset.created_at ? getStringDate(asset.created_at) : getStringDate();
  const blob = await pdf(<CertificatePDF asset={asset} assetId={assetId} date={creationDate} />).toBlob();

  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "asset_verisys.pdf";
  link.click();

  // Clean up
  URL.revokeObjectURL(url);
};

	return (
	  <motion.button
	    className={`${ textSize } relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all overflow-hidden group`}
	    whileHover={{ scale: 1.05 }}
	    whileTap={{ scale: 0.95 }}
	    onClick={downloadCert}
	  >
	    <span className="relative z-10">
	      {label}
	    </span>
	    <motion.span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
	    {/* Button shine effect */}
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
	);
}