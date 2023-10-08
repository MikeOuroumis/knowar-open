import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import {decode} from 'html-entities';

export function Option({answer, onPress}) {
  return (
    <Pressable style={styles.optionContainer} onPress={() => onPress(answer)}>
      <Text style={styles.optionText}>{decode(answer)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    backgroundColor: '#fff',
    width: '100%',
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
