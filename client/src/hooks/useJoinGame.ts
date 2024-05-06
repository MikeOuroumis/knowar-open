import {NavigationProp, useNavigation} from '@react-navigation/native';
import {IRoom} from '../../../shared/types/Room';
import {SocketEvents} from '../socket/SocketEvents';
import socket from '../socket/socket';
import {AuthenticatedScreens, RootStackParamList} from '../types/navigation';

export function useJoinGame() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleJoinGame = (room: IRoom) => {
    socket.emit(SocketEvents.JOIN_ROOM, room);

    navigation.navigate(AuthenticatedScreens.GameScreen, {
      categoryId: room.roomId,
      isHost: false,
      isSinglePlayer: false,
    });
  };

  return handleJoinGame;
}
