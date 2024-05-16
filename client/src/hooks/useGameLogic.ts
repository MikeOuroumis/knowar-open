import {useEffect, useState} from 'react';
import socket from '../services/SocketService';
import {SocketEvents} from '../types/SocketEvents';
import {QuestionInterface} from '../types/questions';
import {useGameContext} from '../store/gameContext';

type UpdateData = {
  nextQuestionIndex: number;
  opponentScore: number;
  playerScore: number;
  userId: string;
};

export default function useGameLogic(
  questions: QuestionInterface[] | null,
  userId: string,
) {
  const [gameEnded, setGameEnded] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [answeredCorrect, setAnsweredCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

  const {triggerResetTimer} = useGameContext();

  const handleTimeElapsed = () => {
    incrementQuestionIndex();
  };

  const incrementQuestionIndex = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
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

  useEffect(() => {
    // set is answered to false when the question changes
    setIsAnswered(false);
  }, [currentQuestionIndex, setIsAnswered]);

  useEffect(() => {
    triggerResetTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]);

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
    answeredCorrect,
    selectedAnswer,
    isAnswered,
    handleOptionPress,
    handleTimeElapsed,
  };
}
