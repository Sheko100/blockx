import { useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { processFile } from "../../utils";

export default function FileUpload({
  label,
  minFiles = 1,
  maxFiles = 1,
  multiple = false,
  value = [],
  allTypesSupported = false,
  supportedTypes=['PNG', 'JPG', 'webP', 'JPEG'],
  onChange,
}) {
  const [fileNames, setFileNames] = useState([]);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    setError("");
    const files = Array.from(e.target.files);

    if (files.length < minFiles || files.length > maxFiles) {
      setError(`Please upload at least ${minFiles} file(s) and no more than ${maxFiles}.`);
      return;
    }

    const isFileSupported = (file) => {
      const fileName = file.name;
      for (let type of supportedTypes) {
        type = type.toLowerCase();
        if (fileName.endsWith(type)) return true;
      }

      return false;
    }

    const processed = [];
    for (const file of files) {

      if (!allTypesSupported && !isFileSupported(file)) {
        setError(`Please, upload only supported types: ${supportedTypes.join(', ')}`)
        console.log('type is not supported');
        return;
      }

      const processedFile = await processFile(file);
      processed.push(processedFile);
    }

    setFileNames(files.map((f) => f.name));
    onChange(processed);
  };

  const isUploaded = value.length > 0;

  return (
    <div>
      <label className="block text-sm font-medium text-white mb-2">
        {label}
      </label>
      {error && (
        <p className="mt-1 text-black pl-4 rounded bg-red-300 backdrop-blur-sm">
          {error}
        </p>
      )}
      <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center bg-white/5 backdrop-blur-sm">
        <IconUpload className="mx-auto text-gray-400 w-12 h-12 mb-4" />

        {fileNames.map((name, i) => (
          <p className="text-s text-gray-500" key={i}>
            {name}
          </p>
        ))}

        <p className="text-m text-gray-200 mb-2">
          Supported: {allTypesSupported ? "All Files Types" : supportedTypes.join(', ')}
        </p>

        <input
          type="file"
          onChange={handleUpload}
          className="hidden"
          id={label.replace(/\s+/g, "-").toLowerCase()}
          multiple={multiple}
          disabled={value.length >= maxFiles}
        />

        <motion.label
          htmlFor={label.replace(/\s+/g, "-").toLowerCase()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500/30 to-blue-600/30 text-blue-400 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-500/40 transition-all"
        >
          {/*{isUploaded ? "Change File" : "Select File"}*/}
          Select File
        </motion.label>
      </div>
    </div>
  );
}
