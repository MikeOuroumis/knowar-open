import {
  deleteUserEndpoint,
  loginUserEndpoint,
  registerUserEndpoint,
} from '../config';
import mainAxiosClient from '../api/axiosClients';

export async function login(email: string, password: string) {
  try {
    const response = await mainAxiosClient.post(loginUserEndpoint, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to login');
  }
}

export async function registerUser(
  userName: string,
  email: string,
  password: string,
) {
  try {
    const response = await mainAxiosClient.post(registerUserEndpoint, {
      userName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to register user');
  }
}

export async function deleteUser(userId: string) {
  try {
    const response = await mainAxiosClient.post(deleteUserEndpoint, {userId});
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete user');
  }
}
