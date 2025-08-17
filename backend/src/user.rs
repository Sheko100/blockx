use std::borrow::Cow;
use ic_stable_structures::{Storable, storable::Bound};
use candid::{CandidType, Deserialize, Encode, Decode};
use crate::store::{store_user, retrieve_user, retrieve_users_count};
use crate::hash::hash_text;

#[derive(CandidType, Deserialize, Clone, Debug)]
pub struct User {
    pub username: String,
    pub email: String,
    pub password: String,
}

impl Storable for User {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    /*fn into_bytes(self) -> Vec<u8> {
        Encode!(&self).unwrap()
    }*/

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
    const BOUND: Bound = Bound::Unbounded;
}

/*
 * TODO:
 * add guards for empty strings
 */
#[ic_cdk_macros::update]
pub fn add_user(email: String, username: String, password: String) -> u128 {
    let password_hash = hash_text(&password);

    let user = User { username, email, password: password_hash };


    let key: u128 = store_user(user).expect("Couldn't add new user");

    key
}

/*
 * TODO:
 * add guards for key beyond the stored users count
 */
#[ic_cdk_macros::query]
pub fn get_user(key: u128) -> User {
    let user: User = retrieve_user(key).expect("Couldn't retrieve the user");

    user
}

pub fn get_users_count() -> u128 {
    let value: u128 = retrieve_users_count().expect(
        "Couldn't retrieve users count"
    );
    
    value
}
