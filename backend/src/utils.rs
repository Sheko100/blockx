use std::time::{SystemTime, UNIX_EPOCH};
use candid::Principal;
use ic_cdk::api::msg_caller;

// gets the timestamp
pub fn get_timestamp() -> u128 {
    #[cfg(target_arch = "wasm32")]
    {
        ic_cdk::api::time().into()
    }

    #[cfg(not(target_arch = "wasm32"))]
    {
        let start = SystemTime::now();
        let since_the_epoch = start
            .duration_since(UNIX_EPOCH)
            .expect("Failed to get time since UNIX_EPOCH");
        let milliseconds = since_the_epoch.as_millis();
        milliseconds
    }
}

pub fn is_authenticated() -> bool {
    who_am_i() != Principal::anonymous()
}


pub fn who_am_i() -> Principal {
    #[cfg(target_arch = "wasm32")]
    {
        msg_caller()
    }

    #[cfg(not(target_arch = "wasm32"))]
    {
        Principal::anonymous()
    }
}