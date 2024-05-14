import {useState} from 'react';
import {fetchQuestionsFromAPI} from '../api/fetchQuestions';
import {prepareQuestions} from '../util/questions';
import {QuestionInterface} from '../types/questions';

export default function useQuestions(categoryId: string) {
  const [questions, setQuestions] = useState<QuestionInterface[] | null>(null);
  const fetchAndPrepareQuestions = async () => {
    const fetchedQuestions = await fetchQuestionsFromAPI(categoryId);

    if (!fetchedQuestions) {
      return;
    }

    const preparedQuestions = prepareQuestions(fetchedQuestions);
    setQuestions(preparedQuestions);
  };
  return {questions, setQuestions, fetchAndPrepareQuestions};
}
