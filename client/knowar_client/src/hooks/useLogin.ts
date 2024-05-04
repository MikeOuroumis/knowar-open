import * as Keychain from 'react-native-keychain';
import {apiUrl} from '../constants/constants';
import {useContext, useState} from 'react';
import {Alert} from 'react-native';
import {AuthContext} from '../store/auth-context';

export function useLogin(navigation: any, email: string, password: string) {
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const loginHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/login-user`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application.json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({email, password}),
      });
      const data = await response.json();

      if (data.status === 'ok') {
        const {token, email, userName, userId} = data.data;
        authCtx.authenticate(token, email, userName, userId);
        const keychainData = JSON.stringify({token, userName, userId});
        await Keychain.setGenericPassword(email, keychainData);
        navigation.navigate('AuthenticatedStack');
      } else {
        Alert.alert('Login Failed', 'Invalid Credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {loginHandler, isLoading};
}
