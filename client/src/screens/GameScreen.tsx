import {View, StyleSheet} from 'react-native';
import React, {useContext, useState} from 'react';
import {useEffect} from 'react';
import socket from '../socket/socket';
import {AuthContext} from '../store/authContext';
import {SocketEvents} from '../types/SocketEvents';
import EndGameScreen from './EndGameScreen';
import LoadingScreen from './LoadingScreen';
import {colorList} from '../constants/colors';
import {useGameLogic, useSocketLogic, useQuestions} from '../hooks';
import {TimeBar, Score, Question, ButtonComponent} from '../components';
import {useGameContext} from '../store/gameContext';
import {AuthenticatedScreens, RootStackParamList} from '../types/navigation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type GameScreenParams = {
  categoryId: string;
  isHost: boolean;
  isSinglePlayer: boolean;
};

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
  const {triggerResetTimer} = useGameContext();

  const [opponent, setOpponent] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answeredCorrect, setAnsweredCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const {questions, setQuestions, fetchAndPrepareQuestions} =
    useQuestions(categoryId);
  const {
    gameEnded,
    currentQuestionIndex,
    playerScore,
    opponentScore,
    setPlayerScore,
    setCurrentQuestionIndex,
  } = useGameLogic(questions, userId);

  useSocketLogic(isHost, opponent, questions, setOpponent, setQuestions);

  useEffect(() => {
    // set is answered to false when the question changes
    setIsAnswered(false);
  }, [currentQuestionIndex]);

  useEffect(() => {
    triggerResetTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (isHost && !questions) {
      fetchAndPrepareQuestions();

      return () => {
        socket.emit(SocketEvents.LEAVE_ROOM, userId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBackToMainMenu = () => {
    navigation.replace(AuthenticatedScreens.MainMenuScreen);
  };

  function isAnswerCorrect(answer: string): boolean {
    return (
      questions !== null &&
      answer === questions[currentQuestionIndex].correct_answer
    );
  }

  const handleOptionPress = (answer: string) => {
    if (isAnswered) {
      return;
    }

    let updatedPlayerScore = playerScore;
    const updatedOpponentScore = opponentScore;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (isAnswerCorrect(answer) && !isAnswered) {
      setAnsweredCorrect(true);
      updatedPlayerScore += 10;
    } else {
      setAnsweredCorrect(false);
    }

    socket.emit(SocketEvents.UPDATE_SCORE_AND_STATE, {
      userId: userId,
      playerScore: updatedPlayerScore,
      opponentScore: updatedOpponentScore,
      nextQuestionIndex: currentQuestionIndex + 1,
    });

    setPlayerScore(updatedPlayerScore);
  };

  const handleTimeElapsed = () => {
    incrementQuestionIndex();
  };

  const incrementQuestionIndex = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (gameEnded) {
    return (
      <EndGameScreen
        playerScore={playerScore}
        opponentScore={opponentScore}
        didWin={playerScore > opponentScore} // Determine if the player won
        onBackToMainMenu={onBackToMainMenu}
        isDraw={playerScore === opponentScore}
        isSinglePlayer={isSinglePlayer}
      />
    );
  }

  if (isHost && !opponent && !isSinglePlayer) {
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

          {isSinglePlayer ? (
            <ButtonComponent
              title="Back To Main Menu"
              onPress={onBackToMainMenu}
            />
          ) : (
            <ButtonComponent
              title="Back to Lobby"
              onPress={() =>
                navigation.replace(AuthenticatedScreens.MultiplayerLobbyScreen)
              }
            />
          )}
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
