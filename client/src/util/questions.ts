import {QuestionInterface} from '../types/questions';
import {shuffle} from './shuffle';

export function prepareQuestions(results: QuestionInterface[]) {
  return results.map(result => {
    const allAnswers = shuffle([
      ...result.incorrect_answers,
      result.correct_answer,
    ]);
    return {...result, all_answers: allAnswers};
  });
}
