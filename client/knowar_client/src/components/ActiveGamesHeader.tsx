import {StyleSheet, Text} from 'react-native';
import {COLOR_LIST} from '../constants/colors';

export function ActiveGamesHeader() {
  return <Text style={styles.text}>Active Games</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: COLOR_LIST.white,
    textAlign: 'center',
    marginLeft: 20,
    marginVertical: 20,
    fontWeight: '400',
    fontSize: 25,
  },
});
