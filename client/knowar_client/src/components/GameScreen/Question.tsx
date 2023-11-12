import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Option} from './Option';
import {decode} from 'html-entities';

interface QuestionProps {
  questionObj: {
    question: string;
    all_answers: string[];
    correct_answer: string;
  };
  onOptionPress: (answer: string) => void;
}

export function Question({questionObj, onOptionPress}: QuestionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{decode(questionObj.question)}</Text>
      {questionObj.all_answers.map((answer, index) => (
        <Option key={index} answer={answer} onPress={onOptionPress} />
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
