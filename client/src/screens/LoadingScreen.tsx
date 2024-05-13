import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import {galaxyImage} from '../assets/images';
import {colorList} from '../constants/colors';
import ButtonComponent from '../components/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import {
  AuthenticatedScreens,
  InitialScreens,
  RootStackParamList,
} from '../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface LoadingScreenProps {
  text: string;
  buttonText?: string;
}

type LoadingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  InitialScreens.LoadingScreen
>;

export default function LoadingScreen({text, buttonText}: LoadingScreenProps) {
  const navigation = useNavigation<LoadingScreenNavigationProp>();
  return (
    <ImageBackground source={galaxyImage} style={styles.backgroundImage}>
      <View style={styles.backgroundImageOverlay}>
        <View style={[styles.container, styles.horizontal]}>
          <Text style={styles.text}>{text}</Text>
          <ActivityIndicator size="large" color={colorList.white} />
        </View>
        {buttonText && navigation && (
          <ButtonComponent
            title={buttonText}
            onPress={() =>
              navigation.replace(AuthenticatedScreens.MultiplayerLobbyScreen)
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
    color: colorList.white,
    marginBottom: 20,
    fontSize: 30,
    textAlign: 'center',
    textShadowColor: colorList.white,
    textShadowRadius: 5,
  },
});
