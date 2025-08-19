import { createActor, canisterId } from '../../../declarations/blockx_backend';
import { AuthClient } from '@dfinity/auth-client';
import { arrayIt, objectIt } from '../utils';

const backend = canisterId ? createActor(canisterId) : null;
const network = process.env.DFX_NETWORK;
const identityProvider =
  network === 'ic'
    ? 'https://identity.ic0.app' // Mainnet
    : 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943';

console.log('identityProvider', identityProvider);

// useless - should be deleted
export async function hashText(text) {
  if (!backend) throw 'Agent is not available';
  if (text === '') throw 'Passed text is empty';

  const hash = await backend.hash_text(text);

  return hash;
}

// useless - should be deleted
export async function hashFile(bytesArray) {
  if (!backend) throw 'Agent is not available';
  if (bytesArray.length === 0) throw 'Passed array is empty';

  const hash = await backend.hash_file(bytesArray);

  return hash;
}

export async function registerAsset(assetData) {
  if (!backend) throw 'Agent is not available';

  const backendData = prepareAssetData(assetData);

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

// Modifies the data to be compitable with rust and the agent
function prepareAssetData(data) {
  const preparedData = {...data};
  const detailsOptions = ['address', 'type', 'manufacturer'];
  const detailsObj = preparedData['details'];
  const proofObj = preparedData['ownership_proof'];

  // modify the variants to be in an object with null as a value
  preparedData.asset_type = objectIt(preparedData.asset_type);
  preparedData.category = objectIt(preparedData.category);

  // add to array if not in array in the details object
  for (const option of detailsOptions) {
    detailsObj[option] = arrayIt(detailsObj[option])
  }

  // add array if not array in the ownership_proof object
  for (const key of Object.keys(proofObj)) {
    proofObj[key] = arrayIt(proofObj[key]);
  }

  return preparedData;
}

/*export async function normalSignUp(email, password) {
  console.log('sign up with email and password implementaion');
}

export async function login() {
  console.log('login with email and password implementaion');
}*/

export async function authInternetIdentity(successHandler) {
  if (!backend) throw 'Agent is not available';

  const authState = {authClient: null, identityProvider};
  try {
    authState.authClient = await AuthClient.create();
  } catch (error) {
    console.log('error while using II', error);
  }

  console.log('identity before logging in', authState.authClient.getIdentity().getPrincipal());

  await authState.authClient.login({
    identityProvider,
    onSuccess: successHandler,
  });

  return authState;
}
