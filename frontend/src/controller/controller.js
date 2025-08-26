import { createActor, canisterId } from '../../../declarations/blockx_backend';
import { AuthClient } from '@dfinity/auth-client';
import { arrayIt, objectIt, hashFiles } from '../utils';

const backend = canisterId ? createActor(canisterId) : null;

// useless - should be deleted
export async function hashText(text) {
  if (!backend) throw 'Agent is not available';
  if (text === '') throw 'Passed text is empty';

  const hash = await backend.hash_text(text);

  return hash;
}

export async function registerAsset(assetData) {
  if (!backend) throw 'Agent is not available';

  const backendData = await assetDataBackend(assetData);
  console.log('backend data', backendData);
  const result = await backend.register_asset(backendData);

  if (result.Ok) {
    const hash = result.Ok;
    return `0x${hash}`;
  } else if (result.Err) {
    throw result.Err;
  }
}

// useless - should be deleted
export async function getAsset(id) {
  if (!backend) throw 'Agent is not available';

  const result = await backend.get_asset(id);

  //console.log('getting asset:', result);

  //console.log('owner principal', result.owner.toText())
}

export async function getUserAssets() {
  if (!backend) throw 'Agent is not available';

  console.log("backend", backend);

  const mockAssets = [
    {
      asset_type: {Physical: null},
      category: {RealEstate: null},
      details: {
        // images only allowed for physical assets, and all files allowed for digital assets
        files: ['as65d465sad4a65s', 'as6d4a54d6sd'],
        name: ['My land'],
        description: ['ma land is my fav land'],
        // for real estate
        address: ['never never land'],
        // for vehicles like car, motorcycle, etc...
        type: [],
        // for equipmenets
        manufacturer: [],
      },
      ownership_proof: {
        // for real estate
        deed_document: [],
        deed_reference_number: [],
        // for vehicles and intellectual properties
        registration_number: [],
        // for vehicles
        license_plate: [],
        // for physical products
        serial_number: [],
        // for digital assets
        publication_links: [],
      },
    },
  ]

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


  const isVerified = await backend.verify_asset(rawHash, categoryObj);

  console.log('isVerified', isVerified);

  //const isVerified = false;

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
      deed_document: [...data.ownerships_proof.deed_document],
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
    detailsObj[option] = arrayIt(detailsObj[option])
  }

  // hash deed_document if required
  proofObj.deed_document = proofObj.deed_document.length > 0
    ? await hashFiles(proofObj.deed_document)
    : [];

  // add array if not array in the ownership_proof object
  for (const key of Object.keys(proofObj)) {
    if (key === 'deed_document') continue;
 
    // specific for digital asset
    if (assetCategory === "DigitalAsset" && key === 'publication_links') {
      const links = proofObj[key].replace(/\s/g, '').split(',');
      proofObj[key] = links;
      continue;
    }
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
  const assetCategory = preparedData.category;
  const assetTypeMap = {
    Physical: 'Physical',
    NonPhysical: 'Non-Physical,'
  };
  const assetCategoryMap = {
    RealEstate: 'Real Estate',
    Vehicle: 'Vehicle',
    ValuableItem: 'Valuable Item',
    Equipment: 'Equipment',
    DigitalAsset: 'Digital Asset',
    IntellectualProperty: 'Intellectual Property',
  };
  const detailsOptions = ['address', 'type', 'manufacturer'];

  // delete the ownership proof as it is not used in the view
  if (preparedData.ownership_proof) delete preparedData.ownership_proof;

  // modify the variants to be in an object with null as a value
  preparedData.asset_type = assetTypeMap[Object.keys(preparedData.asset_type)[0]];
  preparedData.category = assetCategoryMap[Object.keys(preparedData.category)[0]];

  console.log('asset category', preparedData.category);
  if (preparedData.category=== 'Intellectual Property') delete detailsObj.description;

  // add to array if not in array in the details object
  for (const option of detailsOptions) {
    // extract the value from the array
    detailsObj[option] = detailsObj[option].length > 0 ? detailsObj[option][0] : '';
  }

  return preparedData;
}