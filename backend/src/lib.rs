mod hash;
mod store;
mod asset;
mod utils;
mod err;
use crate::err::{ServiceError, ServiceResult};
use crate::hash::{hash_text, hash_bytes};
use crate::asset::{
    Asset,
    AssetType,
    AssetCategory,
    AssetDetails,
    Proof,
    AssetUserInput,
    register_asset,
    get_asset,
    get_assets_count,
    verify_asset,
};

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_hash_text_consistency() {
        let text = String::from("blockx");
        let hash1 = hash::hash_text(&text);
        let hash2 = hash::hash_text(&text);

        assert_eq!(hash1, hash2);
    }

    #[test]
    fn test_add_user() {
        let email = String::from("test@test.com");
        let username = String::from("testUserName");
        let password = String::from("testpassword");
        let password_hash = hash_text("testpassword");
        let curr_count = get_users_count();

        let users_count: u128 = add_user(email, username, password);

        let user: User = get_user(curr_count);

        assert_eq!(users_count, curr_count + 1);
        assert_eq!(user.email, String::from("test@test.com"));
        assert_eq!(user.username, String::from("testUserName"));
        assert_eq!(user.password, password_hash);
    }

    #[test]
    fn test_register_asset() {
        let vehicle_details = AssetDetails {
            files: vec![String::from("asdhakjd65456"), String::from("asdhaksd6a465456"), String::from("a6456asd46a")],
            name: String::from("My Car"),
            description: String::from("Toyota red car"),
            r#type: Some(String::from("car")),
            address: None,
            manufacturer: None,
        };
        let vehicle_proof = Proof {
            deed_document: Vec::new(),
            deed_reference_number: None,
            registration_number: Some(String::from("4894564564")),
            license_plate: Some(String::from("123/abc")),
            serial_number: None,
            publication_links: Vec::new(),
        };
        let user_input_data = AssetUserInput {
            asset_type: AssetType::Physical,
            category: AssetCategory::Vehicle,
            details: vehicle_details,
            ownership_proof: vehicle_proof,

        };
        let curr_count = get_assets_count(None);
        let curr_category_count = get_assets_count(Some(AssetCategory::Vehicle));
        let result = register_asset(user_input_data);

        let new_category_count = get_assets_count(Some(AssetCategory::Vehicle));
        let new_count = get_assets_count(None);

        let asset = get_asset(0);

        assert_eq!(new_count, curr_count + 1);
        assert_eq!(new_category_count, curr_category_count + 1);
        assert_eq!(asset.hash, result.unwrap());
    }

    #[test]
    fn test_register_same_asset() {
        let vehicle_details = AssetDetails {
            files: vec![String::from("asdhakjd65456"), String::from("asdhaksd6a465456"), String::from("a6456asd46a")],
            name: String::from("My Car"),
            description: String::from("Toyota red car"),
            r#type: Some(String::from("car")),
            address: None,
            manufacturer: None,
        };
        let vehicle_proof = Proof {
            deed_document: Vec::new(),
            deed_reference_number: None,
            registration_number: Some(String::from("4894564564")),
            license_plate: Some(String::from("123/abc")),
            serial_number: None,
            publication_links: Vec::new(),
        };
        let vehicle_input_data = AssetUserInput {
            asset_type: AssetType::Physical,
            category: AssetCategory::Vehicle,
            details: vehicle_details.clone(),
            ownership_proof: vehicle_proof.clone(),

        };

        let vehicle2_input_data = AssetUserInput {
            asset_type: AssetType::Physical,
            category: AssetCategory::Vehicle,
            details: vehicle_details,
            ownership_proof: vehicle_proof,
        };



        let first_result = register_asset(vehicle_input_data);

        let curr_count = get_assets_count(None);
        let curr_category_count = get_assets_count(Some(AssetCategory::Vehicle));

        let second_result = register_asset(vehicle2_input_data);

        let new_category_count = get_assets_count(Some(AssetCategory::Vehicle));
        let new_count = get_assets_count(None);

        assert_eq!(new_count, curr_count);
        assert_eq!(new_category_count, curr_category_count);
    }

    #[test]
    fn test_register_same_intellectual_property() {
        let intellectual_details = AssetDetails {
            files: vec![],
            name: String::from("My idea"),
            description: String::from("The newest idea ever"),
            r#type: None,
            address: None,
            manufacturer: None,
        };
        let intellectual2_details = AssetDetails {
            files: vec![],
            name: String::from("My idea"),
            description: String::from("The NEWeSt       idEA ever   "),
            r#type: None,
            address: None,
            manufacturer: None,
        };
        let intellectual_proof = Proof {
            deed_document: Vec::new(),
            deed_reference_number: None,
            registration_number: None,
            license_plate: None,
            serial_number: None,
            publication_links: Vec::new(),
        };
        let intellectual_input_data = AssetUserInput {
            asset_type: AssetType::NonPhysical,
            category: AssetCategory::IntellectualProperty,
            details: intellectual_details.clone(),
            ownership_proof: intellectual_proof.clone(),

        };

        let intellectual2_input_data = AssetUserInput {
            asset_type: AssetType::NonPhysical,
            category: AssetCategory::IntellectualProperty,
            details: intellectual2_details,
            ownership_proof: intellectual_proof,
        };

        let first_result = register_asset(intellectual_input_data);

        // count after first successful register
        let curr_count = get_assets_count(None);
        let curr_category_count = get_assets_count(Some(AssetCategory::IntellectualProperty));

        let second_result = register_asset(intellectual2_input_data);

        // count after second register which should be failed
        let new_count = get_assets_count(None);
        let new_category_count = get_assets_count(Some(AssetCategory::IntellectualProperty));

        // count should not be increased as second register has failed like expected
        assert_eq!(new_count, curr_count);
        assert_eq!(new_category_count, curr_category_count);
    }

    #[test]
    fn test_verify_asset() {
        let intellectual_details = AssetDetails {
            files: vec![],
            name: String::from("My idea"),
            description: String::from("The newest idea ever"),
            r#type: None,
            address: None,
            manufacturer: None,
        };
        let intellectual_proof = Proof {
            deed_document: Vec::new(),
            deed_reference_number: None,
            registration_number: None,
            license_plate: None,
            serial_number: None,
            publication_links: Vec::new(),
        };
        let intellectual_input_data = AssetUserInput {
            asset_type: AssetType::NonPhysical,
            category: AssetCategory::IntellectualProperty,
            details: intellectual_details.clone(),
            ownership_proof: intellectual_proof.clone(),

        };

        let asset_hash = register_asset(intellectual_input_data).unwrap();

        let is_verified = verify_asset(asset_hash, AssetCategory::IntellectualProperty);

        let not_verified = verify_asset(String::from("asdasdasa6d46a5s"), AssetCategory::IntellectualProperty);

        assert_eq!(is_verified, true);
        assert_eq!(not_verified, false);
    }

}

ic_cdk::export_candid!();
