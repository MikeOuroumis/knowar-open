import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colorList} from '../../constants/colors';

interface ScoreProps {
  playerScore: number;
  opponentScore: number;
  isSinglePlayer: boolean;
}

export function Score({
  playerScore,
  opponentScore,
  isSinglePlayer,
}: ScoreProps): JSX.Element {
  const winning = playerScore > opponentScore;
  const isDraw = playerScore === opponentScore;

  return (
    <View
      style={[
        styles.scoreContainer,
        winning && styles.winning,
        isDraw && styles.draw,
      ]}>
      <Text style={styles.playerScoreText}>You: {playerScore}</Text>
      {!isSinglePlayer && (
        <Text style={styles.opponentScoreText}>Opponent: {opponentScore}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colorList.red,
    marginTop: 10,

    borderRadius: 10,
    padding: 10,
  },
  winning: {
    backgroundColor: colorList.green,
  },
  draw: {
    backgroundColor: colorList.white,
  },
  playerScoreText: {
    color: colorList.black,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  opponentScoreText: {
    color: colorList.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
