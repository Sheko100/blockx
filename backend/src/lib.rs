mod hash;
mod store;
mod user;
mod asset;
mod utils;
mod err;
use crate::err::{ServiceError, ServiceResult};
use crate::user::{User, add_user, get_user, get_users_count};
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

        ///let asset = get_asset(0);

        assert_eq!(new_count, curr_count);
        assert_eq!(new_category_count, curr_category_count);
        //assert!(match!(second,result, Err(ServiceError::AssetAlreadyExists)));
    }

    /*#[test]
    fn test_hashing_files() {
        let realEstate_details = AssetDetails {
            files: vec![[1, 100, 160].to_vec(), [2, 240, 233].to_vec(), [5, 4].to_vec()],
            name: String::from("My House"),
            description: String::from("Medium house"),
            r#type: None,
            address: Some(String::from("baker street")),
            manufacturer: None,
        };
        let realEstate_proof = Proof {
            deed_document: vec![[1, 100, 200].to_vec()],
            deed_reference_number: Some(String::from("ABC-54556-AD465")),
            registration_number: None,
            license_plate: None,
            serial_number: None,
            publication_links: Vec::new(),
        };
        let user_input_data = AssetUserInput {
            asset_type: AssetType::Physical,
            category: AssetCategory::RealEstate,
            details: realEstate_details,
            ownership_proof: realEstate_proof,
        };

        let new_asset = register_asset(user_input_data);

        let asset = get_asset(0);

        let files = vec![[1, 100, 160].to_vec(), [2, 240, 233].to_vec(), [5, 4].to_vec()];
        let file1 = hash_bytes(files[0].clone());
        let file2 = hash_bytes(files[1].clone());
        let file3 = hash_bytes(files[2].clone());

        let deed_doc = vec![[1, 100, 200].to_vec()];
        let hashed_doc = hash_bytes(deed_doc[0].clone());

        assert_eq!(asset.details.files[0], file1);
        assert_eq!(asset.details.files[1], file2);
        assert_eq!(asset.details.files[2], file3);
        assert_eq!(asset.ownership_proof.deed_document[0], hashed_doc);
    }*/


}

// Enable Candid export
ic_cdk::export_candid!();
