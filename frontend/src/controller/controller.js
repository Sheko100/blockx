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
    return hash;
  } else if (result.Err) {
    throw result.Err;
  }
}

export async function getAsset(id) {
  if (!backend) throw 'Agent is not available';

  const result = await backend.get_asset(id);

  //console.log('getting asset:', result);

  //console.log('owner principal', result.owner.toText())
}

export async function getUserAssets() {
  if (!backend) throw 'Agent is not available';

  console.log("backend", backend);

  const userAssets = await backend.get_user_assets();

  const assetsView = [];

  for (const asset of userAssets) {
    const viewObj = assetDataView(asset);
    assetsView.push(viewObj);
  }

  return assetsView;
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

  console.log('preparedData', preparedData);

  return preparedData;
}

function assetDataView(data) {
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

  // add to array if not in array in the details object
  for (const option of detailsOptions) {
    // extract the value from the array
    detailsObj[option] = detailsObj[option].length > 0 ? detailsObj[option][0] : '';
  }

  return preparedData;
}