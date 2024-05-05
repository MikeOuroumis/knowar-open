import axios from 'axios';
import {Alert} from 'react-native';

export async function fetchQuestionsFromAPI(categoryId: number, amount = 10) {
  try {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}`,
    );
    const code = response.data.response_code;

    if (code !== 0) {
      if (code === 1 && amount > 1) {
        // Recursively call with fewer questions
        return fetchQuestionsFromAPI(categoryId, amount - 1);
      } else {
        const errorMessage =
          code === 1
            ? "No Results. The API doesn't have enough questions for your query."
            : code === 2
            ? "Invalid Parameter. Arguments passed in aren't valid."
            : code === 3
            ? 'Token Not Found. Session Token does not exist.'
            : 'Token Empty Session. Token has returned all possible questions for the specified query. Resetting the Token is necessary.';
        throw new Error(errorMessage);
      }
    } else {
      let fetchedResults = response.data.results;

      // Shuffle the order of questions and answers
      fetchedResults = shuffleArray(fetchedResults).map(result => {
        const allAnswers = shuffleArray([
          ...result.incorrect_answers,
          result.correct_answer,
        ]);
        return {...result, all_answers: allAnswers};
      });

      return fetchedResults;
    }
  } catch (err) {
    Alert.alert("Couldn't fetch questions", 'Please try again later.');
    console.log("Couldn't fetch questions", err);
    return []; // Return an empty array in case of an error
  }
}

// Function to shuffle an array in place using Durstenfeld shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array; // Return the shuffled array
}
