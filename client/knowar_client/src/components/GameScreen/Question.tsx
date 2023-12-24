import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Option} from './Option';
import {decode} from 'html-entities';

type QuestionObject = {
  question: string;
  all_answers: string[];
  correct_answer: string;
};
interface QuestionProps {
  questionObj: QuestionObject;
  onOptionPress: (answer: string) => void;
  isAnswered: boolean;
  isCorrect: boolean;
  selectedAnswer: string;
}

export function Question({
  questionObj,
  onOptionPress,
  isAnswered,
  isCorrect,
  selectedAnswer,
}: QuestionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{decode(questionObj.question)}</Text>
      {questionObj.all_answers.map((answer, index) => (
        <Option
          key={index}
          answer={answer}
          onPress={onOptionPress}
          isAnswered={isAnswered}
          isCorrect={isCorrect}
          selectedAnswer={selectedAnswer}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
});
