import {useEffect} from 'react';
import socket from '../socket/socket';
import {SocketEvents} from '../types/SocketEvents';
import {QuestionInterface} from '../types/questions';

export function useSocketLogic(
  isHost: boolean,
  opponent: boolean,
  questions: QuestionInterface[] | null,
  setOpponent: (opponent: boolean) => void,
  setQuestions: (questions: QuestionInterface[]) => void,
) {
  useEffect(() => {
    if (isHost) {
      socket.on(SocketEvents.OPPONENT_JOINED, setOpponent);
    }
    if (isHost && opponent) {
      socket.emit(SocketEvents.SEND_QUESTIONS, questions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHost, opponent, questions]);

  useEffect(() => {
    if (!isHost) {
      socket.on(SocketEvents.RECEIVE_QUESTIONS, setQuestions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHost]);
}
