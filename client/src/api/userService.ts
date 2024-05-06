import axios from 'axios';
import {apiUrl} from '../config';

export const deleteUser = async (userId: string) => {
  const response = await axios.post(`${apiUrl}/deleteUser`, {
    userId,
  });
  return response.data;
};
