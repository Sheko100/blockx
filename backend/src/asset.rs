use std::borrow::Cow;
use ic_stable_structures::{Storable, storable::Bound};
use candid::{CandidType, Deserialize, Encode, Decode, Principal};
use ic_cdk::api::msg_caller;
use crate::store::{
    store_asset,
    retrieve_asset,
    retrieve_assets,
    retrieve_assets_count,
    asset_ids_by_category,
    asset_ids_by_principal,

};
use crate::hash::{normalize_str, normalize_opt_str, hash_text};
use crate::utils::{get_timestamp, is_authenticated};
use crate::err::{ServiceError, ServiceResult};

#[derive(CandidType, Deserialize, Clone, Debug)]
pub struct AssetUserInput {
    pub asset_type: AssetType,
    pub category: AssetCategory,     // sub-category
    pub details: AssetDetails,      // structured details
    pub ownership_proof: Proof,
}

#[derive(CandidType, Deserialize, Clone, Debug)]
pub enum AssetType {
    Physical,
    NonPhysical,
}

#[derive(CandidType, Deserialize, Clone, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub enum AssetCategory {
    RealEstate,
    Vehicle,
    ValuableItem,
    Equipment,
    DigitalAsset,
    IntellectualProperty,
}

impl Storable for AssetCategory {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
    const BOUND: Bound = Bound::Unbounded;
}

#[derive(CandidType, Deserialize, Clone, Debug)]
pub struct AssetDetails {
    pub files: Vec<Vec<u8>>,
    pub name: String,
    pub description: String,
    // for real estate
    pub address: Option<String>,
    // for vehicle
    pub r#type: Option<String>,
    // for equipment
    pub manufacturer: Option<String>

}

#[derive(CandidType, Deserialize, Clone, Debug)]
pub struct Proof {
    // for real estate
    pub deed_document: Option<Vec<u8>>,
    pub deed_reference_number: Option<String>,
    // for vehicles and intellectual properties
    pub registeration_number: Option<String>,
    // for vehicles
    pub license_plate: Option<String>,
    // for physical products
    pub serial_number: Option<String>,
    // for digital assets
    pub publication_links: Option<String>,
}

#[derive(CandidType,Deserialize, Clone, Debug)]
pub struct Asset {
    pub owner: Principal,
    pub asset_type: AssetType,
    pub category: AssetCategory,
    pub details: AssetDetails,
    pub ownership_proof: Proof,
    pub hash: String,
    pub created_at: u128,
}

impl Asset {
    pub fn is_owner(&self, caller: Principal) -> bool {
        caller == self.owner
    }
}

impl Storable for Asset {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
    const BOUND: Bound = Bound::Unbounded;
}

#[derive(CandidType, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct AssetIds(pub Vec<u128>);

impl Storable for AssetIds {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Unbounded;
}

/* YOU WERE HERE
 * TODO:
 * - add guards for empty strings
 * - make the publications_links in a vector
 * - delete the category assets count as it's not useful anymore
 *
 * LOGIC:
 * some data will have files included and some not
 *
 * RealEstate will need to have files as in the proof section like, document of deed and deed
 * reference
 * RealEstate will need to have address field
 *
 * DigitalAsset will need to upload files of that asset in the details section
 * DigitalAsset should provide publication links if there are any
 *
 * WITH PHYSICAL ASSETS
 *  PROOF SECTION SHOULD HAVE ONLY THINGS THAT ONLY THE OWNER CAN HAVE 
 *  like deeds documents - legal ownership documents in PDF
 * 
 * PHYSICAL ASSETS
 *
 * if the images already exist - CAN"T REGISTER OWNERSHIP
 *
 * NON PHYSICAL ASSETS
 *
 * DIGITAL ASSETS
 *
 * if the files already exist - CAN"T REGISTER OWNERSHIP
 *
 * INTELECTUAL PROPERTY
 *
 * if the description already exist - CAN"T REGISTER OWNERSHIP
 *
 * ALL ASSETS
 * if any PROOF SECTION data already exist - CAN"T REGISTER OWNERSHIP
 *
 *
 *- Physical assets
 * - Real State
 *   - Details
 *     - images
 *     - Name
 *     - Description
 *     - Address
 *   - Ownership Proof
 *     - Deed document
 *     - Deed reference number
 * - Vehicle
 *   - Details
 *     - Images
 *     - Type
 *     - Name
 *     - Description
 *   - Ownership Proof
 *     - Registeration Number
 *     - License Plate
 * - Valuable Item
 *   - Details
 *     - Images
 *     - Name
 *     - Description
 *   - Ownership Proof
 *     - Serial Number
 * - Equipment
 *   - Details
 *     - Images
 *     - Name
 *     - Description
 *     - Manufacturer
 *  - Ownership Proof
 *    - Serial Number
 *- Non Physical Assets
 * - Digital Assets
 *   - Details
 *     - Files
 *     - Name
 *     - Description
 *   - Ownership Proof
 *     - Publication Links
 * - Intelectual property
 *   - Details
 *     - type
 *     - Name
 *     - Description
 *   - Ownership Proof
 *     - Registration number
 */
#[ic_cdk::update]
pub fn register_asset(mut asset_data: AssetUserInput) -> ServiceResult<String> {

    if !is_authenticated() {
        return Err(ServiceError::Unauthorized(
            String::from("Only autenticated users can register assets")
        ));
    }

    let normalized_text = normalize_asset_input(&mut asset_data);
    //let asset_hash = hash_text(&normalized_text);

    let mut asset = Asset {
        owner: msg_caller(),
        asset_type: asset_data.asset_type,
        category: asset_data.category,     // sub-category
        details: asset_data.details,       // structured details
        ownership_proof: asset_data.ownership_proof, // must always be hashed
        hash: String::new(),
        created_at: get_timestamp(),             // timestamp
    };

    // hash the whole asset
    let asset_hash = asset.compute_hash();

    // add the hash
    asset.hash = asset_hash;

    asset.hash_unique_fields();

    //println!("asset after hashing: {asset:?}");

    if is_unique_asset(&asset) == false {
        return Err(ServiceError::AssetAlreadyExists(
            String::from("Asset Can not be created, as it has been already registered")
        ));
    }

    let hash = asset.hash.clone();
    let user = msg_caller();

    store_asset(asset, user);

    Ok(hash)
}

