import axios from 'axios';

export async function fetchQuestionsFromAPI(categoryId) {
  try {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=1&category=${categoryId}`,
    );

    const code = response.data.response_code;

    if (code !== 0) {
      const err =
        code === 1
          ? "No Results. The API doesn't have enough questions for your query."
          : code === 2
          ? "Invalid Parameter. Arguments passed in aren't valid."
          : code === 3
          ? 'Token Not Found. Session Token does not exist.'
          : 'Token Empty Session. Token has returned all possible questions for the specified query. Resetting the Token is necessary.';

      throw new Error(`${err}`);
    } else {
      const data = await response.data;
      const totalQuestionsAvailable = data.total_questions;
      const amount = totalQuestionsAvailable;

      const questionsResponse = await axios.get(
        `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}`,
      );

      const questionsData = await questionsResponse.data;
      let fetchedResults = questionsData.results;

      // Shuffle the order of questions
      fetchedResults = shuffleArray(fetchedResults);

      // Shuffle answers and add them to the results
      for (const result of fetchedResults) {
        const allAnswers = [...result.incorrect_answers, result.correct_answer];
        shuffleArray(allAnswers);
        result.all_answers = allAnswers;
      }

      return fetchedResults;
    }
  } catch (err) {
    alert("Couldn't fetch questions", err);
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
