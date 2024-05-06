import {API_URL, LOCAL_API_URL} from '@env';

export const apiUrl = __DEV__ ? LOCAL_API_URL : API_URL;
export const TRIVIA_CATEGORY_URL = 'https://opentdb.com/api_category.php';
