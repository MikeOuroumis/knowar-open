import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../store/auth-context';
import {useContext} from 'react';

export function useLogout() {
  const authCtx = useContext(AuthContext);

  async function logout() {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.setItem('loggedIn', JSON.stringify(false));
      authCtx.logout();
    } catch (error) {
      console.log("Couldn't log out", error);
    }
  }

  return logout;
}
