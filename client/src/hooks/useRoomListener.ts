import {useEffect, useState} from 'react';
import socket from '../socket/socket';
import {SocketEvents} from '../socket/SocketEvents';
import {Alert} from 'react-native';
import {IRoom} from '../../../shared/types/Room';
import {SocketService} from '../services';

export const useRoomListener = () => {
  const [activeRooms, setActiveRooms] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveRooms = async () => {
      try {
        setLoading(true);
        const rooms = await SocketService.fetchActiveRooms();

        setActiveRooms(rooms);
      } catch (err) {
        Alert.alert('Error', "Couldn't find rooms, please try again.", [
          {text: 'Retry', onPress: () => fetchActiveRooms()},
          {text: 'Cancel', style: 'cancel'},
        ]);
      } finally {
        setLoading(false);
      }
    };

    // prevent race condition
    const timer = setTimeout(fetchActiveRooms, 1000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
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
