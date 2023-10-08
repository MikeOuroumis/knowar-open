import {AuthContext} from '../store/auth-context';
import socket from '../socket/socket';
import {apiUrl} from '../constants/constants';
import axios from 'axios';
import {useContext} from 'react';
import {useFetchTriviaCategories} from './useFetchTriviaCategories';

export const useCreateGame = (selectedCategory, navigation) => {
  const categories = useFetchTriviaCategories();

  const userId = useContext(AuthContext).userId;

  async function createGameHandler() {
    try {
      const response = await axios.post(`${apiUrl}:5000/create-room`, {
        category: selectedCategory.name,
        userId: userId,
      });

      if (response.data && response.data.status === 'ok') {
        socket.emit('create_room', {
          roomId: userId,
          category: selectedCategory.name,
        });

        navigation.navigate('GameScreen', {
          categoryId: selectedCategory.id,
          roomId: userId,
          isHost: true,
        });
      } else {
        alert('Failed to create game room.');
      }
    } catch (error) {
      alert("Couldn't create game room.");
      console.log("Couldn't create game room.", error);
    }
  }

  return {createGameHandler, categories};
};
