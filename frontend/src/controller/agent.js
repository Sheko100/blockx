//import { idlFactory } from '../../../backend/api/declarations/blockx_rust.js';
import { createActor } from '../../backend_api/blockx_rust.js';


// controller api wrapping the auto-generated api by @icp-sdk/bindgen
export function createNewActor(canisterId, agentOptions) {
  let actor = null;

  try {
    actor = createActor(canisterId, agentOptions);
  } catch (error) {
    console.error("Couldn't create a new agent:", error);
  } finally {
    return actor;
  }

}

let currentActor = null;
let currentCanisterId = null;
let currentIdentity = null;

// gets or creates a new actor
export function getActor(canisterId, agentOptions, identity) {
  const normalizedIdentity = identity ? identity : null;

  if (
    currentActor &&
    currentCanisterId === canisterId &&
    currentIdentity === normalizedIdentity
  ) {
    return currentActor;
  }

  const actor = createNewActor(canisterId, {
    agentOptions: {
      ...agentOptions,
      ...(normalizedIdentity ? { identity: normalizedIdentity } : {}),
    },
  });

  currentActor = actor;
  currentCanisterId = canisterId;
  currentIdentity = normalizedIdentity;

  return actor;
}
