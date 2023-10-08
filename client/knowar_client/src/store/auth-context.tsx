import React, {useState, ReactNode, createContext} from 'react';

type AuthContextType = {
  token: string;
  email: string;
  userName: string;
  userId: string;
  isAuthenticated: boolean;
  authenticate: (
    token: string,
    email: string,
    userName: string,
    userId: string,
  ) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: '',
  email: '',
  userName: '',
  userId: '',
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

interface AuthContextProviderProps {
  children: ReactNode;
}

function AuthContextProvider({children}: AuthContextProviderProps) {
  const [authToken, setAuthToken] = useState<string>('');
  const [authEmail, setAuthEmail] = useState<string>('');
  const [authUserName, setAuthUserName] = useState<string>('');
  const [authUserId, setAuthUserId] = useState<string>('');

  function authenticate(
    token: string,
    email: string,
    userName: string,
    userId: string,
  ) {
    setAuthToken(token);
    setAuthEmail(email);
    setAuthUserName(userName);
    setAuthUserId(userId);
  }

  function logout() {
    setAuthToken('');
    setAuthEmail('');
    setAuthUserName('');
    setAuthUserId('');
  }

  const value = {
    token: authToken,
    email: authEmail,
    userName: authUserName,
    userId: authUserId,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
