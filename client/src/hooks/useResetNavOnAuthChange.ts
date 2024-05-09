import {CommonActions, useNavigation} from '@react-navigation/native';
import {useContext, useEffect} from 'react';
import {AuthContext} from '../store/auth-context';
import {
  AuthenticatedScreens,
  UnauthenticatedScreens,
} from '../types/navigation';

/**
 * Custom hook that adds extra layer of security for the navigation,
 * When a user logs in or logs out the navigation state is reset so
 * no history is included
 */
export function useResetNavOnAuthChange() {
  const {isAuthenticated} = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [
        {
          name: isAuthenticated
            ? AuthenticatedScreens.MainMenuScreen
            : UnauthenticatedScreens.LoginScreen,
        },
      ],
    });

    navigation.dispatch(resetAction);
  }, [navigation, isAuthenticated]);
}
