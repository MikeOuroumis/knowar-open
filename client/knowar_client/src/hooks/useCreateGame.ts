import {AuthContext} from '../store/auth-context';
import socket from '../socket/socket';
import {apiUrl} from '../constants/constants';
import axios from 'axios';
import {useContext} from 'react';
import {useFetchTriviaCategories} from './useFetchTriviaCategories';

export const useCreateGame = (
  selectedCategory: {id: number; name: string} | null,
  navigation: any,
) => {
  const categories = useFetchTriviaCategories();

  const {userId, userName} = useContext(AuthContext);

  async function createGameHandler() {
    try {
      const response = await axios.post(`${apiUrl}/create-room`, {
        category: selectedCategory.name,
        userId: userId,
      });

      if (response.data && response.data.status === 'ok') {
        socket.emit('create_room', {
          roomId: userId,
          userName: userName,
          category: selectedCategory.name,
        });

        navigation.navigate('GameScreen', {
          categoryId: selectedCategory.id,
          roomId: userId,
          isHost: true,
          isSinglePlayer: false,
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
