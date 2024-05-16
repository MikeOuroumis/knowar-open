import {View, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../store/authContext';
import EndGameScreen from './EndGameScreen';
import LoadingScreen from './LoadingScreen';
import {colorList} from '../constants/colors';
import {useGameLogic, useSocketLogic, useQuestions} from '../hooks';
import {TimeBar, Score, Question, ButtonComponent} from '../components';
import {
  AuthenticatedScreens,
  GameScreenParams,
  RootStackParamList,
} from '../types/navigation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Route = {
  params: GameScreenParams;
};

type GameScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  AuthenticatedScreens.GameScreen
>;

export default function GameScreen({route}: {route: Route}): JSX.Element {
  const navigation = useNavigation<GameScreenNavigationProp>();

  const {categoryId, isHost, isSinglePlayer} = route.params;

  const userId = useContext(AuthContext).userId;

  const {questions, setQuestions} = useQuestions(categoryId, isHost);

  const {
    gameEnded,
    currentQuestionIndex,
    playerScore,
    opponentScore,
    answeredCorrect,
    selectedAnswer,
    isAnswered,
    handleOptionPress,
    handleTimeElapsed,
  } = useGameLogic(questions, userId);

  const opponent = useSocketLogic(isHost, questions, setQuestions);

  if (gameEnded) {
    return (
      <EndGameScreen
        playerScore={playerScore}
        opponentScore={opponentScore}
        didWin={playerScore > opponentScore} // Determine if the player won
        onBackToMainMenu={() =>
          navigation.replace(AuthenticatedScreens.MainMenuScreen)
        }
        isDraw={playerScore === opponentScore}
        isSinglePlayer={isSinglePlayer}
      />
    );
  }

  const isWaitingForOpponent = isHost && !opponent && !isSinglePlayer;

  if (isWaitingForOpponent) {
    return (
      <LoadingScreen
        text="Waiting for the opponent to join the game..."
        buttonText="Back"
      />
    );
  }

  if (questions) {
    return (
      <View style={styles.container}>
        <View style={styles.questionWrapper}>
          <Score
            playerScore={playerScore}
            opponentScore={opponentScore}
            isSinglePlayer={isSinglePlayer}
          />
          <TimeBar onTimeElapsed={handleTimeElapsed} />

          <Question
            questionObj={questions[currentQuestionIndex]}
            onOptionPress={selected => handleOptionPress(selected)}
            isAnswered={isAnswered}
            answeredCorrect={answeredCorrect}
            selectedAnswer={selectedAnswer}
          />

          <ButtonComponent
            title="Back To Main Menu"
            onPress={() =>
              navigation.replace(AuthenticatedScreens.MainMenuScreen)
            }
          />
        </View>
      </View>
    );
  }
  return <LoadingScreen text="No questions loaded" buttonText="Back" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorList.black,
    justifyContent: 'center',
  },
  questionWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
});