/*
 * TODO:
 * add guards for key beyond the stored users count
 */
#[ic_cdk::query]
pub fn get_asset(id: u128) -> Asset {
    let asset: Asset = retrieve_asset(id).expect("Couldn't retrieve the asset");

    asset
}

#[ic_cdk::query]
pub fn get_assets(ids: Vec<u128>) -> Vec<Asset> {
    let assets = retrieve_assets(ids).expect("Couldn't retrieve the assets");

    assets
}

#[ic_cdk::query]
pub fn get_user_assets() -> Vec<Asset> {
    let principal = msg_caller();

    let user_assets_ids = asset_ids_by_principal(&principal);

    let user_assets = get_assets(user_assets_ids);

    user_assets
}

pub fn get_assets_count(category: Option<AssetCategory>) -> u128 {
    let count: u128 = retrieve_assets_count(category).expect(
        "Couldn't retrieve assets count"
    );
    
    count
}

/**
 * LOGIC:
 * will get a list8 of assets based on category
 * iterate the list and get every asset based on the id
 * then based on which category, there will be specific comparisions on specific data with hashing
 * 
 * MUST APPROVE - files and ownership proof data
 */
pub fn is_unique_asset(new_asset: &Asset) -> bool {
    let mut is_unique = true;
    let category: &AssetCategory = &new_asset.category;
    let asset_ids: Vec<u128> = asset_ids_by_category(category);

    // iterate category assets
    for id in asset_ids {
        // get cetgory asset
        let old_asset = get_asset(id);
        is_unique = is_data_unique(new_asset, &old_asset);
        // add a checker to break once it's false without continuing the loop
        if is_unique == false {
            break;
        }
    }

    is_unique
}

pub fn is_data_unique(new_asset: &Asset, old_asset: &Asset) -> bool {

        // should be iteration to check every file
        if let Some(doc) = &new_asset.ownership_proof.deed_document {
            if !doc.is_empty() 
            && new_asset.ownership_proof.deed_document == old_asset.ownership_proof.deed_document {
                return false;
            }
        }

        if let Some(ref num) = new_asset.ownership_proof.deed_reference_number {
            if !num.is_empty()
            && new_asset.ownership_proof.deed_document == old_asset.ownership_proof.deed_document {
                return false;
            }
        }

        if let Some(ref reg) = new_asset.ownership_proof.registeration_number {
            if !reg.is_empty() 
            && new_asset.ownership_proof.registeration_number == old_asset.ownership_proof.registeration_number {
                return false;
            }
        }

        if let Some(ref plate) = new_asset.ownership_proof.license_plate {
            if !plate.is_empty() 
            && new_asset.ownership_proof.license_plate == old_asset.ownership_proof.license_plate {
                return false;
            }
        }

        if let Some(ref serial) = new_asset.ownership_proof.serial_number {
            if !serial.is_empty() 
            && new_asset.ownership_proof.serial_number == old_asset.ownership_proof.serial_number {
                return false;
            }
        }

        // will need to be changed to a list of links
        if let Some(ref links) = new_asset.ownership_proof.publication_links {
            if !links.is_empty() 
            && new_asset.ownership_proof.publication_links == old_asset.ownership_proof.publication_links {
                return false;
            }
        }

        // checking uploaded files
        if new_asset.details.files.len() > 0 && new_asset.details.files == old_asset.details.files {
            return false;
        }

        // IntellectualProperty unique field
        if new_asset.category == AssetCategory::IntellectualProperty 
        && new_asset.details.description == old_asset.details.description {
            return false;
        }

        true
}

// Normalize all string fields in AssetUserInput
pub fn normalize_asset_input(input: &mut AssetUserInput) {
    // should not normalize what in details
    //input.details.name = normalize_str(&input.details.name);
    //input.details.description = normalize_str(&input.details.description);

    input.ownership_proof.deed_reference_number = normalize_opt_str(
        input.ownership_proof.deed_reference_number.as_ref()
    );

    input.ownership_proof.registeration_number = normalize_opt_str(
        input.ownership_proof.registeration_number.as_ref()
    );

    input.ownership_proof.license_plate = normalize_opt_str(
        input.ownership_proof.license_plate.as_ref()
    );

    input.ownership_proof.serial_number = normalize_opt_str(
        input.ownership_proof.serial_number.as_ref()
    );

    // will need to be a list of links to be prevent the manipulating the order of the links
    // and hacking the proof
    input.ownership_proof.publication_links = normalize_opt_str(
        input.ownership_proof.publication_links.as_ref()
    );
    //let combined_str = concatenate_user_input(input);
    //let combined_str = String::from("hello");

    //combined_str
}

/*fn concatenate_user_input(input: &mut AssetUserInput) -> String {
    let combined = format!(
        "{}|{}|{}|{}|{}|{}|{}",
        input.details.name,
        input.details.description,
        //input.details.extra_metadata.as_ref().unwrap(),
        //input.details.jurisdiction.as_ref().unwrap(),
        //input.details.serial_or_id.as_ref().unwrap(),
        //input.ownership_proof.document_url.as_ref().unwrap(),
        //input.ownership_proof.witness.as_ref().unwrap(),
    );

    combined
}*/
