import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../store/auth-context';
import {KeychainService} from '../services';

export default function useRetrieveCredentials(): boolean {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function retrieveCredentials() {
      try {
        const credentials = await KeychainService.loadCredentials();
        if (credentials) {
          const {token, email, userName, userId} = credentials;
          authCtx.authenticate(token, email, userName, userId);
        }
      } catch (error) {
        console.error("Couldn't retrieve credentials", error);
      } finally {
        setIsLoading(false);
      }
    }

    retrieveCredentials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading;
}
