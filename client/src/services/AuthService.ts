import axios from 'axios';
import {apiUrl} from '../config';

export async function deleteUser(userId: string) {
  const url = `${apiUrl}/deleteUser`;
  try {
    const response = await axios.post(url, {userId});
    return response.data;
  } catch (error) {
    console.error('Error during deleting user', error);
    throw new Error('Failed to delete user');
  }
}

export async function login(email: string, password: string) {
  const url = `${apiUrl}/login-user`;
  try {
    const response = await axios.post(url, {email, password});
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Failed to login');
  }
}

export async function registerUser(
  userName: string,
  email: string,
  password: string,
) {
  const url = `${apiUrl}/register`;
  try {
    const response = await axios.post(url, {userName, email, password});
    return response.data;
  } catch (error) {
    console.error('Error during register user', error);
    throw new Error('Failed to register user');
  }
}
