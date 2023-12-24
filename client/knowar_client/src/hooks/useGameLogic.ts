import {useEffect, useState} from 'react';
import socket from '../socket/socket';
import {SocketEvents} from '../socket/SocketEvents';
import {QuestionInterface} from '../types/questions';

type dataType = {
  nextQuestionIndex: number;
  opponentScore: number;
  playerScore: number;
  userId: string;
};

export function useGameLogic(
  questions: QuestionInterface[] | null,
  userId: string,
) {
  const [gameEnded, setGameEnded] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Move to the next question after 10 seconds
      if (questions && currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else if (questions) {
        // If all questions are answered, end the game
        setGameEnded(true);
      }
    }, 10000); // 10 seconds delay
    return () => clearTimeout(timer); // Clear the timer if the component unmounts or the index changes
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    const handleOpponentUpdate = (data: dataType) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, userId]);

  useEffect(() => {
    // Check if the game has ended (e.g., all questions answered)
    if (questions && currentQuestionIndex + 1 >= questions.length) {
      setGameEnded(true);
    }
  }, [currentQuestionIndex, questions]);

  return {
    gameEnded,
    currentQuestionIndex,
    playerScore,
    opponentScore,
    setPlayerScore,
  };
}
