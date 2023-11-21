import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';

interface EndGameScreenProps {
  playerScore: number;
  opponentScore: number;
  didWin: boolean;
  isDraw: boolean;
  onBackToMainMenu: () => void;
  isSinglePlayer: boolean;
}

export default function EndGameScreen({
  playerScore,
  opponentScore,
  didWin,
  isDraw,
  onBackToMainMenu,
  isSinglePlayer,
}: EndGameScreenProps) {
  let message;
  if (isDraw) {
    message = "It's a draw! 🤝";
  } else {
    message = didWin ? 'Congratulations! You won! 🏆' : 'Oops! You lost! 🥲';
  }

  return (
    <View style={styles.container}>
      {!isSinglePlayer && <Text style={styles.message}>{message}</Text>}
      <Text style={styles.scoreText}>Your Score: {playerScore}</Text>
      {!isSinglePlayer && (
        <Text style={styles.scoreText}>Opponent's Score: {opponentScore}</Text>
      )}
      <ButtonComponent title="Back to Main Menu" onPress={onBackToMainMenu} />
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
