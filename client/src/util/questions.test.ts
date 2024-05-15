import {QuestionInterface} from '../types/questions';
import {prepareQuestions} from './questions';

describe('prepare questions', () => {
  test('should shuffle all answers for the questions', () => {
    const questions: QuestionInterface[] = [
      {
        question: 'test question',
        all_answers: ['1', '2', '3', '4'],
        category: 'bla bla',
        difficulty: 'easy',
        incorrect_answers: ['1', '2', '3'],
        correct_answer: '4',
        type: 'multiple',
      },
    ];

    const preparedQuestions = prepareQuestions(questions);

    expect(preparedQuestions).not.toEqual(questions);
    expect(preparedQuestions).toHaveLength(questions.length);

    preparedQuestions.forEach((preparedQuestion, index) => {
      const originalQuestion = questions[index];
      expect(preparedQuestion.all_answers).toEqual(
        expect.arrayContaining(originalQuestion.all_answers),
      );
      expect(preparedQuestion.all_answers).not.toEqual(
        originalQuestion.all_answers,
      ); // This might occasionally fail if shuffle results in the same order
    });
  });
});
