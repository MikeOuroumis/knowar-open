import axios from 'axios';
import {useEffect, useState} from 'react';
import socket from '../socket/socket';
import {apiUrl} from '../config';
import {SocketEvents} from '../socket/SocketEvents';
import {Alert} from 'react-native';
import {IRoom} from '../../../shared/types/Room';

export const useRoomListener = () => {
  const [activeRooms, setActiveRooms] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // prevent race condition
    setTimeout(() => {
      setLoading(true);

      const fetchActiveRooms = async () => {
        try {
          const response = await axios.get(`${apiUrl}/active-rooms`);
          const rooms: IRoom[] = response.data.rooms;

          setActiveRooms(rooms);
        } catch (err) {
          console.error("Couldn't fetch rooms", err);
          Alert.alert("Couldn't find rooms");
        } finally {
          setLoading(false);
        }
      };

      fetchActiveRooms();
    }, 1000);
  }, []);

  useEffect(() => {
    const handleNewRoom = (data: IRoom) => {
      setActiveRooms(previousRooms => {
        const uniqueRooms = new Set(previousRooms);

        uniqueRooms.add(data);

        // Convert the Set back to an array for React state
        return Array.from(uniqueRooms);
      });
    };

    const handleRoomDeletion = (roomID: string) => {
      setActiveRooms(prev => {
        const updatedRooms = prev.filter(room => room.roomId !== roomID);
        return updatedRooms;
      });
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
