import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {useRoomListener} from '../hooks/useRoomListener';
import {COLOR_LIST} from '../constants/colors';
import {RoomItem} from './RoomItem';
import {useJoinGame} from '../hooks/useJoinGame';
import {ActiveGamesHeader} from './ActiveGamesHeader';
import {NoActiveGames} from './NoActiveGames';

export function ActiveRooms() {
  const {activeRooms, loading} = useRoomListener();
  const handleJoinGame = useJoinGame();

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={COLOR_LIST.vibrantCyan} />
      ) : (
        <FlatList
          data={activeRooms}
          renderItem={({item}) => (
            <RoomItem room={item} handleJoinGame={handleJoinGame} />
          )}
          ListHeaderComponent={<ActiveGamesHeader />}
          ListEmptyComponent={<NoActiveGames />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
});
