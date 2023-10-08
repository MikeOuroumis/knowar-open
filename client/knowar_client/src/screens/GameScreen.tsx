import {View, StyleSheet, Text} from 'react-native';
import React, {useContext, useState} from 'react';
import {useEffect} from 'react';
import socket from '../socket/socket';
import ButtonComponent from '../components/ButtonComponent';
import {AuthContext} from '../store/auth-context';
import {SocketEvents} from '../socket/SocketEvents';
import {fetchQuestionsFromAPI} from '../api/fetchQuestions';
import {useSocketLogic} from '../hooks/useSocketLogic';
import {WaitingForOpponent} from '../components/GameScreen/WaitingForOpponent';
import {Question} from '../components/GameScreen/Question';
import EndGameScreen from './EndGameScreen';

export default function GameScreen({navigation, route}) {
  const {categoryId, isHost} = route.params;

  const userId = useContext(AuthContext).userId;

  const [opponent, setOpponent] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  useSocketLogic(isHost, opponent, questions, setOpponent, setQuestions);

  const fetchQuestions = async () => {
    const questions = await fetchQuestionsFromAPI(categoryId);
    setQuestions(questions);
  };

  useEffect(() => {
    if (isHost && !questions) {
      fetchQuestions();

      return () => {
        socket.emit(SocketEvents.LEAVE_ROOM, userId);
      };
    }
  }, []);

  useEffect(() => {
    const handleOpponentUpdate = data => {
      setCurrentQuestionIndex(data.nextQuestionIndex);

      if (data.userId === userId) {
        setPlayerScore(data.playerScore);
        setOpponentScore(data.opponentScore);
      } else {
        setPlayerScore(data.opponentScore);
        setOpponentScore(data.playerScore);
      }
    };

    socket.on(SocketEvents.OPPONENT_UPDATE_STATE, handleOpponentUpdate);

    return () => {
      socket.off(SocketEvents.OPPONENT_UPDATE_STATE, handleOpponentUpdate);
    };
  }, [socket, userId]);

  useEffect(() => {
    // Check if the game has ended (e.g., all questions answered)
    if (questions && currentQuestionIndex + 1 >= questions.length) {
      setGameEnded(true);
    }
  }, [currentQuestionIndex, questions]);

  const handleBackToLobbyPress = () => {
    navigation.replace('AuthenticatedStack', {
      screen: 'MultiplayerLobbyScreen',
    });
  };

  if (gameEnded) {
    return (
      <EndGameScreen
        playerScore={playerScore}
        opponentScore={opponentScore}
        didWin={playerScore > opponentScore} // Determine if the player won
        onBackToLobbyPress={handleBackToLobbyPress}
        isDraw={playerScore === opponentScore}
      />
    );
  }

  if (isHost && !opponent) {
    return <WaitingForOpponent navigation={navigation} />;
  }

  const handleOptionPress = answer => {
    const isCorrect = answer === questions[currentQuestionIndex].correct_answer;
    let updatedPlayerScore = playerScore;
    const updatedOpponentScore = opponentScore;

    if (isCorrect) {
      updatedPlayerScore += 10;
    } else {
      updatedPlayerScore -= 5;
    }
    socket.emit(SocketEvents.UPDATE_SCORE_AND_STATE, {
      userId,
      playerScore: updatedPlayerScore,
      opponentScore: updatedOpponentScore,
      nextQuestionIndex: currentQuestionIndex + 1,
    });

    setPlayerScore(updatedPlayerScore);

    // Move to the next question or end the game
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      console.log('All questions answered!');
    }
  };

  if (questions) {
    return (
      <View style={styles.container}>
        <View style={styles.questionWrapper}>
          <View style={styles.scoreContainer}>
            <Text style={styles.playerScoreText}>You: {playerScore}</Text>
            <Text style={styles.opponentScoreText}>
              Opponent: {opponentScore}
            </Text>
          </View>
          <Question
            questionObj={questions[currentQuestionIndex]}
            onOptionPress={selectedAnswer => handleOptionPress(selectedAnswer)}
          />
          <ButtonComponent
            title="Back to Lobby"
            onPress={() =>
              navigation.replace('AuthenticatedStack', {
                screen: 'MultiplayerLobbyScreen',
              })
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  questionWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  playerScoreText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  opponentScoreText: {
    color: '#fff',
    fontSize: 20,
  },
});
