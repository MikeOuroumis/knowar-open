import React, {useEffect, useRef, useContext} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import logo from '../assets/images/Knowar_logo.png';
import {COLOR_LIST} from '../constants/colors';
import {AuthContext} from '../store/auth-context';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    // Fade-in effect when component mounts
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true, // Add this line
    }).start();

    const timer = setTimeout(() => {
      // Start the fade-out effect just before navigation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true, // Add this line
      }).start(() => {
        // The completion callback will be invoked after the fade-out is done
        const nextScreen = authCtx.isAuthenticated
          ? 'AuthenticatedStack'
          : 'LoginScreen';
        navigation.replace(nextScreen);
      });
    }, 3000); // The entire splash screen is displayed for 3 seconds, including fade-in and starting fade-out

    return () => clearTimeout(timer);
  }, [navigation, authCtx.isAuthenticated, fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={logo}
        style={[
          styles.logo,
          {
            opacity: fadeAnim, // Bind opacity to animated value
          },
        ]}
      />
    </View>
  );
};

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

export default SplashScreen;
