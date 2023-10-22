import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import {useRoomListener} from '../hooks/useRoomListener';
import socket from '../socket/socket';
import {SocketEvents} from '../socket/SocketEvents';
import {COLORS} from '../constants/colors';

export default function MultiplayerLobbyScreen({navigation}) {
  const {activeRooms, loading} = useRoomListener();

  const handleJoinGame = roomId => {
    socket.emit(SocketEvents.JOIN_ROOM, roomId);
    navigation.navigate('GameScreen', {
      roomId,
    });
  };

  return (
    <View style={styles.container}>
      <ButtonComponent
        title="Create Game"
        onPress={() => navigation.navigate('CreateGameScreen')}
      />

      <Text style={styles.activeRoomsTitle}>Active Games</Text>
      <ScrollView style={styles.scrollView}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primaryGreen} />
        ) : activeRooms.length > 0 ? (
          activeRooms.map((room, index) => (
            <Pressable
              key={`${room}-${index}`}
              onPress={() => handleJoinGame(room)}>
              <Text style={styles.activeRooms}>{room}</Text>
            </Pressable>
          ))
        ) : (
          <Text style={styles.noRoomsAvailable}>No active games...</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
  },
  container: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
  },
  activeRoomsTitle: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: '400',
    fontSize: 25,
  },
  activeRooms: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  noRoomsAvailable: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
    fontSize: 18,
  },
});
