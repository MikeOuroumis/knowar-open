import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colorList} from '../constants/colors';
import {IRoom} from '../../../shared/types/Room';

interface ActiveRoomProps {
  room: IRoom;
  handleJoinGame: (room: IRoom) => void;
}

export function RoomItem({room, handleJoinGame}: ActiveRoomProps) {
  return (
    <Pressable onPress={() => handleJoinGame(room)}>
      <View style={styles.activeRoomButton}>
        <Text style={styles.activeRoomText}>
          {room.userName} - {room.category}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  activeRoomButton: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colorList.vibrantCyan,
    shadowColor: colorList.vibrantCyan,
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 100,
  },
  activeRoomText: {
    color: colorList.vibrantCyan,
    textShadowColor: colorList.vibrantCyan,
    textShadowRadius: 10,
    textAlign: 'center',
  },
});
