import {useEffect} from 'react';
import socket from '../socket/socket';
import {SocketEvents} from '../socket/SocketEvents';

export function useSocketLogic(
  isHost,
  opponent,
  questions,
  setOpponent,
  setQuestions,
) {
  useEffect(() => {
    if (isHost) {
      socket.on(SocketEvents.OPPONENT_JOINED, setOpponent);
    }
    if (isHost && opponent) socket.emit(SocketEvents.SEND_QUESTIONS, questions);
  }, [isHost, opponent, questions]);

  useEffect(() => {
    if (!isHost) {
      socket.on(SocketEvents.RECEIVE_QUESTIONS, setQuestions);
    }
  }, [isHost]);
}
