import { createContext, useState, useContext, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';

const InternetIdentityContext = createContext();

export const InternetIdentityProvider = ({ children }) => {
  const [authClient, setAuthClient] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [identityProvider, setIdentityProvider] = useState(process.env.DFX_NETWORK === "ic"
    ? 'https://identity.ic0.app'
    : 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943'
  )

  useEffect(() => {
    const initAuth = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);

      if (await client.isAuthenticated()) {
        const id = client.getIdentity();
        setIdentity(id);
        setPrincipal(id.getPrincipal().toText());
        setIsAuthenticated(true);
      }

      setLoading(false);
    };
    initAuth();
  }, []);

  const login = () => {
    return new Promise((resolve, reject) => {
      authClient.login({
        identityProvider,
        onSuccess: () => {
          const id = authClient.getIdentity();
          setIdentity(id);
          setPrincipal(id.getPrincipal().toText());
	  setIsAuthenticated(true);

          resolve(id);
        },
        onError: reject,
      });
    });
  };

  const logout = async () => {
    if (!authClient) throw 'Authentication client should be created first';
    if (!isAuthenticated) throw 'User is already logged out';

    await authClient.logout();
    setIdentity(null);
    setPrincipal(null);
    setIsAuthenticated(false);
  };

  return (
    <InternetIdentityContext.Provider value={{ authClient, identity, principal, loading, login, logout, isAuthenticated}}>
      {children}
    </InternetIdentityContext.Provider>
  );
};

export const useIIAuth = () => useContext(InternetIdentityContext);
