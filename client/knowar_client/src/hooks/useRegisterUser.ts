import {AuthContext} from '../store/auth-context';
import {apiUrl} from '../constants/constants';
import {Alert} from 'react-native';
import {useContext, useState} from 'react';
import * as Keychain from 'react-native-keychain';

export function useRegisterUser(
  navigation: any,
  userName: string,
  email: string,
  password: string,
) {
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const registerHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application.json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({userName, email, password}),
      });

      const data = await response.json();

      if (data.status === 'ok') {
        const {token, email, userName, userId} = data;
        authCtx.authenticate(token, email, userName, userId);

        const keychainData = JSON.stringify({token, userName, userId});

        await Keychain.setGenericPassword(email, keychainData);
        navigation.navigate('AuthenticatedStack', {
          screen: 'MainMenuScreen',
        });
      } else {
        let errorMessage = data.message || 'Registration failed!';
        if (data.error) {
          errorMessage = data.error;
        }
        Alert.alert('Registration Error', errorMessage, [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ]);
      }
    } catch (error) {
      console.error('register error', error);

      Alert.alert(
        'Network Error',
        'Unable to register at the moment. Please try again later.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {registerHandler, isLoading};
}
