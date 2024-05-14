import {StyleSheet, Text} from 'react-native';
import {colorList} from '../../constants/colors';

export default function ActiveGamesHeader() {
  return <Text style={styles.text}>Active Games</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: colorList.white,
    textAlign: 'center',
    marginLeft: 20,
    marginVertical: 20,
    fontWeight: '400',
    fontSize: 25,
  },
});
