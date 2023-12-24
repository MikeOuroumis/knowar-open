import React from 'react';
import AuthContextProvider from './store/auth-context';
import {Navigation} from './navigation/Navigation';
import GameProvider from './store/GameContext';

export default function App() {
  return (
    <AuthContextProvider>
      <GameProvider>
        <Navigation />
      </GameProvider>
    </AuthContextProvider>
  );
}
