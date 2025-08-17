import { createActor, canisterId } from '../../../declarations/blockx_backend';
import { AuthClient } from '@dfinity/auth-client';

const backend = canisterId ? createActor(canisterId) : null;
const network = process.env.DFX_NETWORK;
const identityProvider =
  network === 'ic'
    ? 'https://identity.ic0.app' // Mainnet
    : 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943';

export async function hashText(text) {
  if (!backend) throw 'Agent is not available';
  if (text === '') throw 'Passed text is empty';

  const hash = await backend.hash_text(text);

  return hash;
}

export async function hashFile(bytesArray) {
  if (!backend) throw 'Agent is not available';
  if (bytesArray.length === 0) throw 'Passed array is empty';

  const hash = await backend.hash_file(bytesArray);

  return hash;
}

export async function registerAsset(assetData) {
  if (!backend) throw 'Agent is not available';

  const hash = await backend.register_asset(assetData);

  console.log('hash:', hash);
}

export async function normalSignUp(email, password) {
  console.log('sign up with email and password implementaion');
}

export async function login() {
  console.log('login with email and password implementaion');
}

export async function authInternetIdentity(successHandler) {
  if (!backend) throw 'Agent is not available';

  const authState = {authClient: null, identityProvider};
  authState.authClient = await AuthClient.create();

  console.log('identity before loging in', authState.authClient.getIdentity().getPrincipal());

  await authState.authClient.login({
    identityProvider,
    onSuccess: successHandler,
  });

  return authState;
}
