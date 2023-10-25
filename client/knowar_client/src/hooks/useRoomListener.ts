import axios from 'axios';
import {useEffect, useState} from 'react';
import socket from '../socket/socket';
import {apiUrl} from '../constants/constants';
import {SocketEvents} from '../socket/SocketEvents';

export const useRoomListener = () => {
  const [activeRooms, setActiveRooms] = useState<
    {userName: string; category: string}[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // prevent race condition
    setTimeout(() => {
      setLoading(true);
      const fetchActiveRooms = async () => {
        try {
          const response = await axios.get(`${apiUrl}:5000/active-rooms`);
          const data = response.data;

          setActiveRooms(
            data.rooms.map(room => ({
              userName: room.host.userName,
              category: room.category,
            })),
          );
        } catch (err) {
          console.log("Couldn't fetch rooms", err);
          alert(err);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      };

      fetchActiveRooms();
    }, 1000);
  }, []);

  useEffect(() => {
    const handleNewRoom = data => {
      setActiveRooms(prev => {
        if (prev.includes(data.roomId)) {
          return prev;
        }
        return [...prev, data];
      });
    };

    const handleRoomDeletion = roomID => {
      setActiveRooms(prev =>
        prev.filter(id => {
          id !== roomID;
        }),
      );
    };

    socket.on(SocketEvents.NEW_ROOM_AVAILABLE, handleNewRoom);
    socket.on(SocketEvents.ROOM_DELETED, handleRoomDeletion);

    return () => {
      socket.off(SocketEvents.NEW_ROOM_AVAILABLE, handleNewRoom);
      socket.off(SocketEvents.ROOM_DELETED, handleRoomDeletion);
    };
  }, []);

  return {activeRooms, loading};
};
