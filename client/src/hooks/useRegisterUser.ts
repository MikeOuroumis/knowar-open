import {AuthContext} from '../store/auth-context';
import {Alert} from 'react-native';
import {useContext, useState} from 'react';
import {
  AuthenticatedScreens,
  RootStackParamList,
  UnauthenticatedScreens,
} from '../types/navigation';
import {KeychainService, AuthService} from '../services';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RegistarNavigationPro = NativeStackNavigationProp<
  RootStackParamList,
  UnauthenticatedScreens.RegisterScreen
>;

export default function useRegisterUser(
  userName: string,
  email: string,
  password: string,
) {
  const navigation = useNavigation<RegistarNavigationPro>();

  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const registerHandler = async () => {
    setIsLoading(true);
    try {
      const data = await AuthService.registerUser(userName, email, password);

      if (data.status === 'ok') {
        const {token, email, userName, userId} = data;
        authCtx.authenticate(token, email, userName, userId);

        const keychainData = {token, userName, userId};

        await KeychainService.setCredentials(token, keychainData);
        navigation.replace(AuthenticatedScreens.MainMenuScreen);
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
