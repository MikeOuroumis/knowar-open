import React from 'react';
import {View, StyleSheet, ImageBackground, Image} from 'react-native';
import {useEffect} from 'react';
import ButtonComponent from '../components/ButtonComponent';
import {COLORS, COLOR_LIST} from '../constants/colors';
import socket from '../socket/socket';
import {SocketEvents} from '../socket/SocketEvents';
import mainMenuBackground from '../assets/images/galaxy.png';
import LinearGradient from 'react-native-linear-gradient';
import {useLogout} from '../hooks/useLogout';
import knowarLogo from '../assets/images/logo_letters.png';

export default function MainMenuScreen(props) {
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
        <LinearGradient
          colors={[
            'rgba(0,0,0,0.3)',
            'rgba(0,0,0,0.5)',
            'rgba(0,0,0,0.8)',
            'rgba(0,0,0,0.9)',
            'rgba(0,0,0,1)',
          ]}
          style={styles.linearGradient}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <Image source={knowarLogo} style={styles.logo} />
          <View style={styles.buttonWrapper}>
            <ButtonComponent
              title="Multi Player"
              style={styles.button}
              onPress={() =>
                props.navigation.replace('AuthenticatedStack', {
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
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    flex: 1,
  },
  globalView: {
    flex: 1,
    height: '100%',
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'space-around',
  },
  logoContainer: {
    elevation: 10, // move the elevation here
    shadowColor: COLOR_LIST.vibrantCyan, // applicable for iOS
    shadowOffset: {width: 0, height: 2}, // applicable for iOS, if you need to adjust the direction of the shadow
  },
  logo: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
    padding: 20,
    color: COLOR_LIST.vibrantCyan,
    textShadowColor: COLOR_LIST.vibrantCyan,
    textShadowRadius: 10,
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    marginBottom: 60,
    fontWeight: '400',
    fontSize: 65,
  },
  buttonWrapper: {
    marginVertical: 8,
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
