use std::time::{SystemTime, UNIX_EPOCH};

pub fn get_timestamp() -> u128 {
    let start = SystemTime::now();
    let since_the_epoch = start
        .duration_since(UNIX_EPOCH)
        .expect("Failed to get time since UNIX_EPOCH");

    let milliseconds = since_the_epoch.as_millis();

    milliseconds
}
