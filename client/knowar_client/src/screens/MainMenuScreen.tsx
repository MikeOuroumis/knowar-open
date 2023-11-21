import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {useEffect} from 'react';
import ButtonComponent from '../components/ButtonComponent';
import {COLOR_LIST} from '../constants/colors';
import socket from '../socket/socket';
import {SocketEvents} from '../socket/SocketEvents';
import mainMenuBackground from '../assets/images/Knowar_logo.png';
import {useLogout} from '../hooks/useLogout';

export default function MainMenuScreen({navigation}) {
  const logout = useLogout();

  useEffect(() => {
    socket.on(SocketEvents.CONNECT, () => {
      socket.emit('on_connect', 'someone connected');
    });
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={mainMenuBackground}
        style={styles.globalView}
        resizeMode="cover">
        <View style={styles.buttonWrapper}>
          <ButtonComponent
            title="Single Player"
            style={styles.button}
            onPress={() =>
              navigation.replace('AuthenticatedStack', {
                screen: 'SinglePlayerCreateGameScreen',
              })
            }
          />
          <ButtonComponent
            title="Multi Player"
            style={styles.button}
            onPress={() =>
              navigation.replace('AuthenticatedStack', {
                screen: 'MultiplayerLobbyScreen',
              })
            }
          />
          <ButtonComponent
            title="Log Out"
            style={styles.button}
            onPress={logout}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_LIST.darkBackgroundBlue,
    flex: 1,
  },
  globalView: {
    flex: 1,
    height: '50%',
  },
  logoContainer: {
    elevation: 10,
    shadowColor: COLOR_LIST.vibrantCyan,
    shadowOffset: {width: 0, height: 2},
  },
  logo: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  buttonWrapper: {
    marginVertical: 18,
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    borderColor: COLOR_LIST.softPink,
    borderWidth: 2,
    shadowColor: COLOR_LIST.softPink,
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 10,
    borderRadius: 20,
  },
});
