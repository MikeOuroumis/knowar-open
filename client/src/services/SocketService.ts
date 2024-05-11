import {IRoom} from '../../../shared/types/Room';
import mainAxiosClient from '../api/axiosClients';
import {SocketEvents} from '../socket/SocketEvents';
import socket from '../socket/socket';

export async function fetchActiveRooms(): Promise<IRoom[]> {
  try {
    const response = await mainAxiosClient.get('/active-rooms');
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

    return roomId; // TODO: the room id is not used
  } catch (error) {
    console.error('Failed to create room');
  }
}

async function saveRoomInDatabase(
  category: string,
  userId: string,
  userName: string,
): Promise<string | undefined> {
  try {
    const response = await mainAxiosClient.post('/create-room', {
      category,
      userId,
      userName,
    });

    return response.data.roomId;
  } catch (error) {
    console.error('Failed to save room in the database', error);
  }
}
