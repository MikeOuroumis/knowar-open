import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useRoomListener} from '../hooks/useRoomListener';
import {COLOR_LIST} from '../constants/colors';
import {RoomItem} from './RoomItem';
import {useJoinGame} from '../hooks/useJoinGame';

export function ActiveRooms() {
  const {activeRooms, loading} = useRoomListener();
  const handleJoinGame = useJoinGame();

  return (
    <View style={styles.scrollView}>
      {loading ? (
        <ActivityIndicator size="large" color={COLOR_LIST.vibrantCyan} />
      ) : (
        <FlatList
          data={activeRooms}
          renderItem={({item}) => (
            <RoomItem room={item} handleJoinGame={handleJoinGame} />
          )}
          ListHeaderComponent={
            <Text style={styles.activeRoomsTitle}>Active Games</Text>
          }
          ListEmptyComponent={
            <Text style={styles.noRoomsAvailable}>
              No active games, press create new...
            </Text>
          }
        />
      )}
    </View>
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
