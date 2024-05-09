import axios from 'axios';
import {
  deleteUserEndpoint,
  loginUserEndpoint,
  registerUserEndpoint,
} from '../config';

export async function deleteUser(userId: string) {
  try {
    const response = await axios.post(deleteUserEndpoint, {userId});
    return response.data;
  } catch (error) {
    console.error('Error during deleting user', error);
    throw new Error('Failed to delete user');
  }
}

export async function login(email: string, password: string) {
  try {
    const response = await axios.post(loginUserEndpoint, {email, password});
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
  try {
    const response = await axios.post(registerUserEndpoint, {
      userName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error during register user', error);
    throw new Error('Failed to register user');
  }
}
