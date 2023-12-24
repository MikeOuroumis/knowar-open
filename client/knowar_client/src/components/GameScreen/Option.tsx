import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import {decode} from 'html-entities';
import {COLOR_LIST} from '../../constants/colors';

interface OptionProps {
  answer: string;
  onPress: (answer: string) => void;
  isAnswered: boolean;
  isCorrect: boolean;
  selectedAnswer: string;
}

export function Option({
  answer,
  onPress,
  isAnswered,
  isCorrect,
  selectedAnswer,
}: OptionProps) {
  const isSelected = selectedAnswer === answer;

  return (
    <Pressable
      style={[
        styles.optionContainer,
        isAnswered && isSelected
          ? isCorrect
            ? styles.correct
            : styles.incorrect
          : {},
      ]}
      onPress={() => onPress(answer)}>
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
  correct: {
    backgroundColor: COLOR_LIST.green,
  },
  incorrect: {
    backgroundColor: COLOR_LIST.red,
  },
});
