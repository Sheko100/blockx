import { getActor } from './agent.js';
import { arrayIt, objectIt, hashFiles } from '../utils';
import { getCanisterEnv } from "@icp-sdk/core/agent/canister-env";


const canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID;

const canisterEnv = getCanisterEnv();

const rootKey = canisterEnv['IC_ROOT_KEY'];

// console.log('canisterId:', canisterId); // Enable when debugging canister configuration.

const agentOptions = {
  rootKey: rootKey,
  shouldFetchRootKey: false,
};

function getBackendActor(identity) {
  if (!canisterId) throw new Error('Backend canister is not configured');

  return getActor(canisterId, agentOptions, identity);
}

export async function registerAsset(assetData, identity) {
  if (!identity) throw new Error('Sign in before registering an asset');
  const backend = getBackendActor(identity);

  let backendData = await assetDataBackend(assetData);
  
  let result = null;
  
  try {
    result = await backend.register_asset(backendData);
  } catch(error) {
    throw error;
  }

  if (result.Ok) {
    const hash = result.Ok;
    return `0x${hash}`;
  } else if (result.Err) {
    throw result.Err;
  }
}

export async function getUserAssets(identity) {
  if (!identity) throw new Error('Sign in before loading user assets');
  const backend = getBackendActor(identity);

  const userAssets = await backend.get_user_assets();

  const assetsView = [];

  for (const asset of userAssets) {
    const viewObj = assetDataView(asset);
    assetsView.push(viewObj);
  }

  return assetsView;
}

export async function verifyAsset(hash, category) {
  const rawHash = hash.toLowerCase().startsWith('0x') ? hash.substring(2) : hash;
  const categoryObj = objectIt(category);


  const isVerified = await getBackendActor().verify_asset(rawHash, categoryObj);

  return isVerified;
}

// Modifies the data to be compitable with rust and the agent
async function assetDataBackend(data) {
  const preparedData = {
    ...data,
    details: {
      files: [...data.details.files],
      ...data.details,
    },
    ownership_proof: {
      deed_document: [...data.ownership_proof.deed_document],
      ...data.ownership_proof,
    },
  };

  const detailsOptions = ['address', 'type', 'manufacturer'];
  const detailsObj = preparedData['details'];
  const proofObj = preparedData['ownership_proof'];
  const assetCategory = preparedData.category;

  // modify the variants to be in an object with null as a value
  preparedData.asset_type = objectIt(preparedData.asset_type);
  preparedData.category = objectIt(preparedData.category);

  // hash details files
  detailsObj.files = await hashFiles(detailsObj.files);

  // add to array if not in array in the details object
  for (const option of detailsOptions) {
  
    // insert all to an array except strings
    if (typeof detailsObj[option] === "string") continue;

    detailsObj[option] = arrayIt(detailsObj[option])
  }

  // hash deed_document if required
  proofObj.deed_document = proofObj.deed_document.length > 0
    ? await hashFiles(proofObj.deed_document)
    : [];

  // split public links into array of strings
  const publication_links = proofObj.publication_links.replace(/\s/g, '');
  proofObj.publication_links = publication_links ? publication_links.split(',') : [];

  // add array if not array in the ownership_proof object
  for (const key of Object.keys(proofObj)) {

    if (key === 'deed_document' || typeof proofObj[key] === "string") continue; // don't array 

    // array all the rest of the keys excpet if the value is array
    proofObj[key] = arrayIt(proofObj[key]);
  }
  
  return preparedData;
}

function assetDataView(data) {
  const preparedData = {
    ...data,
    details: {
      files: [...data.details.files],
      ...data.details,
    },
  };
  const detailsObj = preparedData['details'];
  const assetTypeMap = {
    Physical: 'Physical',
    NonPhysical: 'Non-Physical',
  };
  const detailsOptions = ['address', 'type', 'manufacturer'];

  // delete the ownership proof as it is not used in the view
  if (preparedData.ownership_proof) delete preparedData.ownership_proof;

  // Decode Candid variants while keeping the category's enum value for consumers
  // such as the certificate's category-specific field selection.
  const assetType = typeof preparedData.asset_type === 'string'
    ? preparedData.asset_type
    : Object.keys(preparedData.asset_type == null ? {} : preparedData.asset_type)[0];
  const category = typeof preparedData.category === 'string'
    ? preparedData.category
    : Object.keys(preparedData.category == null ? {} : preparedData.category)[0];
  preparedData.asset_type = assetTypeMap[assetType] !== undefined
    ? assetTypeMap[assetType]
    : assetType;
  preparedData.category = category !== undefined ? category : preparedData.category;

  // Candid options are represented as [] or [value]. Also tolerate null,
  // undefined, and already-unwrapped values so callers can use this safely.
  for (const option of detailsOptions) {
    const value = detailsObj[option];
    detailsObj[option] = Array.isArray(value)
      ? (value[0] == null ? '' : value[0])
      : (value == null ? '' : value);
  }

  return preparedData;
}
