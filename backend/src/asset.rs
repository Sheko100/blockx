use std::borrow::Cow;
use ic_stable_structures::{Storable, storable::Bound};
use candid::{CandidType, Deserialize, Encode, Decode};
use crate::store::{store_asset, retrieve_asset, retrieve_assets_count};
use crate::hash::{normalize_str, normalize_opt_str, hash_text};
use crate::utils::get_timestamp;

#[derive(CandidType, Deserialize, Clone, Debug)]
pub struct AssetUserInput {
    pub asset_type: AssetType,
    pub category: AssetCategory,     // sub-category
    pub details: AssetDetails,       // structured details
    pub ownership_proof: Proof,
}

#[derive(CandidType, Deserialize, Clone, Debug)]
pub struct Asset {
    //pub id: u128,
    //pub owner_id: u128,
    pub asset_type: AssetType,
    pub category: AssetCategory,
    pub details: AssetDetails,
    pub ownership_proof: Proof,
    pub hash: String,
    pub created_at: u128,
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

#[derive(CandidType, Deserialize, Clone, Debug)]
pub enum AssetType {
    Physical,
    NonPhysical,
}

#[derive(CandidType, Deserialize, Clone, Debug)]
pub enum AssetCategory {
    RealEstate,
    Vehicle,
    ValuableItem,
    Equipment,
    DigitalAsset,
    IntellectualProperty,
    ContractualRights,
}

#[derive(CandidType, Deserialize, Clone, Debug)]
pub struct AssetDetails {
    pub name: String,
    pub description: String,
    pub serial_or_id: Option<String>,
    pub jurisdiction: Option<String>,
    pub extra_metadata: Option<String>,
}

#[derive(CandidType, Deserialize, Clone, Debug)]
pub struct Proof {
    pub document_url: Option<String>,
    pub witness: Option<String>,
    pub acquisition_date: Option<u64>,
}

/*
 * TODO:
 * add guards for empty strings
 *
 * LOGIC:
 *
 * adding the asset will need some processing for the data info
 * so the asset could be a file (image, document) and text as a description like title, 
 *
 * when the user enters the ownership registration will need to choose between:
 *
 * input data should be normalized and concatanted
 *
 */
#[ic_cdk_macros::update]
pub fn register_asset(mut assetData: AssetUserInput) -> String {

    let normalized_text = normalize_asset_input(&mut assetData);

    let asset_hash = hash_text(&normalized_text);

    let asset = Asset {
        asset_type: assetData.asset_type,
        category: assetData.category,     // sub-category
        details: assetData.details,       // structured details
        ownership_proof: assetData.ownership_proof,
        hash: asset_hash,
        created_at: get_timestamp(),             // timestamp
    };

    let hash = asset.hash.clone();

    store_asset(asset);

    hash
}

/*
 * TODO:
 * add guards for key beyond the stored users count
 */
pub fn get_asset(key: u128) -> Asset {
    let asset: Asset = retrieve_asset(key).expect("Couldn't retrieve the asset");

    asset
}

pub fn get_assets_count() -> u128 {
    let count: u128 = retrieve_assets_count().expect(
        "Couldn't retrieve assets count"
    );
    
    count
}

// Normalize all string fields in AssetUserInput
pub fn normalize_asset_input(input: &mut AssetUserInput) -> String {
    input.details.name = normalize_str(&input.details.name);
    input.details.description = normalize_str(&input.details.description);
    input.details.extra_metadata = normalize_opt_str(input.details.extra_metadata.as_ref());
    input.details.jurisdiction = normalize_opt_str(input.details.jurisdiction.as_ref());
    input.details.serial_or_id = normalize_opt_str(input.details.serial_or_id.as_ref());

    input.ownership_proof.document_url = normalize_opt_str(input.ownership_proof.document_url.as_ref());
    input.ownership_proof.witness = normalize_opt_str(input.ownership_proof.witness.as_ref());
    // acquisition_date stays unchanged

    let combined_str = concatenate_user_input(input);

    combined_str
}

fn concatenate_user_input(input: &mut AssetUserInput) -> String {
    let combined = format!(
        "{}|{}|{}|{}|{}|{}|{}",
        input.details.name,
        input.details.description,
        input.details.extra_metadata.as_ref().unwrap(),
        input.details.jurisdiction.as_ref().unwrap(),
        input.details.serial_or_id.as_ref().unwrap(),
        input.ownership_proof.document_url.as_ref().unwrap(),
        input.ownership_proof.witness.as_ref().unwrap(),
    );

    combined
}
