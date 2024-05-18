import {IRoom} from '../../../shared/types/Room';
import mainAxiosClient from '../api/axiosClients';
import {socketUrl} from '../config';
import {SocketEvents} from '../types/SocketEvents';
import io from 'socket.io-client';

const socket = io(socketUrl);
export default socket;

export async function fetchActiveRooms(): Promise<IRoom[]> {
  try {
    const response = await mainAxiosClient.get('/rooms/active');
    return response.data.rooms;
  } catch (error) {
    console.error('Failed to fetch the active rooms', error);
    return [];
  }
}

export async function createRoom(
  category: string,
  userId: string,
  userName: string,
): Promise<string | undefined> {
  try {
    const roomId = await saveRoomInDatabase(category, userId, userName);

    if (roomId) {
      socket.emit(SocketEvents.CREATE_ROOM, {
        roomId: userId,
        userName,
        category,
      });
    }

    return roomId; // TODO: the room id is not in use
  } catch (error) {
    console.error('Failed to create room');
  }
}

export async function saveRoomInDatabase( // exported only to be tested with Jest
  category: string,
  userId: string,
  userName: string,
): Promise<string | undefined> {
  try {
    const response = await mainAxiosClient.post('/rooms', {
      category,
      userId,
      userName,
    });

    return response.data.roomId;
  } catch (error) {
    console.error('Failed to save room in the database', error);
  }
}
