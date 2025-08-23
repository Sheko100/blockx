import React, { useState, useEffect } from "react";
import { registerAsset, hashFile } from "../controller/controller.js";
import "./RegistrationPage.css";

const AssetRegistrationForm = () => {
  const [fileName, setFileName] = useState('');
  const [form, setForm] = useState({
    asset_type: { Physical: null }, // default variant
    category: { RealEstate: null }, // default variant
    details: {
      name: "",
      description: "",
      extra_metadata: [],
      jurisdiction: [],
      serial_or_id: [],
    },
    ownership_proof: {
      document_url: [],
      witness: [],
      acquisition_date: [],
      files: [],
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    console.log('selected file', selectedFile);
    reader.onload = async () => {
      const bytes = new Uint8Array(reader.result);
      setForm((prev) => {
	const newForm = prev;
	newForm.ownership_proof.files.push(bytes);
	return newForm;
      });
      try {
      //let fileHash = await hashFile(view);
      } catch (err) {
	console.log('error', err);
      }
    };
    reader.onerror = () => {
      console.log("Error reading the file. Please try again.", "error");
    };

    reader.readAsArrayBuffer(selectedFile);

    setFileName(selectedFile ? selectedFile.name : '');
  };

  const handleChange = (path, value) => {
    setForm((prev) => {
      console.log("path", path);
      const newForm = structuredClone(prev);
      const keys = path.split(".");
      let obj = newForm;

      keys.forEach((k, i) => {
        console.log("keys", keys);
        if (i === keys.length - 1) {
          // Optional text fields
          if (["extra_metadata", "jurisdiction", "serial_or_id", "document_url", "witness"].includes(k)) {
            obj[k] = value ? [value] : [];
          }
          // Optional nat64 field
          else if (k === "acquisition_date") {
            obj[k] = value ? [Number(value)] : [];
          }
          // Variants
          else if (k === "asset_type" || k === "category") {
            obj[k] = { [value]: null };
          }
          // Normal text fields
          else {
            obj[k] = value;
          }
        } else {
          obj = obj[k];
        }
      });

      return newForm;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('form data', form);
    registerAsset(form);
  };

  return (
    <form className="register-asset-form" onSubmit={handleSubmit} className="asset-form">
      <h2>Register Asset</h2>

      <label>Asset Type</label>
      <select
        value={Object.keys(form.asset_type)[0]}
        onChange={(e) => handleChange("asset_type", e.target.value)}
      >
        <option value="Physical">Physical</option>
        <option value="NonPhysical">NonPhysical</option>
      </select>

      <label>Category</label>
      <select
        value={Object.keys(form.category)[0]}
        onChange={(e) => handleChange("category", e.target.value)}
      >
        <option value="RealEstate">RealEstate</option>
        <option value="Vehicle">Vehicle</option>
        <option value="ValuableItem">ValuableItem</option>
        <option value="Equipment">Equipment</option>
        <option value="DigitalAsset">DigitalAsset</option>
        <option value="IntellectualProperty">IntellectualProperty</option>
        <option value="ContractualRights">ContractualRights</option>
      </select>

      <h3>Details</h3>
      <input
        type="text"
        placeholder="Name"
        value={form.details.name}
        onChange={(e) => handleChange("details.name", e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={form.details.description}
        onChange={(e) => handleChange("details.description", e.target.value)}
      />
      <input
        type="text"
        placeholder="Extra Metadata"
        value={form.details.extra_metadata[0] || ""}
        onChange={(e) => handleChange("details.extra_metadata", e.target.value)}
      />
      <input
        type="text"
        placeholder="Jurisdiction"
        value={form.details.jurisdiction[0] || ""}
        onChange={(e) => handleChange("details.jurisdiction", e.target.value)}
      />
      <input
        type="text"
        placeholder="Serial or ID"
        value={form.details.serial_or_id[0] || ""}
        onChange={(e) => handleChange("details.serial_or_id", e.target.value)}
      />
              <div className="mt-6">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
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

      <h3>Ownership Proof</h3>
      <input
        type="text"
        placeholder="Document URL"
        value={form.ownership_proof.document_url[0] || ""}
        onChange={(e) => handleChange("ownership_proof.document_url", e.target.value)}
      />
      <input
        type="text"
        placeholder="Witness"
        value={form.ownership_proof.witness[0] || ""}
        onChange={(e) => handleChange("ownership_proof.witness", e.target.value)}
      />
      <input
        type="date"
        onChange={(e) =>
          handleChange(
            "ownership_proof.acquisition_date",
            e.target.value ? Date.parse(e.target.value) : null
          )
        }
      />

      <button type="submit">Register Asset</button>
    </form>
  );
};

export default AssetRegistrationForm;

