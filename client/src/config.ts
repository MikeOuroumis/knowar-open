import {API_URL, LOCAL_API_URL} from '@env';

export const apiUrl = determineURL();
export const TRIVIA_CATEGORY_URL = 'https://opentdb.com/api_category.php';
export const deleteUserEndpoint = `${apiUrl}/deleteUser`;
export const loginUserEndpoint = `${apiUrl}/login-user`;
export const registerUserEndpoint = `${apiUrl}/register`;

function determineURL() {
  // as soon as jest doesn't recognize __DEV__ property we need this function
  if (typeof __DEV__ === 'undefined') {
    return LOCAL_API_URL;
  }

  return __DEV__ ? LOCAL_API_URL : API_URL;
}
