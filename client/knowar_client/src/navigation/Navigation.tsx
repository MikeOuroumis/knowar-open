import React, {useEffect, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../store/auth-context';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {DrawerNavigator} from './DrawerNavigator';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

export function Navigation() {
  const [isLoading, setIsLoading] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function retrieveUserData() {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value) {
          const {token, email, userName, userId} = JSON.parse(value);
          authCtx.authenticate(token, email, userName, userId);
        }
      } catch (error) {
        console.error("Couldn't login", error);
      } finally {
        setIsLoading(false);
      }
    }

    retrieveUserData();
  }, []);

  if (isLoading) {
    return <LoadingScreen text="Loading..." />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        {authCtx.isAuthenticated ? (
          <>
            <Stack.Screen
              name="AuthenticatedStack"
              component={DrawerNavigator}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
