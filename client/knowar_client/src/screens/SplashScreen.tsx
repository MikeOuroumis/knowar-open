import React, {useEffect, useRef, useContext} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import logo from '../assets/images/Knowar_logo.png';
import {COLOR_LIST} from '../constants/colors';
import {AuthContext} from '../store/auth-context';
import {
  AuthenticatedScreens,
  UnauthenticatedScreens,
} from '../types/navigation';
import {useNavigation} from '@react-navigation/native';

export function SplashScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }).start(() => {
        const nextScreen = authCtx.isAuthenticated
          ? AuthenticatedScreens.MainMenuScreen
          : UnauthenticatedScreens.LoginScreen;
        navigation.replace(nextScreen);
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, authCtx.isAuthenticated, fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={logo}
        style={[
          styles.logo,
          {
            opacity: fadeAnim,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_LIST.darkBackgroundBlue,
  },
  logo: {
    width: '100%',
    height: '50%',
    marginBottom: 20,
  },
});
