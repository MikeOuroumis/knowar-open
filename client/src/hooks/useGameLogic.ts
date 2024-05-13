import {useEffect, useState} from 'react';
import socket from '../socket/socket';
import {SocketEvents} from '../types/SocketEvents';
import {QuestionInterface} from '../types/questions';

type UpdateData = {
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
    const handleOpponentUpdate = (data: UpdateData) => {
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
    setCurrentQuestionIndex,
  };
}
