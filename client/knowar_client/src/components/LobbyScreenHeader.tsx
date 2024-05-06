import {StyleSheet, Text, View} from 'react-native';
import {CreateNewGameButton} from './CreateNewGameButton';
import {COLOR_LIST} from '../constants/colors';

export function LobbyScreenHeader() {
  return (
    <View style={styles.joinGameRow}>
      <View style={styles.flexOne}>
        <Text style={styles.activeRoomsTitle}>Join a game</Text>
      </View>
      <View style={styles.flexOne}>
        <CreateNewGameButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  activeRoomsTitle: {
    color: COLOR_LIST.white,
    textAlign: 'center',
    marginLeft: 20,
    marginVertical: 20,
    fontWeight: '400',
    fontSize: 25,
  },
});
