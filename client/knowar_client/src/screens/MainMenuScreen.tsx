import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {useEffect, useContext} from 'react';
import ButtonComponent from '../components/ButtonComponent';
import {COLORS, COLOR_LIST} from '../constants/colors';
import {AuthContext} from '../store/auth-context';
import socket from '../socket/socket';
import {SocketEvents} from '../socket/SocketEvents';
import mainMenuBackground from '../assets/images/main-menu-bg-3.png';
import LinearGradient from 'react-native-linear-gradient';
import {useLogout} from '../hooks/useLogout';

export default function MainMenuScreen(props) {
  const authCtx = useContext(AuthContext);
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
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)']}
          style={styles.linearGradient}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <Text style={styles.title}>
            Hello <Text style={styles.userNameText}>{authCtx.userName}</Text>,
            welcome to Knowar!
          </Text>
          <ButtonComponent
            style={styles.buttonMargin}
            title="Multi Player"
            onPress={() =>
              props.navigation.replace('AuthenticatedStack', {
                screen: 'MultiplayerLobbyScreen',
              })
            }
          />
          <ButtonComponent title="Log Out" onPress={logout} />
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
    justifyContent: 'center',
  },
  text: {
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 21,
  },
  userNameText: {
    textAlign: 'center',
    color: COLOR_LIST.neonPink,
    textShadowColor: COLOR_LIST.neonPink,
    textShadowRadius: 10,
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    marginBottom: 70,
    fontWeight: '400',
    fontSize: 25,
  },
  title: {
    textAlign: 'center',
    padding: 20,
    color: COLOR_LIST.white,
    textShadowColor: COLOR_LIST.white,
    textShadowRadius: 10,
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    marginBottom: 70,
    fontWeight: '400',
    fontSize: 25,
  },
  buttonMargin: {
    marginVertical: 8,
  },
});
