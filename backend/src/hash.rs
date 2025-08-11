use sha2::{Sha256, Digest};

pub fn hash_file(data: &[u8]) -> String {
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
