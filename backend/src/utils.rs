use std::time::{SystemTime, UNIX_EPOCH};
use ic_cdk::api::time;
use candid::Principal;
use ic_cdk::api::msg_caller;

#[ic_cdk_macros::query]
// gets the timestamp out of the canister
pub fn get_system_timestamp() -> u128 {
    let start = SystemTime::now();
    let since_the_epoch = start
        .duration_since(UNIX_EPOCH)
        .expect("Failed to get time since UNIX_EPOCH");
    let milliseconds = since_the_epoch.as_millis();
    milliseconds
}

#[ic_cdk_macros::query]
// gets the timestamp after deploying the canister
pub fn get_ic_timestamp() -> u128 {
    time().into()
}

// one interface for easily changing
pub fn get_timestamp() -> u128 {
    get_ic_timestamp()
}

pub fn is_authenticated() -> bool {
    msg_caller() == Principal::anonymous()
}
