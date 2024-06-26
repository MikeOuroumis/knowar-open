import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {colorList} from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import {LobbyBg} from '../assets/images';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthenticatedScreens, RootStackParamList} from '../types/navigation';
import {ActiveRooms, LobbyScreenHeader, ButtonComponent} from '../components';

export default function MultiplayerLobbyScreen(): JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ImageBackground
      source={LobbyBg}
      style={styles.globalView}
      resizeMode="cover">
      <LinearGradient
        colors={[
          'rgba(0,0,0,0.8)',
          'rgba(0,0,0,0.3)',
          'rgba(0,0,0,0.2)',
          'rgba(0,0,0,0.4)',
          'rgba(0,0,0,1)',
        ]}
        style={styles.linearGradient}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <View style={styles.container}>
          <LobbyScreenHeader />
          <ActiveRooms />
        </View>
        <ButtonComponent
          title="Back to Main Menu"
          onPress={() =>
            navigation.navigate(AuthenticatedScreens.MainMenuScreen)
          }
        />
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: 20,
    borderColor: colorList.vibrantCyan,
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  globalView: {
    flex: 1,
    height: '100%',
  },
  linearGradient: {
    flex: 1,
  },
});
