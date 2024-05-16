import {useContext, useEffect, useState} from 'react';
import socket from '../services/SocketService';
import {SocketEvents} from '../types/SocketEvents';
import {QuestionInterface} from '../types/questions';
import {AuthContext} from '../store/authContext';

export default function useSocketLogic(
  isHost: boolean,
  questions: QuestionInterface[] | null,
  setQuestions: (questions: QuestionInterface[]) => void,
) {
  const userId = useContext(AuthContext).userId;
  const [opponent, setOpponent] = useState(false);

  useEffect(() => {
    if (isHost) {
      socket.on(SocketEvents.OPPONENT_JOINED, setOpponent);
    }
    if (isHost && opponent) {
      socket.emit(SocketEvents.SEND_QUESTIONS, questions);
    }
  }, [isHost, opponent, questions]);

  useEffect(() => {
    if (!isHost) {
      socket.on(SocketEvents.RECEIVE_QUESTIONS, setQuestions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHost]);

  useEffect(() => {
    return () => {
      socket.emit(SocketEvents.LEAVE_ROOM, userId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return opponent;
}
