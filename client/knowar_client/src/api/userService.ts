import axios from 'axios';
import {apiUrl} from '../constants/constants';

export const deleteUser = async (userId: string) => {
  const response = await axios.post(`${apiUrl}/deleteUser`, {
    userId,
  });
  return response.data;
};
