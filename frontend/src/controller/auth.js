import { AuthClient } from "@icp-sdk/auth/client";

// would be the same while developing locally
// it should be changed to https://id.ai/authorize when deployed tothe interent computer
export const identityProvider = 'http://id.ai.localhost:8000/authorize';

export let client = new AuthClient({
                     // identity: "", get the current identity
                     identityProvider: identityProvider,
                     //   resumable: false,
                     // transport: 'redirect',
                     //prompt: 'none',
                     derivationOrigin: window.location.origin,
                     //idleOptions: {disableIdle: true, disableDefaultIdleCallback: true},
                    });
                    
export const firstAuthState = client.isAuthenticated();

export function getAuthCilent() {
  if (!client) {
    client = new AuthClient({
                 // identity: "", get the current identity
                 identityProvider: identityProvider,
                //   resumable: false,
                // transport: 'redirect',
                 //prompt: 'none',
                 derivationOrigin: window.location.origin,
                 //idleOptions: {disableIdle: true, disableDefaultIdleCallback: true},
             });
  }

  return client;
}

export async function doSignIn() {
  const client = getAuthCilent();

  try {
    const identity = await client.signIn({
      maxTimeToLive: BigInt(8) * BigInt(3_600_000_000_000),  // 8 hours
    });
    
    return identity;
  } catch (error) {
    throw error;
  }

}
