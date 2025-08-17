use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap, StableCell};
use std::cell::RefCell;
use crate::user::User;
use crate::asset::{Asset, AssetCategory, AssetIds};

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

    static CATEGORY_COUNTS: RefCell<StableBTreeMap<AssetCategory, u128, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(4)))
        )
    );

    pub static CATEGORY_TO_IDS: RefCell<StableBTreeMap<AssetCategory, AssetIds, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(5)))
        )
    );
}

// Stores a new asset structure in the stable memmory
pub fn store_asset(value: Asset) -> Option<u128> {
    let mut assets_count = 0;

    ASSETS.with(|assets| {
        ASSETS_COUNT.with(|cell| {
            CATEGORY_COUNTS.with(|categ_counts| {
                CATEGORY_TO_IDS.with(|cat_to_ids| {
                    // get the current count
                    let mut count_cell = cell.borrow_mut();
                    let curr_count = *count_cell.get();
                    let new_count = curr_count + 1;

                    // update all assets count
                    count_cell.set(new_count).expect("failed to update assets count");

                    // update categories counts
                    let mut categ_map = categ_counts.borrow_mut();
                    let cat_count = categ_map.get(&value.category).unwrap_or(0);
                    categ_map.insert(value.category.clone(), cat_count + 1);

                    // update CATEGORY_TO_IDS
                    let mut cat_map = cat_to_ids.borrow_mut();
                    let mut ids = cat_map.get(&value.category).unwrap_or_else(|| AssetIds(Vec::new()));
                    ids.0.push(curr_count);
                    cat_map.insert(value.category.clone(), ids);

                    // add the new asset
                    assets.borrow_mut().insert(curr_count, value);
                    assets_count = new_count;
                });
            });
        });
    });

    Some(assets_count)
}

pub fn retrieve_asset(key: u128) -> Option<Asset> {
    let asset = ASSETS.with(|assets| assets.borrow().get(&key));

    asset
}

pub fn asset_ids_by_category(category: &AssetCategory) -> Vec<u128> {
    CATEGORY_TO_IDS.with(|map| {
        map.borrow()
            .get(category)
            .map(|ids| ids.0) // unwrap IdList into Vec<u128>
            .unwrap_or_else(|| Vec::new())
    })
}




// retrieves the users count
pub fn retrieve_assets_count(category: Option<AssetCategory>) -> Option<u128> {
    let count = match category {

        Some(cat) => CATEGORY_COUNTS.with(|cat_counts| {
            cat_counts.borrow().get(&cat).unwrap_or(0)
        }),
        None => ASSETS_COUNT.with(|p| *p.borrow().get()),

        /*Some(cat) => {
            // Count only assets matching the category
            ASSETS.with(|assets| {
                let assets = assets.borrow();
                assets.iter().filter(|(_, asset)| asset.category == cat).count() as u128
            })
        }
        None => {
            // Return total count from ASSETS_COUNT (faster than iterating all assets)
            ASSETS_COUNT.with(|p| *p.borrow().get())
        }*/
    };

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
