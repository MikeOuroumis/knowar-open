import {useContext, useEffect, useState} from 'react';
import * as Keychain from 'react-native-keychain';
import {AuthContext} from '../store/auth-context';

export function useRetrieveCredentials(): boolean {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function retrieveCredentials() {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          const {token, email, userName, userId} = JSON.parse(
            credentials.password,
          );
          authCtx.authenticate(token, email, userName, userId);
        }
      } catch (error) {
        console.error("Couldn't login", error);
      } finally {
        setIsLoading(false);
      }
    }

    retrieveCredentials();
  }, []);

  return isLoading;
}
