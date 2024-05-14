import {useContext, useState} from 'react';
import {Alert} from 'react-native';
import {AuthContext} from '../store/auth-context';
import {
  AuthenticatedScreens,
  RootStackParamList,
  UnauthenticatedScreens,
} from '../types/navigation';
import {KeychainService, AuthService} from '../services';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type LoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  UnauthenticatedScreens.LoginScreen
>;

export default function useLogin(email: string, password: string) {
  const navigation = useNavigation<LoginNavigationProp>();

  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const loginHandler = async () => {
    setIsLoading(true);
    try {
      const data = await AuthService.login(email, password);

      if (data.status === 'ok') {
        const {token, email, userName, userId} = data.data;
        authCtx.authenticate(token, email, userName, userId);

        const keychainData = {token, userName, userId};
        await KeychainService.setCredentials(email, keychainData);
        navigation.replace(AuthenticatedScreens.MainMenuScreen);
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
