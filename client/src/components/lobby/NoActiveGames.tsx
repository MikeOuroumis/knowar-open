import {StyleSheet, Text} from 'react-native';
import {colorList} from '../../constants/colors';

export default function NoActiveGames() {
  return <Text style={styles.text}>No active games, press create new...</Text>;
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginTop: 20,
    color: colorList.white,
    fontSize: 18,
  },
});
