import {API_URL, LOCAL_API_URL} from '@env';

const baseUrl = determineBaseURL();

export const apiUrl = `${baseUrl}/api`;
export const socketUrl = `${baseUrl}/socket`;
export const TRIVIA_CATEGORY_URL = 'https://opentdb.com/api_category.php';
export const deleteUserEndpoint = '/users/delete-user';
export const loginUserEndpoint = '/users/login';
export const registerUserEndpoint = '/users/register';

function determineBaseURL() {
  // as soon as jest doesn't recognize __DEV__ property we need this function
  if (typeof __DEV__ === 'undefined') {
    return LOCAL_API_URL;
  }

  return __DEV__ ? LOCAL_API_URL : API_URL;
}
