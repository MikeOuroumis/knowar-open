import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import {decode} from 'html-entities';
import {COLOR_LIST} from '../../constants/colors';

export function Option({answer, onPress}) {
  return (
    <Pressable style={styles.optionContainer} onPress={() => onPress(answer)}>
      <Text style={styles.optionText}>{decode(answer)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    backgroundColor: COLOR_LIST.white,
    width: '100%',
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLOR_LIST.black,
  },
});
