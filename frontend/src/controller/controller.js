import { createActor, canisterId } from '../../../declarations/blockx_backend';

const backend = canisterId ? createActor(canisterId) : null;

export async function hashText(text) {
    if (!backend) throw 'Agent is not available';
    if (text === '') throw 'Passed text is empty';

    const hash = await backend.hash_text(text);

    return hash;
}

export async function registerAsset(assetData) {
    if (!backend) throw 'Agent is not available';

    const hash = await backend.register_asset(assetData);

    console.log('hash:', hash);
}

export async function hashFile() {
    console.log('file hashing implementaion');
}

export async function normalSignUp(email, password) {
    console.log('sign up with email and password implementaion');
}

export async function login() {
    console.log('login with email and password implementaion');
}
