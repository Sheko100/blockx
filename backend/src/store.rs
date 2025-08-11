use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap, StableCell};
use std::cell::RefCell;
use crate::user::User;
use crate::asset::Asset;

type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {

    // The memory manager is used for simulating multiple memories. Given a `MemoryId` it can
    // return a memory that can be used by stable structures.

    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    // Initialize a `StableBTreeMap` with `MemoryId(0)`.
    static USERS: RefCell<StableBTreeMap<u128, User, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))),
        )
    );

    static USERS_COUNT: RefCell<StableCell<u128, Memory>> = RefCell::new(
        StableCell::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1))),
            0,
        ).expect("Failed to initialize USERS_COUNT")
    );

    static ASSETS: RefCell<StableBTreeMap<u128, Asset, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(2))),
        )
    );

    static ASSETS_COUNT: RefCell<StableCell<u128, Memory>> = RefCell::new(
        StableCell::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(3))),
            0,
        ).expect("Failed to initialize ASSETS_COUNT")
    );
}

// Stores a new asset structure in the stable memmory
pub fn store_asset(value: Asset) -> Option<u128> {
    let mut assets_count = 0;

    ASSETS.with(|assets| {
        ASSETS_COUNT.with(|cell| {
            let mut count_cell = cell.borrow_mut();
            let curr_count = *count_cell.get();
            let new_count = curr_count + 1;
            count_cell.set(new_count).expect("failed to update assets count");
            assets.borrow_mut().insert(curr_count, value);
            assets_count = new_count;
        });
    });

    Some(assets_count)
}

pub fn retrieve_asset(key: u128) -> Option<Asset> {
    let asset = ASSETS.with(|assets| assets.borrow().get(&key));

    asset
}

// retrieves the users count
pub fn retrieve_assets_count() -> Option<u128> {
    let count: u128 = ASSETS_COUNT.with(|p| *p.borrow().get());

    Some(count)
}


// Retrieves the value associated with the given key if it exists.
pub fn retrieve_user(key: u128) -> Option<User> {
    let user = USERS.with(|users| users.borrow().get(&key));

    user
}

// Stores a new User structure - returns the new count of users
pub fn store_user(value: User) -> Option<u128> {
    let mut users_count = 0;

    USERS.with(|users| {
        USERS_COUNT.with(|cell| {
            let mut count_cell = cell.borrow_mut();
            let curr_count = *count_cell.get();
            let new_count = curr_count + 1;
            count_cell.set(new_count).expect("failed to update users count");
            users.borrow_mut().insert(curr_count, value);
            users_count = new_count;
        });
    });

    Some(users_count)
}

// retrieves the users count
pub fn retrieve_users_count() -> Option<u128> {
    let count: u128 = USERS_COUNT.with(|p| *p.borrow().get());

    Some(count)
}
