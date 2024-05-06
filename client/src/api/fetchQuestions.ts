import axios from 'axios';
import {QuestionInterface} from '../types/questions';

export async function fetchQuestionsFromAPI(
  categoryId: string,
  amount = 10,
): Promise<QuestionInterface[] | null> {
  try {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}`;
    const response = await axios.get(url);
    const code = response.data.response_code;

    if (code === 1 && amount > 1) {
      return fetchQuestionsFromAPI(categoryId, amount - 1);
    } else if (code !== 0) {
      console.error('API error with code: ', code);
      return null;
    }

    return response.data.results; // Return results directly
  } catch (err) {
    console.error('Failed to fetch questions: ', err);
    return null;
  }
}
