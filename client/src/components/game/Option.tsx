import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import {decode} from 'html-entities';
import {colorList} from '../../constants/colors';

interface OptionProps {
  answer: string;
  onPress: (answer: string) => void;
  isAnswered: boolean;
  answeredCorrect: boolean;
  selectedAnswer: string;
  isCorrect: boolean;
}

export default function Option({
  answer,
  onPress,
  isAnswered,
  answeredCorrect,
  selectedAnswer,
  isCorrect,
}: OptionProps) {
  const isSelected = selectedAnswer === answer;

  return (
    <Pressable
      style={[
        styles.optionContainer,
        isAnswered && isSelected
          ? answeredCorrect
            ? styles.correct
            : styles.incorrect
          : {},
        isAnswered && isCorrect ? styles.correctNoSelected : {},
      ]}
      onPress={() => onPress(answer)}>
      <Text style={styles.optionText}>{decode(answer)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    backgroundColor: colorList.white,
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
    color: colorList.black,
  },
  correct: {
    backgroundColor: colorList.green,
  },
  incorrect: {
    backgroundColor: colorList.red,
  },
  correctNoSelected: {
    borderColor: colorList.green,
    borderWidth: 3,
  },
});
