import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as AuthService from '../../services/AuthService';
import {
  deleteUserEndpoint,
  loginUserEndpoint,
  registerUserEndpoint,
} from '../../config';

describe('AuthService', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test('login successfully logs in user', async () => {
    const userData = {email: 'test@example.com', password: 'password123'};
    mock.onPost(loginUserEndpoint).reply(200, {
      status: 'ok',
      data: {token: 'abc123', userName: 'testuser'},
    });

    const response = await AuthService.login(userData.email, userData.password);
    expect(response.data.token).toEqual('abc123');
  });

  test('login handles failure', async () => {
    const userData = {email: 'test@example.com', password: 'wrongpassword'};
    mock.onPost(loginUserEndpoint).reply(401, {
      status: 'error',
      message: 'Authentication failed',
    });

    await expect(
      AuthService.login(userData.email, userData.password),
    ).rejects.toThrow('Failed to login');
  });

  test('registerUser creates a new user', async () => {
    const newUser = {
      userName: 'newuser',
      email: 'new@example.com',
      password: 'password123',
    };
    mock.onPost(registerUserEndpoint).reply(200, {
      status: 'ok',
      data: newUser,
    });

    const response = await AuthService.registerUser(
      newUser.userName,
      newUser.email,
      newUser.password,
    );
    expect(response.data.userName).toEqual('newuser');
  });

  test('deleteUser removes user', async () => {
    const userId = '123';
    mock.onPost(deleteUserEndpoint).reply(200, {
      status: 'ok',
    });

    const response = await AuthService.deleteUser(userId);
    expect(response.status).toEqual('ok');
  });
});
