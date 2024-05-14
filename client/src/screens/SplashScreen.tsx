import React, {useEffect, useRef, useContext} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import {KnowarLogo} from '../assets/images';
import {colorList} from '../constants/colors';
import {AuthContext} from '../store/authContext';
import {
  AuthenticatedScreens,
  InitialScreens,
  RootStackParamList,
  UnauthenticatedScreens,
} from '../types/navigation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  InitialScreens.SplashScreen
>;

export function SplashScreen(): JSX.Element {
  const navigation = useNavigation<SplashScreenNavigationProp>();

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
        source={KnowarLogo}
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
    backgroundColor: colorList.darkBackgroundBlue,
  },
  logo: {
    width: '100%',
    height: '50%',
    marginBottom: 20,
  },
});
