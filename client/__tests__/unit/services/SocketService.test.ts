import MockAdapter from 'axios-mock-adapter';
import mainAxiosClient from '../../../src/api/axiosClients';
import {IRoom} from '../../../../shared/types/Room';
import * as SocketService from '../../../src/services/SocketService';
import socket from '../../../src/socket/socket';

describe('SocketService', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(mainAxiosClient);
  });

  afterEach(() => {
    mock.reset();
    socket.disconnect();
  });

  test('should fetch active rooms', async () => {
    const mockedRooms: IRoom[] = [
      {
        _id: '929292',
        roomId: '123',
        userName: 'userName',
        category: 'Books',
        host: {_id: '929292', userName: 'userName'},
        players: ['player1', 'player2'],
        isActive: true,
        __v: 10,
      },
    ];

    mock.onGet('/active-rooms').reply(200, {
      rooms: mockedRooms,
    });

    const rooms = await SocketService.fetchActiveRooms();
    expect(rooms).toEqual(mockedRooms);
  });

  test('should create room and save it in the database', async () => {
    const roomData = {
      category: 'Books',
      userId: 'testUserId123',
      userName: 'testUserName',
    };

    mock.onPost('/create-room').reply(200, {
      roomId: 'testRoomId',
    });

    const roomId = await SocketService.saveRoomInDatabase(
      roomData.category,
      roomData.userId,
      roomData.userName,
    );
    expect(roomId).toEqual('testRoomId');
  });
});
