import {AuthContext} from '../store/auth-context';
import {useContext} from 'react';
import {KeychainService} from '../services';

export default function useLogout() {
  const authCtx = useContext(AuthContext);

  async function logout() {
    try {
      await KeychainService.removeCredentials();
      authCtx.logout();
    } catch (error) {
      console.log("Couldn't log out", error);
    }
  }

  return logout;
}
