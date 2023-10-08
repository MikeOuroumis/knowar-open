import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';

export default function EndGameScreen({
  playerScore,
  opponentScore,
  didWin,
  isDraw, // Add isDraw prop
  onBackToLobbyPress,
}) {
  let message;
  if (isDraw) {
    message = "It's a draw! 🤝";
  } else {
    message = didWin ? 'Congratulations! You won! 🏆' : 'Oops! You lost! 🥲';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.scoreText}>Your Score: {playerScore}</Text>
      <Text style={styles.scoreText}>Opponent's Score: {opponentScore}</Text>
      <ButtonComponent title="Back to Lobby" onPress={onBackToLobbyPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
});
