import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ButtonComponent} from '../components/common';
import {useNavigation} from '@react-navigation/native';
import {AuthenticatedScreens, RootStackParamList} from '../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface EndGameScreenProps {
  playerScore: number;
  opponentScore: number;
  isSinglePlayer: boolean;
}

type EndGameScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  AuthenticatedScreens.GameScreen
>;

export default function EndGameScreen({
  playerScore,
  opponentScore,
  isSinglePlayer,
}: EndGameScreenProps) {
  const navigation = useNavigation<EndGameScreenNavigationProp>();
  const didWin = playerScore > opponentScore;
  const isDraw = playerScore === opponentScore;

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

      <ButtonComponent
        title="Back to Main Menu"
        onPress={() => navigation.replace(AuthenticatedScreens.MainMenuScreen)}
        style={styles.button}
      />
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
  button: {
    width: 260,
    alignSelf: 'center',
  },
});
