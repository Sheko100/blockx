import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { processFile, getStringDate } from '../utils';
import { registerAsset, getAsset } from '../controller/controller.js';
import { useIIAuth } from './context/InternetIdentityContext';
import Header from './Header';
import FileUpload from './ui/FileUpload';
import { toast } from 'react-hot-toast';
import DownloadCertBtn from './ui/DownloadCertBtn'; 
import { 
  IconUpload, 
  IconHome, 
  IconCar, 
  IconDiamond,
  IconTools,
  IconCopyright,
  IconBinary,
  IconFileTextShield,
  IconArrowRight,
  IconShieldCheckFilled,
  IconCertificate,
  IconCheck,
  IconArrowLeft,
  IconWorld,
  IconFileDescription,
  IconId,
  IconCalendar,
  IconUserCheck
} from '@tabler/icons-react';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isHoveringCert, setIsHoveringCert] = useState(false);

  const [fileNames, setFileNames] = useState([]);
  const [maxFiles, setMaxFiles] = useState(5);
  const [minFiles, setMinFiles] = useState(2);
  const [proofFileNames, setProofFileNames] = useState([]);
  const [maxProofFiles, setMaxProofFiles] = useState(2);
  const [mountedSection, setMountedSection] = useState('asset_type');
  const [assetHash, setAssetHash] = useState(null);

  const { principal, login, logout, loading, isAuthenticated } = useIIAuth();

  // Form state matching Rust structs
  const [formData, setFormData] = useState({
    asset_type: null,
    category: null,
    details: {
      // images only allowed for physical assets, and all files allowed for digital assets
      files: [],
      name: '',
      description: '',
      // for real estate
      address: [],
      // for vehicles like car, motorcycle, etc...
      type: [],
      // for equipmenets
      manufacturer: [],
    },
    ownership_proof: {
      // for real estate
      deed_document: [],
      deed_reference_number: [],
      // for vehicles and intellectual properties
      registration_number: [],
      // for vehicles
      license_plate: [],
      // for physical products
      serial_number: [],
      // for digital assets
      publication_links: [],
    },
  });

  const steps = [
    { id: 1, name: 'Asset Type' },
    { id: 2, name: 'Category' },
    { id: 3, name: 'Details' },
    { id: 4, name: 'Proof' },
    { id: 5, name: 'Complete' }
  ];

  useEffect(() => {
    if (formData.category === "DigitalAsset" && maxFiles !== 10 && minFiles !== 1) {
      // for digital assets
      setMaxFiles(10);
      setMinFiles(1);
    } else {
      // for physical assets
      setMaxFiles(5);
      setMinFiles(2);
    }

    clearForm();
  }, [formData.category]);

  const clearForm = () => {
    setFormData((prev) => ({
      ...prev,
      details: {
        // images only allowed for physical assets, and all files allowed for digital assets
        files: [],
        name: '',
        description: '',
        // for real estate
        address: '',
        // for vehicles like car, motorcycle, etc...
        type: '',
        // for equipmenets
        manufacturer: '',
      },
      ownership_proof: {
        // for real estate
        deed_document: [],
        deed_reference_number: '',
        // for vehicles and intellectual properties
        registration_number: '',
        // for vehicles
        license_plate: '',
        // for physical products
        serial_number: '',
        // for digital assets
        publication_links: '',
      },
    }));
    setFileNames([]);
    setProofFileNames([]);
  }
  const updateProgress = (step) => {
    const newProgress = ((step - 1) / (steps.length - 1)) * 100;
    setProgress(newProgress);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('details.')) {
      const detailField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        details: {
          ...prev.details,
          [detailField]: value
        }
      }));
    } else if (name.includes('proof.')) {
      const proofField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        ownership_proof: {
          ...prev.ownership_proof,
          [proofField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = async () => {
    if (currentStep >= steps.length) return;
    if (isAnimating) return;

    const sections = ['asset_type', 'category', 'details', 'ownership_proof'];
    setMountedSection((prev) => {
      const index = sections.indexOf(prev);
      if (index === sections.length - 1) return prev;

      return sections[index+1];
    });

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(prev => {
        const nextStep = Math.min(prev + 1, steps.length);
        updateProgress(nextStep);
        return nextStep;
      });
      setIsAnimating(false);
      if (currentStep === steps.length - 1) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }, 500);
  };

  const prevStep = () => {
    if (currentStep <= 1) return;
    if (isAnimating) return;

    const sections = ['asset_type', 'category', 'details', 'ownership_proof'];
    setMountedSection((prev) => {
      const index = sections.indexOf(prev);
      if (index === 0) return prev;

      return sections[index-1];
    });

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(prev => {
        const prevStep = Math.max(prev - 1, 1);
        updateProgress(prevStep);
        return prevStep;
      });
      setIsAnimating(false);
    }, 500);
  };

 const restart = () => {
  setCurrentStep(1);
  setProgress(0);
  clearForm();
  setMountedSection('asset_type');
 }

 const getCategorySpecificFields = () => {
  switch(formData.category) {
    case 'RealEstate':
      return [
        { name: 'details.address', label: 'Address', icon: <IconId />, type: 'text' },
      ];
    case 'Vehicle':
      return [
        { name: 'details.type', label: 'Type: car, motorcycle, etc..', icon: <IconId />, type: 'text' },
      ];
    case 'Equipment':
      return [
        { name: 'details.manufacturer', label: 'Manufacturer', icon: <IconId />, type: 'text' },
      ];
  }
 };

 const getCategorySpecificProofs = () => {
  switch(formData.category) {
    case 'RealEstate':
      return [
        { name: 'proof.deed_reference_number', label: 'Deed Reference Number', icon: <IconId />, type: 'text' },
      ];
    case 'Vehicle':
      return [
        { name: 'proof.registration_number', label: 'Registeration Number', icon: <IconId />, type: 'text' },
        { name: 'proof.license_plate', label: 'License Plate', icon: <IconId />, type: 'text' },                
      ];
    case 'ValuableItem':
      return [
        { name: 'proof.serial_number', label: 'Serial Number', icon: <IconId />, type: 'text' },
      ];
    case 'Equipment':
      return [
        { name: 'proof.serial_number', label: 'Serial Number', icon: <IconId />, type: 'text' },
      ];
    case 'IntellectualProperty':
      return [
        { name: 'proof.registration_number', label: 'Registeration Number', icon: <IconId />, type: 'text' },
      ];
    case 'DigitalAsset':
      return [
        // should be a list of links instead
        { name: 'proof.publication_links', label: 'Publication Links: URLs separated by commas ', icon: <IconId />, type: 'text' },
      ];
  }
};

  const submitData = () => {
    const validate = {
      details: {
        name: {
          regex: /^[a-zA-Z0-9\s\-\.,']{2,100}$/,
          error: "Name should be 2 - 100 characters and contain only letters, numbers, spaces, and basic punctuation (, - . ')",
        },
        description: {
          regex: /^.{10,1000}$/,
          error: "Description should be 10 - 1000 characters.",
        },
        address: {
          regex: /^[a-zA-Z0-9\s\-\.,'#]{5,200}$/,
          error: "Address should be 5 - 200 characters and contain letters, numbers, and symbols (, - . ' #).",
        },
        type: {
          regex: /^[a-zA-Z\s\-]{2,50}$/,
          error: "Type should be 2 - 50 characters and contain only letters, spaces, and hyphens.",
        },
        manufacturer: {
          regex: /^[a-zA-Z0-9\s\-\.,']{2,100}$/,
          error: "Manufacturer should be 2 - 100 characters and contain only letters, numbers, and basic punctuation.",
        },
      },
      ownership_proof: {
        deed_reference_number: {
          regex: /^[A-Za-z0-9\-\/]{6,20}$/,
          error: "Deed reference number should be 6–20 characters with letters, numbers, dashes, or slashes. Example: '2023/123456' or 'LR-987654'.",
        },
        registration_number: {
          regex: /^[A-Z0-9\-]{6,15}$/,
          error: "Registration number should be 6–15 characters with uppercase letters, numbers, or dashes. Example: 'ABC-123456'.",
        },
        license_plate: {
          regex: /^[A-Z0-9\s\-]{5,10}$/,
          error: "License plate should be 5–10 characters with letters, numbers, or dashes. Example: 'ABC-1234'.",
        },
        serial_number: {
          regex: /^[A-Z0-9\-]{5,30}$/,
          error: "Serial number should be 5–30 characters with uppercase letters, numbers, or dashes. Example: 'SN-12345-XYZ'.",
        },
        publication_links: {
          regex: /^(https?:\/\/[^\s,\/]+(\.[^\s,\/]+)+(\/[^\s,?#]+.*))(,\s*https?:\/\/[^\s,\/]+(\.[^\s,\/]+)+(\/[^\s,?#]+.*))*$/,
          error: "Publication links must be valid URLs separated by commas and point to a specific resource (not just a homepage). Example: 'https://example.com/article1, https://example.org/research/paper.pdf'.",
        }
      },
    };

    if (mountedSection === 'details') {
      // working because every category have only one specfic field so far
      let specificField = getCategorySpecificFields()
      const fieldsToValidate = ['name', 'description'];

      if (specificField) fieldsToValidate.push(specificField[0].name.split('.')[1]);

      if (formData.category !== 'IntellectualProperty' && formData.details['files'].length === 0) {
        toast.error("Please, fill all fields in this section");
        return;
      }

      for (const field of fieldsToValidate) {
        const value = formData.details[field];
        // checking for emptiness
        if (value.trim().length === 0) {
          toast.error("Please, fill all fields in this section");
          return;
        }
        const fieldValidation = validate.details[field];
        if (fieldValidation.regex.test(value.trim()) === false) {
          toast.error(fieldValidation.error);
          return;
        }
      }

      nextStep();

    } else if (mountedSection === 'ownership_proof') {
        const proofFields = getCategorySpecificProofs().map((proof) => proof.name.split('.')[1]);

        for (const field of proofFields) {
          const value = formData.ownership_proof[field];
          // pass if the field is empty
          if (value.trim().length < 1) continue;
          const fieldValidation = validate.ownership_proof[field];

          if (fieldValidation.regex.test(value) === false) {
            toast.error(fieldValidation.error);
            return;
          }
        }

      submitAsset();
    }
  }

  const submitAsset = async () => {

    // if not authenticated user should redirect to internet identity page to login
    if (isAuthenticated !== true) {
      try {
        const id = await login();
      } catch(error) {
        console.error('Error while logging in;', error);
        return;
      }
    }

    try {
      const hash = await registerAsset(formData);
      setAssetHash(hash);
      nextStep();
    } catch (error) {
      if ('AssetAlreadyExists' in error) {
          toast.error("This asset already registered,");
      } else {
        toast.error("Failed to register asset:", error[Object.keys(error)[0]]);
      }
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">What type of asset are you registering?</h2>
            <div className="grid grid-cols-2 gap-6">
              <motion.button
                whileHover={{ y: -5, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setFormData(prev => ({ ...prev, asset_type: 'Physical' }));
                  nextStep();
                }}
                className={`p-8 border-2 rounded-2xl flex flex-col items-center transition-all ${
                  formData.asset_type === 'Physical' 
                    ? 'border-emerald-400 bg-emerald-500/10 shadow-lg shadow-emerald-500/20' 
                    : 'border-white/20 hover:border-blue-300 bg-gradient-to-br from-gray-800/50 to-gray-900/50'
                }`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                  <IconHome className="text-blue-400 w-8 h-8" />
                </div>
                <span className="font-medium text-lg">Physical Asset</span>
                <p className="text-gray-400 text-sm mt-2">Real estate, vehicles, equipment</p>
              </motion.button>

              <motion.button
                whileHover={{ y: -5, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setFormData(prev => ({ ...prev, asset_type: 'NonPhysical' }));
                  nextStep();
                }}
                className={`p-8 border-2 rounded-2xl flex flex-col items-center transition-all ${
                  formData.asset_type === 'NonPhysical' 
                    ? 'border-purple-400 bg-purple-500/10 shadow-lg shadow-purple-500/20' 
                    : 'border-white/20 hover:border-purple-300 bg-gradient-to-br from-gray-800/50 to-gray-900/50'
                }`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-4">
                  <IconFileTextShield className="text-purple-400 w-8 h-8" />
                </div>
                {/* might need to be changed to non physical Asset*/}
                <span className="font-medium text-lg">Non-Physical Asset</span>
                <p className="text-gray-400 text-sm mt-2">Digital assets, documents, ideas, patents</p>
              </motion.button>
            </div>
          </motion.div>
        );

      case 2:
        const physicalCategories = [
          { value: 'RealEstate', label: 'Real Estate', icon: <IconHome className="w-5 h-5" />, color: 'from-blue-500 to-emerald-500' },
          { value: 'Vehicle', label: 'Vehicle', icon: <IconCar className="w-5 h-5" />, color: 'from-amber-500 to-orange-500' },
          { value: 'ValuableItem', label: 'Valuable Item', icon: <IconDiamond className="w-5 h-5" />, color: 'from-purple-500 to-pink-500' },
          { value: 'Equipment', label: 'Equipment', icon: <IconTools className="w-5 h-5" />, color: 'from-gray-500 to-blue-500' }
        ];

        const nonPhysicalCategories = [
          { value: 'DigitalAsset', label: 'Digital Asset', icon: <IconFileTextShield className="w-5 h-5" />, color: 'from-blue-500 to-purple-500' },
          { value: 'IntellectualProperty', label: 'Intellectual Property', icon: <IconCopyright className="w-5 h-5" />, color: 'from-amber-500 to-red-500' },
        ];

        return (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Select your asset category
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {(formData.asset_type === 'Physical' ? physicalCategories : nonPhysicalCategories).map((item) => (
                <motion.button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, category: item.value }));
                    nextStep();
                  }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className={`p-4 border rounded-xl flex items-center transition-all ${
                    formData.category === item.value 
                      ? `border-${item.color.split(' ')[1]}-400 bg-gradient-to-br ${item.color}/20 shadow-md` 
                      : 'border-white/20 hover:border-blue-300 bg-gradient-to-br from-gray-800/50 to-gray-900/50'
                  }`}
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${item.color}/20 rounded-lg flex items-center justify-center mr-3`}>
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
            </div>
            <motion.button
              onClick={prevStep}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-all flex items-center mt-6"
            >
              <IconArrowLeft className="mr-2" />
              Back
            </motion.button>
          </motion.div>
        );

      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Provide asset details
            </h2>
            
            <div className="space-y-4">

             {/*{formData.category === 'IntellectualProperty' || detailsFiles()} */}

             { formData.category === 'IntellectualProperty' ||
              <FileUpload
                label={formData.category === 'DigitalAsset'
                  ? "Upload your digital assets files (1 - 10 files)"
                  : "Upload at least 2 images showing your asset"
                }
                minFiles={formData.category === 'DigitalAsset' ? 1 : 2}
                maxFiles={formData.category === 'DigitalAsset' ? 10 : 5}
                multiple={true}
                value={formData.details.files}
                allTypesSupported={formData.category === 'DigitalAsset' ? true : false}
                supprtedTypes={formData.category === 'DigitalAssets' ? [] : ['PNG', 'JPEG', 'JPG', 'webP']}
                onChange={(files) =>
                  setFormData((prev) => ({
                    ...prev,
                    details: { ...prev.details, files },
                  }))
                }
              /> 
             }

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IconFileDescription className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="details.name"
                  value={formData.details.name}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Asset Name"
                  required
                />
              </div>

              <div>
                <textarea
                  name="details.description"
                  value={formData.details.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                  placeholder="Detailed description of the asset"
                  required
                />
              </div>

              { ['RealEstate', 'Equipment', 'Vehicle'].includes(formData.category) &&
                getCategorySpecificFields().map((field) => {
                return (
                  <div key={field.name} className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {field.icon}
                    </div>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData.details[field.name.split('.')[1]] || ''}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={field.label}
                    />
                  </div>
                )
              })}

            </div>

            <div className="flex justify-between mt-8">
              <motion.button
                onClick={prevStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-all flex items-center"
              >
                <IconArrowLeft className="mr-2" />
                Back
              </motion.button>
              <motion.button
                onClick={submitData}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium flex items-center"
              >
                Continue
                <IconArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
              <div style={{backgroundColor: "#309eff1c"}} className="flex items-start px-2 py-3 outline-1 rounded text-xs">
                <p>
                  <span className="font-semibold">Optional but recommended:</span> Adding ownership proof
                  will strengthen your case if someone else claims the ownership of this asset in the future.
                </p>
              </div>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Provide ownership proof
            </h2>
            
            <div className="space-y-4">

              {formData.category === 'RealEstate' &&
                <FileUpload
                  label="Upload your deed document"
                  minFiles={1}
                  maxFiles={1}
                  value={formData.ownership_proof.deed_document}
                  supportedTypes={['PDF', 'DOC', 'DOCX', 'ODT']}
                  onChange={(deedDoc) =>
                    setFormData((prev) => ({
                      ...prev,
                      ownership_proof: { ...prev.ownership_proof, deed_document: deedDoc},
                    }))
                  }
                />
              }

              {getCategorySpecificProofs().map((field) => {
                return (
                  <div key={field.name} className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {field.icon}
                    </div>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData.ownership_proof[field.name.split('.')[1]] || ''}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={field.label}
                    />
                  </div>
                )
              })}

            </div>

            <div className="flex justify-between mt-8">
              <motion.button
                onClick={prevStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-all flex items-center"
              >
                <IconArrowLeft className="mr-2" />
                Back
              </motion.button>
              <motion.button
                onClick={submitData}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium flex items-center"
                disabled={false}
              >
                Review & Submit
                <IconArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-8 text-center"
          >
            <div className="relative">
              {showConfetti && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: 0, y: 0, opacity: 1 }}
                      animate={{
                        x: Math.random() * 200 - 100,
                        y: Math.random() * 200 - 100,
                        opacity: 0,
                        rotate: Math.random() * 360
                      }}
                      transition={{
                        duration: 3,
                        ease: "easeOut"
                      }}
                      className="absolute text-2xl"
                      style={{
                        color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 5)]
                      }}
                    >
                      {['🎉', '✨', '🌟', '💎', '🏆'][Math.floor(Math.random() * 5)]}
                    </motion.div>
                  ))}
                </motion.div>
              )}
              
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <IconCheck className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-white">Registration Complete!</h2>
            <p className="text-gray-300 text-lg">
              Your asset has been successfully registered on the blockchain.
            </p>
            
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700/50 mt-8 text-left">
              <h3 className="text-xl font-bold mb-4 text-center">Registration Summary</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-500 text-sm">Asset Type</p>
                  <p className="text-white font-medium capitalize">
                    {formData.asset_type === 'Physical' ? 'Physical' : 'Non-Physical'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Category</p>
                  <p className="text-white font-medium capitalize">
                    {formData.category?.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Asset Name</p>
                  <p className="text-white font-medium">{formData.details.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Registration Date</p>
                  <p className="text-white font-medium">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                onClick={() => restart()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-all flex items-center"
              >
                Register Another
              </motion.button>
              <motion.button
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium flex items-center"
              >
                Return Home
                <IconArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
            </div>
            <DownloadCertBtn asset={formData} assetId={assetHash}/>
          </motion.div>
        );
      default:
        return null;
    }
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
      <Header showNav={false} showBtn={isAuthenticated} showAuth={isAuthenticated === false}/>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 overflow-hidden max-w-4xl mx-auto"
        >
          {/* Loading Bar Style Progress */}
          <div className="px-8 pt-8 pb-4 border-b border-white/10">
            <div className="mb-2 flex justify-between text-sm text-gray-400">
              <span>Step {currentStep} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2.5">
              <motion.div 
                className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2.5 rounded-full" 
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegistrationPage;