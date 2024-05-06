import React from 'react';
import AuthContextProvider from './store/auth-context';
import {Navigation} from './navigation/Navigation';
import GameProvider from './store/GameContext';
import {useRetrieveCredentials} from './hooks/useRetrieveCredentials';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <AuthContextProvider>
      <GameProvider>
        <NavigationContainer>
          <AppContent />
        </NavigationContainer>
      </GameProvider>
    </AuthContextProvider>
  );
}

function AppContent() {
  useRetrieveCredentials();

  return <Navigation />;
}
