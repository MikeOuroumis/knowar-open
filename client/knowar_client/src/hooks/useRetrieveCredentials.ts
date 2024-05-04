import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../store/auth-context';
import * as KeychainService from '../services/KeychainService';

export function useRetrieveCredentials(): boolean {
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
  }, []);

  return isLoading;
}
