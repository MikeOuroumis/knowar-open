import {View, Text, StyleSheet} from 'react-native';
import {useEffect, useContext} from 'react';
import ButtonComponent from '../components/ButtonComponent';
import {COLORS} from '../constants/colors';
import {AuthContext} from '../store/auth-context';
import socket from '../socket/socket';
import {SocketEvents} from '../socket/SocketEvents';

export default function MainMenuScreen(props) {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    socket.on(SocketEvents.CONNECT, () => {
      socket.emit('on_connect', 'someone connected');
    });
  }, []);

  return (
    <View style={styles.globalView}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Hello {authCtx.userName}, welcome to Knowar 🥸⚔️
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalView: {
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.black,
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 21,
  },
  title: {
    textAlign: 'center',
    padding: 20,
    color: COLORS.white,
    marginBottom: 70,
    fontWeight: '400',
    fontSize: 25,
  },
  buttonMargin: {
    marginVertical: 8,
  },
});
