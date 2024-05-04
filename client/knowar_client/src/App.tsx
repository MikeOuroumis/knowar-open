import React from 'react';
import AuthContextProvider from './store/auth-context';
import {Navigation} from './navigation/Navigation';
import GameProvider from './store/GameContext';
import {useRetrieveCredentials} from './hooks/useRetrieveCredentials';
import LoadingScreen from './screens/LoadingScreen';

export default function App() {
  return (
    <AuthContextProvider>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </AuthContextProvider>
  );
}

function AppContent() {
  const isLoading = useRetrieveCredentials();

  if (isLoading) {
    return <LoadingScreen text="Loading..." />;
  }

  return <Navigation />;
}
