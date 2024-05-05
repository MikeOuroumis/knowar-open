import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import {useRoomListener} from '../hooks/useRoomListener';
import socket from '../socket/socket';
import {SocketEvents} from '../socket/SocketEvents';
import {COLOR_LIST} from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import lobbyBackground from '../assets/images/lobby_bg2.png';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthenticatedScreens, RootStackParamList} from '../types/navigation';

export default function MultiplayerLobbyScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {activeRooms, loading} = useRoomListener();

  const handleJoinGame = roomId => {
    socket.emit(SocketEvents.JOIN_ROOM, roomId);
    navigation.navigate(AuthenticatedScreens.GameScreen, {
      roomId,
    });
  };

  return (
    <ImageBackground
      source={lobbyBackground}
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
          <View style={styles.joinGameRow}>
            <View style={styles.flexOne}>
              <Text style={styles.activeRoomsTitle}>Join a game</Text>
            </View>
            <View style={styles.flexOne}>
              <ButtonComponent
                title="Create New"
                style={styles.createNewButton}
                onPress={() =>
                  navigation.navigate(AuthenticatedScreens.CreateGameScreen)
                }
              />
            </View>
          </View>
          <ScrollView style={styles.scrollView}>
            {loading ? (
              <ActivityIndicator size="large" color={COLOR_LIST.vibrantCyan} />
            ) : activeRooms.length > 0 ? (
              <View>
                <Text style={styles.activeRoomsTitle}>Active Games</Text>
                {activeRooms.map((room, index) => (
                  <Pressable
                    key={`${room}-${index}`}
                    onPress={() => handleJoinGame(room)}>
                    <View style={styles.activeRoomButton}>
                      <Text style={styles.activeRooms}>
                        {room.host.userName} - {room.category}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            ) : (
              <Text style={styles.noRoomsAvailable}>
                No active games, press create new...
              </Text>
            )}
          </ScrollView>
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
    borderColor: COLOR_LIST.vibrantCyan,
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  joinGameRow: {
    flexDirection: 'row',
    borderBottomColor: COLOR_LIST.vibrantCyan,
    borderBottomWidth: 2,
    paddingBottom: 10,
    marginBottom: 10,
  },
  flexOne: {
    flex: 1,
  },
  createNewButton: {
    marginRight: 20,
  },
  globalView: {
    flex: 1,
    height: '100%',
  },
  linearGradient: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 20,
    flexGrow: 0,
  },
  activeRoomsTitle: {
    color: COLOR_LIST.white,
    textAlign: 'center',
    marginLeft: 20,
    marginVertical: 20,
    fontWeight: '400',
    fontSize: 25,
  },
  activeRoomButton: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLOR_LIST.vibrantCyan,
    shadowColor: COLOR_LIST.vibrantCyan,
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 100,
  },
  activeRooms: {
    color: COLOR_LIST.vibrantCyan,
    textShadowColor: COLOR_LIST.vibrantCyan,
    textShadowRadius: 10,

    textAlign: 'center',
  },
  noRoomsAvailable: {
    textAlign: 'center',
    marginTop: 20,
    color: COLOR_LIST.white,
    fontSize: 18,
  },
});
