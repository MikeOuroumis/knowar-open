import axios from 'axios';
import {apiUrl} from '../config';

// the main api's url
const mainAxiosClient = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
});

mainAxiosClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API call error', error.response || error.message);
    return Promise.reject(
      new Error(
        error.response?.data?.message || 'Failed to process the request',
      ),
    );
  },
);

export default mainAxiosClient;
