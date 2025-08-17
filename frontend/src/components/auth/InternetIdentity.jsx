import { useState, useEffect} from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { createActor, canisterId } from '../../../../declarations/blockx_backend';

const network = process.env.DFX_NETWORK;
const identityProvider =
  network === 'ic'
    ? 'https://identity.ic0.app' // Mainnet
    : 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943';

console.log('network', network);

export const InternetIdentityAuth = ({ toAuth }) => {
  const [state, setState] = useState({
    actor: undefined,
    authClient: undefined,
    isAuthenticated: false,
    principal: 'Click "Whoami" to see your principal ID'
  });
  //const [toLogin, setToLogin] = useState(toAuth);

  // Initialize auth client
  useEffect(async () => {
    if (state.isAuthenticated) {
	    window.href = "/";
    }
    if (toAuth) {
      login();
    } else {
      updateActor();
    }
  }, [toAuth, state]);

  const updateActor = async () => {
    console.log('updating actor');
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    const actor = createActor(canisterId, {
      agentOptions: {
        identity
      }
    });
    const isAuthenticated = await authClient.isAuthenticated();

    setState((prev) => ({
      ...prev,
      actor,
      authClient,
      isAuthenticated
    }));
  };

  const login = async () => {
    await state.authClient.login({
      identityProvider,
      onSuccess: updateActor
    });
    console.log("logging in");
  };

  const logout = async () => {
    await state.authClient.logout();
    updateActor();
  };

  const whoami = async () => {
    setState((prev) => ({
      ...prev,
      principal: 'Loading...'
    }));

    const result = await state.actor.whoami();
    const principal = result.toString();
    setState((prev) => ({
      ...prev,
      principal
    }));
  };
}
