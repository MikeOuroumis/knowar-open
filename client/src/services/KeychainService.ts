import * as Keychain from 'react-native-keychain';

interface UserCredentials {
  email: string;
  token: string;
  userName: string;
  userId: string;
}

type PartialUserCredentials = Omit<UserCredentials, 'email'> &
  Partial<Pick<UserCredentials, 'email'>>;

export async function loadCredentials(): Promise<null | UserCredentials> {
  try {
    const credentials = await Keychain.getGenericPassword();

    if (!credentials) {
      console.log('No credentials stored');
      return null;
    }

    const {token, userName, userId} = JSON.parse(credentials.password);

    const userCredentials: UserCredentials = {
      email: credentials.username,
      token,
      userName,
      userId,
    };

    return userCredentials;
  } catch (error) {
    console.error('Failed to load credentials from Keychain', error);
    return null;
  }
}

export async function setCredentials(
  email: string,
  userCredentials: PartialUserCredentials,
): Promise<void> {
  try {
    await Keychain.setGenericPassword(email, JSON.stringify(userCredentials));
  } catch (error) {
    console.error('Failed to set credentials to Keychain');
  }
}

export async function removeCredentials(): Promise<void> {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    console.error('Failed to remove user credentials from keystore', error);
  }
}
