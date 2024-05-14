import React from 'react';
import AuthContextProvider from './store/authContext';
import {Navigation} from './navigation/Navigation';
import GameProvider from './store/gameContext';
import {useRetrieveCredentials, useResetNavOnAuthChange} from './hooks';
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
  useResetNavOnAuthChange();

  return <Navigation />;
}
