import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import loadingImagebg from '../assets/images/galaxy.png';
import {COLOR_LIST} from '../constants/colors';
import ButtonComponent from '../components/ButtonComponent';
import {NavigationProp} from '@react-navigation/native';

interface LoadingScreenProps {
  text: string;
  buttonText?: string;
  navigation?: NavigationProp<ReactNavigation.RootParamList>;
}

export default function LoadingScreen({
  text,
  buttonText,
  navigation,
}: LoadingScreenProps) {
  return (
    <ImageBackground source={loadingImagebg} style={styles.backgroundImage}>
      <View style={styles.backgroundImageOverlay}>
        <View style={[styles.container, styles.horizontal]}>
          <Text style={styles.text}>{text}</Text>
          <ActivityIndicator size="large" color={COLOR_LIST.white} />
        </View>
        {buttonText && navigation && (
          <ButtonComponent
            title={buttonText}
            onPress={() =>
              navigation.replace('AuthenticatedStack', {
                screen: 'MultiplayerLobbyScreen',
              })
            }
          />
        )}
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  backgroundImageOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backgroundImage: {width: '100%', height: '100%'},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  horizontal: {
    flexDirection: 'column',
    padding: 10,
  },
  text: {
    color: COLOR_LIST.white,
    marginBottom: 20,
    fontSize: 30,
    textAlign: 'center',
    textShadowColor: COLOR_LIST.white,
    textShadowRadius: 5,
  },
});
