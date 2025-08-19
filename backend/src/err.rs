use candid::CandidType;
use serde::{Deserialize, Serialize};

#[derive(CandidType, Deserialize, Serialize, Debug, Clone)]
pub enum ServiceError {
    AssetAlreadyExists(String),
    InvalidCategory(String),
    MissingProof(String),
    Unauthorized(String),
    NotFound(String),
    InternalError(String),
}

pub type ServiceResult<T> = Result<T, ServiceError>;