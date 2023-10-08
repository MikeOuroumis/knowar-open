import React from 'react';
import AuthContextProvider from './store/auth-context';
import {Navigation} from './navigation/Navigation';

export default function App() {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
}
