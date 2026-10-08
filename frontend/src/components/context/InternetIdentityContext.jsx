import { createContext, useState, useContext, useEffect } from 'react';
import { client, doSignIn } from '../../controller/auth';

const InternetIdentityContext = createContext();

export const InternetIdentityProvider = ({ children }) => {
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [loading, setLoading] = useState(true);

  // initialized from the imported auth controller
  const [authClient, setAuthClient] = useState(client);
  const [isAuth, setIsAuth] = useState(false);
  
  useEffect(() => {
    const initAuth = async () => {

      try {
        const authenticated = await authClient.isAuthenticated();
        setIsAuth(authenticated);

        if (authenticated) {
          const id = await authClient.getIdentity();
          setIdentity(id);
          setPrincipal(id.getPrincipal().toText());
        }
      } catch (error) {
        console.error('Could not restore Internet Identity session:', error);
      } finally {
        setLoading(false);
      }
    };

    // initialize authentication state
    initAuth();
  }, []);


  const isAuthenticated = () => {
    return isAuth;
  };
  

  const login = async () => {
    try {
      
      const identity = await doSignIn();

      setIdentity(identity);
      setPrincipal(identity.getPrincipal().toText());
      setIsAuth(true);

      return identity;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    if (!authClient) throw 'Authentication client should be created first';
    if (!isAuthenticated()) throw 'User is already logged out';

    await authClient.signOut();
    setIdentity(null);
    setPrincipal(null);
    setIsAuth(false);
  };

  return (
    <InternetIdentityContext.Provider value={{ authClient, identity, principal, loading, login, logout, isAuthenticated}}>
      {children}
    </InternetIdentityContext.Provider>
  );
};

export const useIIAuth = () => useContext(InternetIdentityContext);
