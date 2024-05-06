import {StyleSheet, Text} from 'react-native';
import {COLOR_LIST} from '../constants/colors';

export function NoActiveGames() {
  return <Text style={styles.text}>No active games, press create new...</Text>;
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginTop: 20,
    color: COLOR_LIST.white,
    fontSize: 18,
  },
});
