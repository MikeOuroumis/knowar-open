import React from 'react';
import LoadingScreen from '../../screens/LoadingScreen';
import ButtonComponent from '../ButtonComponent';

export function WaitingForOpponent({navigation}) {
  return (
    <>
      <LoadingScreen text="Waiting for the opponent to join the game..." />
      <ButtonComponent
        title="Back to Lobby"
        onPress={() =>
          navigation.replace('AuthenticatedStack', {
            screen: 'MultiplayerLobbyScreen',
          })
        }
      />
    </>
  );
}
