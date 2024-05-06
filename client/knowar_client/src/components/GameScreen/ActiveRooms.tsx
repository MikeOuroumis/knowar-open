import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useRoomListener} from '../../hooks/useRoomListener';
import {COLOR_LIST} from '../../constants/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthenticatedScreens, RootStackParamList} from '../../types/navigation';
import {SocketEvents} from '../../socket/SocketEvents';
import socket from '../../socket/socket';
import {IRoom} from '../../../../../shared/types/Room';

export function ActiveRooms() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {activeRooms, loading} = useRoomListener();

  const handleJoinGame = (roomId: IRoom) => {
    socket.emit(SocketEvents.JOIN_ROOM, roomId);
    navigation.navigate(AuthenticatedScreens.GameScreen);
  };
  return (
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
                  {room.userName} - {room.category}
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
  );
}

const styles = StyleSheet.create({
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
