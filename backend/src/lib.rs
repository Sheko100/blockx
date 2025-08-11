mod hash;
mod store;
mod user;
mod asset;
mod utils;
use crate::user::{User, add_user, get_user, get_users_count};
use crate::hash::hash_text;
use crate::asset::{
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
        let new_details = AssetDetails {
            name: String::from("My Car"),
            description: String::from("Toyota red car"),
            serial_or_id: Some(String::from("45645688")),
            jurisdiction: Some(String::from("Egypt")),
            extra_metadata: Some(String::from("extra metadata")),
        };
        let new_proof = Proof {
            document_url: Some(String::from("https://redcar.com")),
            witness: Some(String::from("John Doe")),
            acquisition_date: Some(7645886),
        };
        let user_asset_data = AssetUserInput {
            asset_type: AssetType::Physical,
            category: AssetCategory::Vehicle,
            details: new_details,
            ownership_proof: new_proof,

        };
        let curr_count = get_assets_count();
    
        let hash = register_asset(user_asset_data);

        let new_count = get_assets_count();

        assert_eq!(new_count, curr_count + 1);
    }
}

// Enable Candid export
ic_cdk::export_candid!();
