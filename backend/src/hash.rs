use sha2::{Sha256, Digest};
use crate::asset::{Asset, AssetType, AssetCategory};
use candid::{CandidType, Deserialize, Encode, Decode};

pub fn hash_bytes(data: Vec<u8>) -> Vec<u8> {
    let mut hasher = Sha256::new();
    hasher.update(data);
    let result = hasher.finalize();
    result.to_vec()
}

pub fn hash_bytes_to_string(data: &Vec<u8>) -> String {
    let mut hasher = Sha256::new();
    hasher.update(data);
    let result = hasher.finalize();
    hex::encode(result)
}

// hashes a text
pub fn hash_text(data: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(data.as_bytes());
    let result = hasher.finalize();
    hex::encode(result)
}

impl Asset {
    pub fn hash_unique_fields(&mut self) {

        /*if let Some(doc) = &self.ownership_proof.deed_document {
            if !doc.is_empty() {
                self.ownership_proof.deed_document = Some(hash_bytes(doc.clone()));
            }
        }*/

        // useless -- already hashed from the frontend
        /*self.ownership_proof.deed_document = self.ownership_proof.deed_document
            .iter()
            .map(|doc| {
                if !doc.is_empty() {
                    hash_bytes(doc.clone())
                } else {
                    doc.clone()
                }
            })
            .collect();*/

        if let Some(ref num) = self.ownership_proof.deed_reference_number {
            if !num.is_empty() {
                self.ownership_proof.deed_reference_number = Some(hash_text(num));
            }
        }

        if let Some(ref reg) = self.ownership_proof.registration_number {
            if !reg.is_empty() {
                self.ownership_proof.registration_number = Some(hash_text(reg));
            }
        }

        if let Some(ref plate) = self.ownership_proof.license_plate {
            if !plate.is_empty() {
                self.ownership_proof.license_plate = Some(hash_text(plate));
            }
        }

        if let Some(ref serial) = self.ownership_proof.serial_number {
            if !serial.is_empty() {
                self.ownership_proof.serial_number = Some(hash_text(serial));
            }
        }

        self.ownership_proof.publication_links = self.ownership_proof.publication_links
            .iter()
            .map(|link| {
                if !link.is_empty() {
                    hash_text(link)
                } else {
                    link.clone()
                }
            })
            .collect();

        // can be refactored to if conditions
        match self.asset_type {
            AssetType::Physical => {
                // Images stored in details.files
                // useless -- already hashed from the frontend
                /*self.details.files = self.details.files
                    .iter()
                    .map(|file| {
                        if !file.is_empty() {
                            hash_bytes(file.clone())
                        } else {
                            file.clone()
                        }
                    })
                    .collect();*/
            }
            AssetType::NonPhysical => {
                match self.category {
                    AssetCategory::DigitalAsset => {
                        // Files (docs, images, etc.)
                        // useless -- already hashed from the frontend
                        /*self.details.files = self.details.files
                            .iter()
                            .map(|file| {
                                if !file.is_empty() {
                                    hash_bytes(file.clone())
                                } else {
                                    file.clone()
                                }
                            })
                            .collect();*/
                    }
                    AssetCategory::IntellectualProperty => {
                        if !self.details.description.is_empty() {
                            self.details.description =
                                hash_text(&self.details.description);
                        }
                    }
                    _ => {}
                }
            }
        }
    }
    pub fn compute_hash(&self) -> String {
        let mut asset_clone = self.clone();
        //asset_clone.hash = String::new(); // exclude existing hash

        // Serialize (json or bincode)
        let serialized = Encode!(&asset_clone)
            .expect("Failed to serialize asset");

        // Hash it
        let mut hasher = Sha256::new();
        hasher.update(&serialized);
        let result = hasher.finalize();

        hex::encode(result) // return lowercase hex string
    }
}


// Normalizes a String
pub fn normalize_str<S: AsRef<str>>(input: S) -> String {
    //normalize_str_inner(&s)
    input.as_ref()
        .chars()
        .filter(|c| !c.is_whitespace()) // remove all spaces
        .collect::<String>()
        .to_lowercase()
}

// Normalize an Option<String>
pub fn normalize_opt_str<S: AsRef<str>>(input: Option<S>) -> Option<String> {
    Some(input
        .map(|s| normalize_str(s))
        .unwrap_or_default())
}
